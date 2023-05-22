import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

interface QnaListItem {
  id: number;
  user_id: number;
  user_nickname: string;
  message: string;
  agent_message: any;
  agent_response_time: any;
  owner: boolean;
  created_time: string;
}

interface Agent {
  profile_image_full_path: string;
  name: string;
  office_name: string;
  address: string;
  cell_phone: string;
  office_phone: string;
  registration_number: string;
  distance_from_listing: number;
}

export interface GetListingQnaListResponse {
  has_next: boolean;
  total_count: number;
  list: QnaListItem[] | null;
  agent: Agent;
}

function getKey(listingID: number) {
  return (size: number, previousData: GetListingQnaListResponse | null) => {
    if (size > 0 && (previousData === null || !previousData.list?.length)) return null;
    return [
      '/qna/list',
      {
        page_number: size + 1,
        listing_id: listingID,
        page_size: 5,
      },
    ];
  };
}

export default function useAPI_GetListingQnaList(listingID: number) {
  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<GetListingQnaListResponse>(listingID === 0 ? () => null : getKey(listingID), null, {
    revalidateOnFocus: false,
  });

  const data = useMemo(() => {
    if (!dataList) return [];
    return dataList
      ?.map((item) => item?.list)
      .filter((item) => Boolean(item))
      .flat() as GetListingQnaListResponse['list'];
  }, [dataList]);

  const increamentPageNumber = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    data,
    pageNumber: size,
    hasNext: Boolean(dataList?.[size - 1]?.has_next),
    isLoading,
    increamentPageNumber,
    size,
    setSize,
    mutate,
  };
}
