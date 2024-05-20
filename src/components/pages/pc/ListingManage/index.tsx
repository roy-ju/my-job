import { memo, useCallback, useRef, useState } from 'react';

import { Loading, Panel } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { ListingManage } from '@/components/templates';

import { useRouter } from '@/hooks/utils';

import Routes from '@/router/routes';

import useFetchListingDetail from '@/services/listing/useFetchListingDetail';

import { apiService } from '@/services';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);
  const listingID = Number(router.query.listingID) ?? 0;
  const { data: listingData, isLoading } = useFetchListingDetail(listingID);

  const popupData = useRef('');
  const [popup, setPopup] = useState('none');

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    await apiService.listingSellerCancel({ listing_id: listingID, cancel_reason: popupData.current });
    router.popAll();
  }, [router, listingID]);

  const openDeletePopup = useCallback(async (reason: string) => {
    popupData.current = reason;
    setPopup('cancelListing');
  }, []);

  const handleReport = useCallback(() => {
    router.replace(Routes.ListingReport, { persistParams: true });
  }, [router]);

  const handleChat = useCallback(() => {
    if (listingData?.chat_room_id) {
      router.replace(Routes.ChatRoom, {
        searchParams: {
          listingID: router.query.listingID as string,
          chatRoomID: `${listingData.chat_room_id}`,
        },
      });
    }
  }, [router, listingData]);

  if (isLoading) {
    return (
      <Panel width={panelWidth}>
        <div tw="py-20">
          <Loading />
        </div>
      </Panel>
    );
  }

  return (
    <Panel width={panelWidth}>
      <ListingManage onClickDelete={openDeletePopup} onClickReport={handleReport} onClickChat={handleChat} />
      {popup === 'cancelListing' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>매물등록을 정말 취소하시겠습니까?</Popup.Title>
              <Popup.Body>
                매수(임차)희망자들의 참여 내역이 모두 삭제됩니다. 매물등록을 다시 진행하셔도 매수(임차)희망자들의 참여
                내역은 복구되지 않습니다.
              </Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton isLoading={isDeleting} onClick={() => setPopup('none')}>
                돌아가기
              </Popup.CancelButton>
              <Popup.ActionButton isLoading={isDeleting} onClick={handleDelete}>
                등록 취소하기
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </Panel>
  );
});
