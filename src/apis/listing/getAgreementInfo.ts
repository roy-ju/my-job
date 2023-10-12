import useSWR from 'swr';

interface GetAgreementInfoResponse {
  approver_name: string;
  full_road_name_address: string;
  loi: number;
  requestor_name: string;

  buy_or_rent: number;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
}

export default function useAPI_GetAgreementInfo(loi: string) {
  const { data, isLoading, mutate } = useSWR<GetAgreementInfoResponse & ErrorResponse>(
    loi
      ? [
          '/my/agreement/info',
          {
            loi: Number(loi),
          },
        ]
      : null,
  );

  return { data, isLoading, mutate };
}
