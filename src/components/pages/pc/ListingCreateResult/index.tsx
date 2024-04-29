/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import { toast } from 'react-toastify';

import { Panel } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { AgentCarouselItem } from '@/components/organisms/AgentCardCarousel';

import { ListingCreateResult } from '@/components/templates';

import { ListingStatus } from '@/constants/enums';

import { useRouter } from '@/hooks/utils';

import usePolling from '@/hooks/usePolling';

import Routes from '@/router/routes';

import useFetchMyListingDetail from '@/services/my/useFetchMyListingDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const nextRouter = useNextRouter();

  const listingID = Number(router.query.listingID) ?? 0;

  const { data, mutate: mutateMyListingDetail, isLoading } = useFetchMyListingDetail(listingID);

  usePolling(mutateMyListingDetail, 5000, 5);

  const [isSelectingAgent, setIsSelectingAgent] = useState(false);

  const [popup, setPopup] = useState('none');

  const popupData = useRef<any>();

  const agentList = useMemo<AgentCarouselItem[]>(
    () =>
      data?.agent_list?.map((item) => ({
        id: item.id,
        officeName: item.office_name,
        profileImageFullPath: item.profile_image_full_path,
        name: item.name,
        cellPhone: item.cell_phone,
        officePhone: item.office_phone,
        fullJibunAddress: item.full_jibun_address,
        registrationNumber: item.registration_number,
        description: item.description,
      })) ?? [],
    [data?.agent_list],
  );

  const showAgentSelectionPopup = useCallback(
    async (index: number) => {
      const agent = data?.agent_list?.[index];
      if (agent) {
        setPopup('agentSelection');
        popupData.current = agent;
      }
    },
    [data],
  );

  const handleNavigateToChatRoom = useCallback(() => {
    if (data?.seller_agent_chat_room_id) {
      router.replace(Routes.ChatRoom, {
        persistParams: true,
        searchParams: { chatRoomID: data?.seller_agent_chat_room_id },
      });
    } else {
      toast.error('채팅방을 찾을 수 없습니다.');
    }
  }, [data?.seller_agent_chat_room_id, router]);

  const handleNavigateToBack = useCallback(() => {
    if (router.query.back) {
      nextRouter.replace(router.query.back as string);
    }
  }, [router, nextRouter]);

  useEffect(() => {
    if (!listingID) {
      router.pop();
    }
  }, [router, listingID]);

  if ((data?.listing_status ?? 0) >= ListingStatus.Active) {
    router.pop();
    return null;
  }

  if (data?.error_code === 2002) {
    return (
      <OverlayPresenter>
        <Popup>
          <Popup.ContentGroup tw="py-10">
            <Popup.Title>유효하지 않은 페이지입니다.</Popup.Title>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.ActionButton onClick={() => router.pop({ persistParams: false })}>확인</Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </OverlayPresenter>
    );
  }

  return (
    <Panel width={panelWidth}>
      <ListingCreateResult
        isLoading={isLoading}
        onClickBack={router.query.back ? handleNavigateToBack : undefined}
        data={data}
        agents={agentList}
        onSelectAgent={showAgentSelectionPopup}
        onNavigateToChatRoom={data?.seller_agent_chat_room_id ? handleNavigateToChatRoom : undefined}
      />

      {popup === 'agentSelection' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.SmallTitle tw="text-center">선택한 중개사 확인</Popup.SmallTitle>
              <Popup.Body>{popupData.current?.name} 공인중개사님에게 매물등록을 신청하시겠습니까?</Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setPopup('none')}>다시 선택하기</Popup.CancelButton>
              <Popup.ActionButton isLoading={isSelectingAgent} onClick={() => {}}>
                선택확정
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {popup === 'agentSelectionSuccess' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.SmallTitle tw="text-center">수고하셨습니다!</Popup.SmallTitle>
              <Popup.Body>중개사님과 채팅으로 매물등록 협의를 진행해 주세요.</Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => setPopup('none')}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {popup === 'agentSelectionFail' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.SmallTitle>중개사 선택 불가</Popup.SmallTitle>
              <Popup.Body>
                선택하신 중개사의 사정으로 해당 중개사를 선택할 수 없습니다. 다른 중개사를 선택하여 매물등록 신청을
                완료해 주세요.
              </Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => setPopup('none')}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </Panel>
  );
});
