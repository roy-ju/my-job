/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { v4 } from 'uuid';

import { MobileContainer } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { ListingCreateSummary as ListingCreateSummaryTemplate } from '@/components/templates';

import getFileFromUrl from '@/utils/getFileFromUrl';

import Routes from '@/router/routes';

import ErrorCodes from '@/constants/error_codes';

import { apiService } from '@/services';

const ListingCreateSummary = () => {
  const router = useRouter();

  const userAddressID = Number(router.query.userAddressID) ?? 0;

  const [listingID, setListingID] = useState<number>();

  const [isCreating, setIsCreating] = useState(false);

  const [successPopup, setSuccessPopup] = useState(false);

  const [errorPopup, setErrorPopup] = useState(false);

  const params = useMemo(() => {
    if (typeof router.query.params === 'string') {
      return JSON.parse(router.query.params);
    }
    return null;
  }, [router.query.params]);

  const onClickCreate = useCallback(async () => {
    setIsCreating(true);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { listingPhotoUrls, danjiPhotoUrls, isOwner, ...fields } = params;

    const response = await apiService.listingCreate({
      ...fields,
      user_address_id: userAddressID,
    });

    if (response?.listing_id) {
      setListingID(response.listing_id);

      try {
        listingPhotoUrls?.map(async (item: string) => {
          getFileFromUrl(item, v4()).then((f) => apiService.uploadListingPhoto(response.listing_id, f));
        });

        danjiPhotoUrls?.map(async (item: string) => {
          getFileFromUrl(item, v4()).then((f) => apiService.uploadDanjiPhoto(response.listing_id, f));
        });
      } catch (e) {
        //
      }

      setIsCreating(false);
    }

    if (response?.error_code === ErrorCodes.DUPLICATED_LISTING) {
      setErrorPopup(true);

      return;
    }

    setSuccessPopup(true);
  }, [params, userAddressID]);

  const onClickUpdate = useCallback(() => {
    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.ListingCreateForm}`,
      query: {
        params: router.query.params as string,
        isBack: 'true',
        ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
        ...(router?.query?.userAddressID ? { userAddressID: router.query.userAddressID as string } : {}),
        ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
      },
    });
  }, [router]);

  const handlePopup = useCallback(() => {
    setSuccessPopup(false);

    router.replace(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${listingID}`);
  }, [listingID, router]);

  const handleErrorPopup = useCallback(() => {
    setErrorPopup(false);

    router.replace(`/${Routes.EntryMobile}/${Routes.MyRegisteredListingList}?tab=1`);
  }, [router]);

  useEffect(() => {
    if (!router?.query?.params || !router?.query?.userAddressID) {
      router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
    }
  }, [params, userAddressID, router]);

  return (
    <MobileContainer>
      <ListingCreateSummaryTemplate
        listing={params}
        onClickCreate={onClickCreate}
        onClickUpdate={onClickUpdate}
        isLoading={isCreating}
      />

      {successPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.SubTitle tw="text-center">매물등록 신청이 완료되었습니다.</Popup.SubTitle>
              <Popup.Body>중개사 매물등록 완료후 거래가 개시될 예정입니다.</Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={handlePopup}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {errorPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.SmallTitle>이미 매물등록신청이 완료된 주소지입니다.</Popup.SmallTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={handleErrorPopup}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
};

export default ListingCreateSummary;
