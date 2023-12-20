// import { useCallback, useMemo } from 'react';

// import useSWRInfinite from 'swr/infinite';

// import { DanjiSuggestListResponse } from './types';

// function getKey(
//   danjiID: number | null | undefined,
//   pageSize: number,
//   pageIndex: number,
//   previousPageData: DanjiSuggestListResponse | null,
// ) {
//   if (!danjiID) return null;

//   if (previousPageData && !previousPageData?.list?.length) return null;

//   if (previousPageData && (previousPageData.list?.length || 0) < pageSize) return null;

//   return [
//     '/danji/suggest/list',
//     {
//       danji_id: danjiID,
//       page_size: pageSize,
//       page_number: pageIndex + 1,
//     },
//     null,
//     { revalidateIfStale: false, revalidateOnFocus: false },
//   ];
// }

// export function useFetchDanjiSuggestsList({ danjiID, pageSize }: { danjiID: number | null | undefined; pageSize: number }) {
//   const {
//     data: dataList,
//     isLoading,
//     size,
//     setSize,
//     mutate,
//   } = useSWRInfinite<DanjiSuggestListResponse>(
//     (pageIndex, previousPageData) => getKey(danjiID, pageSize, pageIndex, previousPageData),
//     null,
//     {
//       revalidateFirstPage: false,
//       revalidateOnMount: true,
//       onSuccess: () => {},
//     },
//   );

//   const increamentPageNumber = useCallback(() => {
//     setSize((prev) => prev + 1);
//   }, [setSize]);

//   const data = useMemo(() => {
//     if (!dataList) return [];
//     return dataList
//       ?.map((item) => item?.list)
//       .filter((item) => Boolean(item))
//       .flat();
//   }, [dataList]);

//   return {
//     isLoading,
//     data,
//     totalCount: dataList ? (dataList[0] ? dataList[0].total_count : 0) : 0,
//     size,
//     increamentPageNumber,
//     setSize,
//     mutate,
//   };
// }




export default function useFetchDanjiSuggestsList() {
  return {}
}
