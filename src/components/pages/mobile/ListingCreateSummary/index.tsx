/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { v4 } from 'uuid';

import { Loading, MobileContainer } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { ListingCreateSummary as ListingCreateSummaryTemplate } from '@/components/templates';

import getFileFromUrl from '@/utils/getFileFromUrl';

import Routes from '@/router/routes';

import ErrorCodes from '@/constants/error_codes';

import createListing from '@/apis/listing/createListing';

import getAgentList, { GetAgentListResponse } from '@/apis/listing/getAgentList';

import updateDanjiPhoto from '@/apis/listing/updateDanjiPhoto';

import uploadListingPhoto from '@/apis/listing/updateListingPhoto';

const ListingCreateSummary = () => {
  const router = useRouter();

  const userAddressID = Number(router.query.userAddressID) ?? 0;
  const agentID = Number(router.query.agentID) ?? 0;

  const [agent, setAgent] = useState<GetAgentListResponse['agent_list'][0] | null>(null);
  const [listingID, setListingID] = useState<number>();

  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [poppup, setPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);

  const params = useMemo(() => {
    if (typeof router.query.params === 'string') {
      return JSON.parse(router.query.params);
    }
    return null;
  }, [router.query.params]);

  const fetchAgentList = useCallback(async () => {
    if (!agentID || !userAddressID) return;

    setIsLoading(true);

    const res = await getAgentList({ user_address_id: userAddressID });
    if (res && res.agent_list) {
      const a = res.agent_list.filter((item) => item.id === agentID)[0];
      setAgent(a ?? null);
    }

    setIsLoading(false);
  }, [userAddressID, agentID]);

  const onClickCreate = useCallback(async () => {
    setIsCreating(true);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { listingPhotoUrls, danjiPhotoUrls, isOwner, ...fields } = params;

    const response = await createListing({
      ...fields,
      user_address_id: userAddressID,
      user_selected_agent_id: agentID,
    });

    if (response?.listing_id) {
      setListingID(response.listing_id);

      try {
        listingPhotoUrls?.map(async (item: string) => {
          getFileFromUrl(item, v4()).then((f) => uploadListingPhoto(response.listing_id, f));
        });

        danjiPhotoUrls?.map(async (item: string) => {
          getFileFromUrl(item, v4()).then((f) => updateDanjiPhoto(response.listing_id, f));
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

    setPopup(true);
  }, [params, userAddressID, agentID]);

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
    setPopup(false);

    router.replace(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${listingID}`);
  }, [listingID, router]);

  const handleErrorPopup = useCallback(() => {
    setErrorPopup(false);

    router.replace(`/${Routes.EntryMobile}/${Routes.MyRegisteredListingList}?tab=1`);
  }, [router]);

  useEffect(() => {
    fetchAgentList();
  }, [fetchAgentList]);

  useEffect(() => {
    if (!router?.query?.params || !router?.query?.userAddressID || !agentID) {
      router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
    }
  }, [params, userAddressID, agentID, router]);

  return (
    <MobileContainer>
      {isLoading || !agent ? (
        <div tw="py-20">
          <Loading />
        </div>
      ) : (
        <ListingCreateSummaryTemplate
          agentOfficeName={agent.office_name}
          agentProfileImageFullPath={agent.profile_image_full_path}
          agentName={agent.name}
          agentOfficePhone={agent.office_phone}
          agentJibunAddress={agent.full_jibun_address}
          agentDescription={agent.description}
          agentRegistrationNumber={agent.registration_number}
          listing={params}
          onClickCreate={onClickCreate}
          onClickUpdate={onClickUpdate}
          isLoading={isCreating}
        />
      )}

      {poppup && (
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
