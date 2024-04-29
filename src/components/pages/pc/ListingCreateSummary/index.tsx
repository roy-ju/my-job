import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import { v4 } from 'uuid';

import { Panel } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { ListingCreateSummary } from '@/components/templates';

import { useRouter } from '@/hooks/utils';

import getFileFromUrl from '@/utils/getFileFromUrl';

import Routes from '@/router/routes';

import ErrorCodes from '@/constants/error_codes';

import { apiService } from '@/services';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const nextRouter = useNextRouter();

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
    const { listingPhotoUrls, danjiPhotoUrls, ...fields } = params;

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
    router.replace(Routes.ListingCreateForm, {
      searchParams: {
        danjiID: router?.query?.danjiID ? (router.query.danjiID as string) : '',
        userAddressID: router?.query?.userAddressID as string,
      },
      state: {
        isBack: 'true',
        params: router.query.params as string,
        ...(router.query.origin
          ? {
              origin: router.query.origin as string,
            }
          : {}),
      },
    });
  }, [router]);

  const handlePopup = useCallback(() => {
    setSuccessPopup(false);

    if (listingID) {
      router.replace(Routes.ListingDetail, {
        searchParams: {
          listingID: `${listingID}`,
          ...(router.query.danjiID
            ? {
                danjiID: router.query.danjiID as string,
              }
            : {}),
        },
        state: {
          ...(router.query.origin
            ? {
                origin: router.query.origin as string,
              }
            : {}),
        },
      });
    }
  }, [listingID, router]);

  const handleErrorPopup = useCallback(() => {
    setErrorPopup(false);

    const depth1 = nextRouter.query.depth1;
    const depth2 = nextRouter.query.depth2;

    const query = nextRouter.query;

    delete query.depth1;
    delete query.depth2;

    if (depth1 && depth2) {
      nextRouter.replace({
        pathname: `/${depth1}/${Routes.MyRegisteredListingList}`,
        query: { ...query, tab: '1' },
      });
    } else {
      nextRouter.replace({
        pathname: `/${Routes.MyRegisteredListingList}`,
        query: { ...query, tab: '1' },
      });
    }
  }, [nextRouter]);

  useEffect(() => {
    if (params === null || !userAddressID) {
      router.pop();
    }
  }, [params, userAddressID, router]);

  return (
    <Panel width={panelWidth}>
      <ListingCreateSummary
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
    </Panel>
  );
});
