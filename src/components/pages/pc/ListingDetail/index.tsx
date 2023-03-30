import { Panel } from '@/components/atoms';
import { ListingDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import useMap from '@/states/map';
import { memo, useCallback, useEffect } from 'react';

interface Props {
  depth: number;
  listingID: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth, listingID }: Props) => {
  const router = useRouter(depth);
  const map = useMap();

  const handleClickChatRoom = useCallback(() => {
    router.push(Routes.ChatRoom);
  }, [router]);

  const handleClickReport = useCallback(() => {}, []);

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
    <Panel width={panelWidth}>
      <ListingDetail listingID={listingID} onClickChatRoom={handleClickChatRoom} onClickReport={handleClickReport} />
    </Panel>
  );
});
