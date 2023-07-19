import useSWR from 'swr';

export type GetDanjiPhotosResponse = {
  danji_photos:
    | [
        {
          id: number;
          listing_id: string;
          danji_id: number;
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
  danjiId,
  realestateType,
}: {
  danjiId?: number | null;
  realestateType?: number | null;
}) {
  const { data, error, mutate } = useSWR<GetDanjiPhotosResponse>(
    danjiId && realestateType
      ? [
          '/danji/photos',
          {
            danji_id: danjiId,
            realestate_type: Number(realestateType),
          },
        ]
      : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnMount: true },
  );

  return {
    danjiPhotos: data,
    isLoading: danjiId && realestateType ? !data && !error : false,
    error,
    mutate,
  };
}
