import getAgentList, { GetAgentListResponse } from '@/apis/listing/getAgentList';
import updateDanjiPhoto from '@/apis/listing/updateDanjiPhoto';
import updateListing from '@/apis/listing/updateListing';
import uploadListingPhoto from '@/apis/listing/updateListingPhoto';
import { Loading, Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { ListingCreateSummary } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import getFileFromUrl from '@/utils/getFileFromUrl';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { v4 } from 'uuid';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const listingID = Number(router.query.listingID) ?? 0;
  const agentID = Number(router.query.agentID) ?? 0;
  const [agent, setAgent] = useState<GetAgentListResponse['agent_list'][0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [poppup, setPopup] = useState(false);

  const params = useMemo(() => {
    if (typeof router.query.params === 'string') {
      return JSON.parse(router.query.params);
    }
    return null;
  }, [router.query.params]);

  const fetchAgentList = useCallback(async () => {
    if (!agentID || !listingID) return;
    setIsLoading(true);
    const res = await getAgentList({ listing_id: listingID });
    if (res && res.agent_list) {
      const a = res.agent_list.filter((item) => item.id === agentID)[0];
      setAgent(a ?? null);
    }
    setIsLoading(false);
  }, [listingID, agentID]);

  const onClickCreate = useCallback(async () => {
    setIsCreating(true);
    // isOwner 는 스킵..
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { listingPhotoUrls, danjiPhotoUrls, isOwner, ...fields } = params;

    try {
      listingPhotoUrls?.map(async (item: string) => {
        getFileFromUrl(item, v4()).then((f) => uploadListingPhoto(listingID, f));
      });

      danjiPhotoUrls?.map(async (item: string) => {
        getFileFromUrl(item, v4()).then((f) => updateDanjiPhoto(listingID, f));
      });
    } catch (e) {
      console.error(e);
    }

    await updateListing({
      ...fields,
      listing_id: listingID,
      user_selected_agent_id: agentID,
    });

    setIsCreating(false);

    setPopup(true);
  }, [params, listingID, agentID]);

  const onClickUpdate = useCallback(() => {
    router.replace(Routes.ListingCreateForm, {
      searchParams: {
        listingID: router.query.listingID as string,
      },
      state: {
        params: router.query.params as string,
        addressLine1: router.query.addressLine1 as string,
        addressLine2: router.query.addressLine2 as string,
        addressData: router.query.addressData as string,
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
    if (params === null || !listingID || !agentID) {
      router.pop();
    }
  }, [params, listingID, agentID, router]);

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
              <Popup.Title>수고하셨습니다!</Popup.Title>
              <Popup.Body>주소 및 소유자 확인후 중개사 배정이 완료됩니다.</Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton
                onClick={() => {
                  setPopup(false);
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
                }}
              >
                확인
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </Panel>
  );
});