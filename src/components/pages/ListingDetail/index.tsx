import { ClosablePanel } from '@/components/molecules';
import { ListingDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import useMap from '@/states/map';
import { memo, useCallback, useEffect } from 'react';

interface Props {
  depth: number;
  listingID: number;
  panelWidth?: string;
  panelAnimationDuration?: number;
}

export default memo(
  ({ panelWidth, panelAnimationDuration, depth, listingID }: Props) => {
    const router = useRouter(depth);
    const map = useMap();

    const handleClickClose = useCallback(() => {
      router.pop();
    }, [router]);

    const handleClickChatRoom = useCallback(() => {
      router.push('chatRoom');
    }, [router]);

    const handleClickReport = useCallback(() => {
      router.push('reportListing');
    }, [router]);

    useEffect(() => {
      if (!listingID || !map) return;
      if (listingID === 1) {
        map.morph(
          {
            lat: 37.2826672623871,
            lng: 127.110737118808,
          },
          18,
        );
      } else if (listingID === 2) {
        map.morph(
          {
            lat: 37.2803856406884,
            lng: 127.114722215283,
          },
          18,
        );
      } else if (listingID === 3) {
        map.morph(
          {
            lat: 37.261811831367,
            lng: 127.108737254546,
          },
          18,
        );
      }
    }, [listingID, map]);

    return (
      <ClosablePanel
        width={panelWidth}
        animationDuration={panelAnimationDuration}
        closable={depth === 2}
        onClickClose={handleClickClose}
      >
        <ListingDetail
          listingID={listingID}
          onClickChatRoom={handleClickChatRoom}
          onClickReport={handleClickReport}
        />
      </ClosablePanel>
    );
  },
);
