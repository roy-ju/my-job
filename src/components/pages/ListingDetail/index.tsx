import { ListingDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import useMap from '@/states/map';
import { memo, useCallback, useEffect } from 'react';

type Props = {
  depth: number;
  listingID: number;
};

export default memo(({ depth, listingID }: Props) => {
  const router = useRouter(depth);
  const map = useMap();

  const handleClickGoBack = useCallback(() => {
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
    <>
      <p>{depth}</p>
      {depth === 2 && (
        <button
          className="absolute top-[10px] left-[750px] z-[200] bg-gray-800 p-2 text-white"
          type="button"
          onClick={handleClickGoBack}
        >
          닫기
        </button>
      )}
      <ListingDetail
        listingID={listingID}
        onClickChatRoom={handleClickChatRoom}
        onClickReport={handleClickReport}
      />
    </>
  );
});
