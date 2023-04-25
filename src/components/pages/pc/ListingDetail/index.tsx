import { addFavorite } from '@/apis/listing/addListingFavroite';
import useAPI_GetListingDetail, { GetListingDetailResponse } from '@/apis/listing/getListingDetail';
// import useAPI_GetListingQnaList from '@/apis/listing/getListingQnaList';
import useAPI_GetListingStatus from '@/apis/listing/getListingStatus';
import { removeFavorite } from '@/apis/listing/removeListingFavorite';
import { Loading, Panel } from '@/components/atoms';
import { ListingDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';
import { toast } from 'react-toastify';
import { OverlayPresenter, Popup } from '@/components/molecules';
import useListingDetailRedirector from './useListingDetailRedirector';

interface Props {
  depth: number;
  listingID: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth, listingID }: Props) => {
  const { redirectable } = useListingDetailRedirector(listingID, depth);

  const router = useRouter(depth);

  const { data: statusData, isLoading: isLoadingStatus } = useAPI_GetListingStatus(listingID);
  const { data, mutate: mutateListing, isLoading } = useAPI_GetListingDetail(statusData?.can_access ? listingID : 0);

  // const { data: qnaData } = useAPI_GetListingQnaList(statusData?.can_access ? listingID : 0);

  const handleClickFavorite = useCallback(async () => {
    if (data?.listing?.id) {
      if (data.is_favorite) {
        await removeFavorite(data.listing.id);
      } else {
        await addFavorite(data.listing.id);
        toast.success('관심 매물에 추가되었습니다.');
      }
      await mutateListing();
    }
  }, [data, mutateListing]);

  const handleNavigateToCreateQna = useCallback(() => {
    router.push(Routes.ListingQnaCreateForm, {
      searchParams: {
        listingID: router.query.listingID as string,
      },
    });
  }, [router]);

  const handleNavigateToParticipateBidding = useCallback(() => {
    router.push(Routes.BiddingForm, {
      searchParams: {
        listingID: router.query.listingID as string,
      },
    });
  }, [router]);

  const handleNavigateToUpdateBidding = useCallback(() => {
    if (!data?.bidding_id) {
      toast.error('bidding_id not found');
    }

    router.push(Routes.UpdateBiddingForm, {
      searchParams: {
        listingID: router.query.listingID as string,
        biddingID: `${data?.bidding_id}`,
      },
    });
  }, [router, data?.bidding_id]);

  const handleNavigateToChatRoom = useCallback(() => {
    if (data?.chat_room_id) {
      router.push(Routes.ChatRoom, {
        searchParams: {
          listingID: router.query.listingID as string,
          chatRoomID: `${data.chat_room_id}`,
        },
      });
    }
  }, [router, data]);

  if (data?.error_code) {
    return <Panel width={panelWidth}>{data?.error_code}</Panel>;
  }

  if (isLoading || isLoadingStatus || (!statusData?.can_access && redirectable)) {
    return (
      <Panel width={panelWidth}>
        <div tw="py-20">
          <Loading />
        </div>
      </Panel>
    );
  }

  if (!statusData?.can_access && !redirectable) {
    return (
      <OverlayPresenter>
        <Popup>
          <Popup.ContentGroup tw="py-10">
            <Popup.Title>유효하지 않은 페이지입니다.</Popup.Title>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.ActionButton onClick={() => router.pop()}>확인</Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </OverlayPresenter>
    );
  }

  return (
    <Panel width={panelWidth}>
      <ListingDetail
        listingDetail={data as GetListingDetailResponse}
        isLoading={isLoading || isLoadingStatus}
        onClickFavorite={handleClickFavorite}
        onNavigateToParticipateBidding={handleNavigateToParticipateBidding}
        onNavigateToUpdateBidding={handleNavigateToUpdateBidding}
        onNavigateToChatRoom={handleNavigateToChatRoom}
        onNavigateToCreateQna={handleNavigateToCreateQna}
      />
    </Panel>
  );
});
