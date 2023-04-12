import useSWR from 'swr';

export type GetDanjiPhotosResponse = {
  danji_photos:
    | [
        {
          id: number;
          listing_id: string;
          pnu: string;
          token: string;
          document_type: number;
          full_file_path: string;
          thumb_file_path: string;
          created_time: string;
        },
      ]
    | null;
} & ErrorResponse;

export function useAPI_GetDanjiPhotos({
  pnu,
  realestateType,
}: {
  pnu?: string | null;
  realestateType?: number | null;
}) {
  const { data, error, mutate } = useSWR<GetDanjiPhotosResponse>(
    pnu && realestateType
      ? [
          '/danji/photos',
          {
            pnu,
            realestate_type: Number(realestateType),
          },
        ]
      : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnMount: true },
  );

  return {
    danjiPhotos: data,
    isLoading: pnu && realestateType ? !data && !error : false,
    error,
    mutate,
  };
}
