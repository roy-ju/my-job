import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';

import { mutate } from 'swr';

import { toast } from 'react-toastify';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import { apiService } from '@/services';

import { useFetchDanjiSuggestsList } from '@/services/danji/useFetchDanjiSuggestsList';

import { DanjiOrRegionalType } from '@/constants/enums';

import Routes from '@/router/routes';

import SuggestFormState from '../../form/atoms/SuggestFormState';

import checkFinalValidation from '../../utils/checkFinalValidation';

import suggestUpdateParams from '../../utils/suggestUpdateParams';

export default function useUpdateFormSummitButton({ depth }: { depth?: number }) {
  const customRouter = useCustomRouter(depth);

  const router = useRouter();

  const { platform } = useCheckPlatform();

  const state = useRecoilValue(SuggestFormState);

  const { mutate: danjiSuggestsListMutate } = useFetchDanjiSuggestsList({
    danjiID: state.danjiID ? Number(state.danjiID) : null,
    pageSize: 4,
  });

  const updateSuggest = useCallback(
    async (params: Record<string, unknown>) => {
      try {
        await apiService.updateSuggest(params);

        await mutate('/suggest/detail');

        if (state.danjiOrRegion === DanjiOrRegionalType.Danji && platform === 'pc') {
          await danjiSuggestsListMutate();
        }

        toast.success('구해요 글이 수정되었습니다.');

        if (platform === 'pc') {
          customRouter.replace(Routes.MySuggestDetail, {
            searchParams: {
              suggestID: `${router?.query?.suggestID}`,
              ...(router?.query?.danjiID ? { danjiID: `${router.query.danjiID}` } : {}),
            },
          });
        } else {
          router.replace(`/${Routes.EntryMobile}/${Routes.MySuggestDetail}?suggestID=${router?.query?.suggestID}`);
        }
      } catch (error) {
        console.log(error);
        toast.error('업데이트 중 오류가 발생했습니다.');
      }
    },
    [customRouter, danjiSuggestsListMutate, platform, router, state.danjiOrRegion],
  );

  const handleSubmitUpdate = useCallback(async () => {
    if (!checkFinalValidation(state, 'update')) {
      return;
    }

    if (!router?.query?.suggestID) {
      return;
    }

    if (typeof router.query.suggestID !== 'string') {
      return;
    }

    const params = suggestUpdateParams({
      suggestID: router.query.suggestID,
      danjiOrRegion: state.danjiOrRegion,
      realestateTypes: state.realestateTypes,
      buyOrRent: state.buyOrRent,
      tradeOrDepositPrice: state.tradeOrDepositPrice,
      monthlyRentFee: state.monthlyRentFee,
      quickSale: state.quickSale,
      investAmount: state.investAmount,
      negotiable: state.negotiable,
      pyoungList: state.pyoungList,
      purpose: state.purpose,
      moveInDate: state.moveInDate,
      moveInDateType: state.moveInDateType,
      note: state.note,
      additionalConditions: state.additionalConditions,
      interviewAvailabletimes: state.interviewAvailabletimes,
    });

    await updateSuggest(params);
  }, [router.query.suggestID, state, updateSuggest]);

  // const disabled = useMemo(() => {
  //   if (!state.danjiOrRegion) return true;

  //   if (state.danjiOrRegion === DanjiOrRegionalType.Danji) {
  //     if (isEqualValue(state.quickSale, '0') && !state.tradeOrDepositPrice) {
  //       return true;
  //     }

  //     if (state.errorMessageTradeOrDepositPrice) {
  //       return true;
  //     }

  //     if (state.errorMessageMonthlyRentFeePrice) {
  //       return true;
  //     }

  //     if (isEqualValue(state.purpose, '투자') && !state.investAmount) {
  //       return true;
  //     }

  //     if (state.errorMessageInvestAmountPrice) {
  //       return true;
  //     }

  //     if (isNotEqualValue(state.purpose, '투자') && (!state.moveInDate || !state.moveInDateType)) {
  //       return true;
  //     }

  //     if (isEqualValue(state.pyoungList.length, 0)) {
  //       return true;
  //     }

  //     if (isEqualValue(state.additionalConditions.length, 0)) {
  //       return true;
  //     }

  //     if (isEqualValue(state.interviewAvailabletimes.length, 0)) {
  //       return true;
  //     }

  //     return false;
  //   }

  //   if (state.danjiOrRegion === DanjiOrRegionalType.Regional) {
  //     if (!state.realestateTypes.length) {
  //       return true;
  //     }

  //     if (!state.tradeOrDepositPrice) {
  //       return true;
  //     }

  //     if (state.errorMessageTradeOrDepositPrice) {
  //       return true;
  //     }

  //     if (state.errorMessageMonthlyRentFeePrice) {
  //       return true;
  //     }

  //     if (isEqualValue(state.purpose, '투자') && !state.investAmount) {
  //       return true;
  //     }

  //     if (state.errorMessageInvestAmountPrice) {
  //       return true;
  //     }

  //     if (isNotEqualValue(state.purpose, '투자') && (!state.moveInDate || !state.moveInDateType)) {
  //       return true;
  //     }

  //     if (isEqualValue(state.pyoungList.length, 0)) {
  //       return true;
  //     }

  //     if (isEqualValue(state.additionalConditions.length, 0)) {
  //       return true;
  //     }

  //     if (isEqualValue(state.interviewAvailabletimes.length, 0)) {
  //       return true;
  //     }

  //     return false;
  //   }

  //   return true;
  // }, [
  //   state.additionalConditions.length,
  //   state.danjiOrRegion,
  //   state.errorMessageInvestAmountPrice,
  //   state.errorMessageMonthlyRentFeePrice,
  //   state.errorMessageTradeOrDepositPrice,
  //   state.interviewAvailabletimes.length,
  //   state.investAmount,
  //   state.moveInDate,
  //   state.moveInDateType,
  //   state.purpose,
  //   state.pyoungList.length,
  //   state.quickSale,
  //   state.realestateTypes.length,
  //   state.tradeOrDepositPrice,
  // ]);

  return { handleSubmitUpdate };
}
