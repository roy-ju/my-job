import getAgentList, { GetAgentListResponse } from '@/apis/listing/getAgentList';
import updateDanjiPhoto from '@/apis/listing/updateDanjiPhoto';
import uploadListingPhoto from '@/apis/listing/updateListingPhoto';
import { Loading, Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { ListingCreateSummary } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useRouter as useNextRouter } from 'next/router';
import Routes from '@/router/routes';
import getFileFromUrl from '@/utils/getFileFromUrl';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { v4 } from 'uuid';
import createListing from '@/apis/listing/createListing';
import ErrorCodes from '@/constants/error_codes';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const nextRouter = useNextRouter();
  const userAddressID = Number(router.query.userAddressID) ?? 0;
  const agentID = Number(router.query.agentID) ?? 0;
  const [agent, setAgent] = useState<GetAgentListResponse['agent_list'][0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [listingID, setListingID] = useState<number>();
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
    const { listingPhotoUrls, danjiPhotoUrls, ...fields } = params;

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
        console.error(e);
      }
      setIsCreating(false);
    }

    if (response?.error_code === ErrorCodes.DUPLICATED_LISTING) {
      setErrorPopup(true);
    }

    setPopup(true);
  }, [params, userAddressID, agentID]);

  const onClickUpdate = useCallback(() => {
    router.replace(Routes.ListingCreateForm, {
      searchParams: {
        danjiID: router?.query?.danjiID ? (router.query.danjiID as string) : '',
        redirect: router?.query?.redirect ? (router.query.redirect as string) : '',
        userAddressID: router?.query?.userAddressID as string,
      },
      state: {
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
    setPopup(false);
    if (router?.query?.redirect) {
      nextRouter.replace(router.query.redirect as string);
      return;
    }

    if (router?.query?.danjiID && router?.query?.depth1) {
      nextRouter.replace(`/${router.query.depth1}?danjiID=${router.query.danjiID}`);
      return;
    }

    if (listingID) {
      router.replace(Routes.ListingDetail, {
        searchParams: { listingID: `${listingID}` },
        state: {
          ...(router.query.origin
            ? {
                origin: router.query.origin as string,
              }
            : {}),
        },
      });
    }
  }, [listingID, nextRouter, router]);

  const handleErrorPopup = useCallback(() => {
    setErrorPopup(false);

    router.replace(Routes.MyRegisteredListingList, {
      searchParams: { tab: '2', default: '2' },
      state: {
        ...(router.query.origin
          ? {
              origin: router.query.origin as string,
            }
          : {}),
      },
    });
  }, [router]);

  useEffect(() => {
    fetchAgentList();
  }, [fetchAgentList]);

  useEffect(() => {
    if (params === null || !userAddressID || !agentID) {
      router.pop();
    }
  }, [params, userAddressID, agentID, router]);

  return (
    <Panel width={panelWidth}>
      {isLoading || !agent ? (
        <div tw="py-20">
          <Loading />
        </div>
      ) : (
        <ListingCreateSummary
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
              <Popup.SmallTitle>수고하셨습니다!</Popup.SmallTitle>
              <Popup.Body>주소 및 소유자 확인후 중개사 배정이 완료됩니다.</Popup.Body>
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
