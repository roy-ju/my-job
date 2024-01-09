import { useEffect } from 'react';

import { BuyOrRent, DanjiOrRegionalType } from '@/constants/enums';

import { useSetRecoilState } from 'recoil';

import useFetchSuggestDetail from '@/services/suggests/useFetchSuggestDetail';

import { useFetchDanjiDetail } from '@/services/danji/useFetchDanjiDetail';

import useNormalizeParams from '../../hooks/useNormalizeParams';

import SuggestFormState from '../../atoms/SuggestFormState';

import forms from '../../constants/forms';

export default function useInitializeUpdateFormData({ suggestID }: { suggestID: number | null }) {
  const { data: suggestData, isLoading: suggestDataLoading } = useFetchSuggestDetail({ suggestID });

  const { data: danjiIData, isLoading: danjiDataLoading } = useFetchDanjiDetail({
    danjiID: suggestData?.danji_id || null,
  });

  const setState = useSetRecoilState(SuggestFormState);

  const { normalizeParams } = useNormalizeParams();

  useEffect(() => {
    if (!suggestID) {
      setState((prev) => ({ ...prev, popup: 'invalidAccess' }));
      return;
    }

    if (!danjiDataLoading && !suggestDataLoading && suggestData) {
      const params = {
        ...(suggestData.danji_or_regional === DanjiOrRegionalType.Regional
          ? { address: suggestData.request_target_text }
          : {}),
        ...(suggestData.danji_id ? { danji_id: suggestData.danji_id } : {}),
        ...(danjiIData?.road_name_address || danjiIData?.jibun_address
          ? { danji_address: danjiIData?.road_name_address || danjiIData?.jibun_address }
          : {}),
        ...(danjiIData?.name ? { name: danjiIData?.name } : {}),
        ...(danjiIData?.type ? { danji_type: danjiIData?.type } : {}),
        ...(suggestData.realestate_types ? { realestate_types: suggestData.realestate_types } : {}),
        ...(suggestData.buy_or_rents ? { buy_or_rents: suggestData.buy_or_rents } : {}),
        ...(suggestData.trade_or_deposit_price ? { trade_price: suggestData.trade_or_deposit_price } : {}),
        ...(suggestData.monthly_rent_fee ? { monthly_rent_fee: suggestData.monthly_rent_fee } : {}),
        ...(suggestData.quick_sale ? { quick_sale: suggestData.quick_sale } : {}),
        ...(suggestData.negotiable ? { negotiable: suggestData.negotiable } : {}),
        ...(suggestData.purpose ? { purpose: suggestData.purpose } : {}),
        ...(suggestData.invest_amount ? { invest_amount: suggestData.invest_amount } : {}),
        ...(suggestData.move_in_date ? { move_in_date: suggestData.move_in_date } : {}),
        ...(suggestData.move_in_date_type ? { move_in_date_type: suggestData.move_in_date_type } : {}),
        ...(suggestData.note ? { note: suggestData.note } : {}),
        ...(suggestData.interview_available_times
          ? { interview_available_times: suggestData.interview_available_times }
          : {}),
        ...(suggestData.danji_id
          ? { pyoungs: suggestData.pyoungs.split(',') }
          : { pyoung_from: suggestData.pyoung_from }),
      };

      if (params) {
        const normalizedParams = normalizeParams(params);

        const formArray =
          suggestData.buy_or_rents === BuyOrRent.Buy.toString()
            ? Object.values(forms)
                .map((item) => item)
                .filter((ele) => ele !== 'summary' && ele !== 'move_in_date')
            : Object.values(forms)
                .map((item) => item)
                .filter((ele) => ele !== 'summary' && ele !== 'buy_purpose');

        if (normalizedParams) {
          // @ts-expect-error
          setState((prev) => ({
            ...prev,
            forms: formArray,
            ...normalizedParams,
          }));
        }
      }
    }
  }, [danjiDataLoading, danjiIData, normalizeParams, setState, suggestData, suggestDataLoading, suggestID]);
}
