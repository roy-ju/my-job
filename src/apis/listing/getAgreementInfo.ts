import useSWR from 'swr';

interface GetAgreementInfoResponse {
  full_road_name_address: string
  requestor_name: string
  token: string
  loi: number
  status_text: '';
}

export default function useAPI_GetAgreementInfo(loi: string, token: string) {
  const { data, isLoading, mutate } = useSWR<GetAgreementInfoResponse & ErrorResponse>(
    loi && token
      ? [
          '/my/agreement/info',
          {
            loi: Number(loi),
            token,
          },
        ]
      : null,
  );

  return { data, isLoading, mutate };
}
