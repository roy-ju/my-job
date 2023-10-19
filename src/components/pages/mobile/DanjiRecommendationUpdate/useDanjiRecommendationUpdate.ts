import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import { useState, useCallback } from 'react';
import { BuyOrRent } from '@/constants/enums';
import { toast } from 'react-toastify';
import Routes from '@/router/routes';
import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { useAPI_DanjiRealPricesPyoungList } from '@/apis/danji/danjiRealPricesPyoungList';
import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';
import { TimeTypeString } from '@/constants/strings';
import { mutate } from 'swr';
import updateSuggest from '@/apis/suggest/updateSuggest';
import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';
import { useRouter } from 'next/router';

export default function useDanjiRecommendationFormUpdate() {
  const router = useRouter();
  const suggestID = Number(router?.query?.suggestID) ?? 0;

  const { data, isLoading } = useAPI_GetSuggestDetail(suggestID);
  const danjiID = data?.danji_id ?? null;

  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [price, setPrice] = useState('');
  const [monthlyRentFee, setMonthlyRentFee] = useState('');
  const [quickSale, setQuickSale] = useState('0');
  const [investAmount, setInvestAmount] = useState('');
  const [negotiable, setNegotiable] = useState(true);
  const [pyoungInputValue, setPyoungInputValue] = useState('');
  const [pyoungList, setPyoungList] = useState<number[]>([]);
  const [purpose, setPurpose] = useState('');
  const [moveInDate, setMoveInDate] = useState<Date | null>(null);
  const [moveInDateType, setMoveInDateType] = useState('이전');
  const [description, setDescription] = useState('');
  const [interviewAvailabletimes, setInterviewAvailabletimes] = useState<string[]>([]);

  const [emptyTextFields, setEmptyTextFields] = useState({
    price: false,
    investAmount: false,
  });

  const { danji } = useAPI_GetDanjiDetail({
    danjiId: Number(danjiID) || null,
  });

  const { list: danjiRealPricesPyoungList, hasJyb } = useAPI_DanjiRealPricesPyoungList({
    danjiId: danji?.danji_id,
    realestateType: danji?.type,
    buyOrRent: null,
  });

  const handleChangePrice = useCallback(
    (value: string) => {
      setEmptyTextFields({ ...emptyTextFields, price: false });
      setPrice(value);
    },
    [emptyTextFields],
  );

  const handleChangeMonthlyRentFee = useCallback((value: string) => {
    setMonthlyRentFee(value);
  }, []);

  const handleChangeQuickSale = useCallback((value: string) => {
    setQuickSale(value);
  }, []);

  const handleChangeInvestAmount = useCallback(
    (value: string) => {
      setEmptyTextFields({ ...emptyTextFields, investAmount: false });
      setInvestAmount(value);
    },
    [emptyTextFields],
  );

  const handleChangeNegotiable = useCallback((value: boolean) => {
    setNegotiable(value);
  }, []);

  const handleChangePyoungInputValue = useCallback((value: string) => {
    setPyoungInputValue(value);
  }, []);

  const handleClickPyoungDeleteIcon = useCallback(() => {
    setPyoungInputValue('');
  }, []);

  const handleClickPyoungAddIcon = useCallback(
    (value: string) => {
      if (!value) return;

      if (pyoungList.includes(Number(value))) {
        toast.error('이미 추가하신 평형입니다.', { toastId: 'toast_already' });
        setPyoungInputValue('');
      } else {
        setPyoungList((prev) => [...prev, Number(value)]);
        setPyoungInputValue('');
      }
    },
    [pyoungList],
  );

  const handleClickPyoungButton = useCallback(
    (value: number) => {
      if (pyoungList.includes(value)) {
        setPyoungList((prev) => prev.filter((item) => item !== value));
      } else {
        setPyoungList((prev) => [...prev, value]);
      }
    },
    [pyoungList],
  );

  const handleClickPyoungCloseButton = useCallback((value: number) => {
    setPyoungList((prev) => prev.filter((item) => item !== value));
  }, []);

  const handleChangePyoungList = useCallback((value: number[]) => {
    setPyoungList(value);
  }, []);

  const handleChangePurpose = useCallback((value: string) => {
    if (value === '투자') {
      setMoveInDate(null);
      setMoveInDateType('이전');
    }
    if (value === '실거주') {
      setInvestAmount('');
    }
    setPurpose(value);
  }, []);

  const handleChangeDescription = useCallback((value: string) => {
    setDescription(value);
  }, []);

  const handleChangeMoveInDate = useCallback((value: Date | null) => {
    setMoveInDate(value);
  }, []);

  const handleChangeMoveInDateType = useCallback((value: string) => {
    setMoveInDateType(value);
  }, []);

    const handleChangeInterviewAvailabletimes = useCallback(
      (value: string) => {
        if (interviewAvailabletimes.includes(value)) {
          const result = interviewAvailabletimes.filter((ele) => ele !== value);

          setInterviewAvailabletimes(result);
        } else {
          setInterviewAvailabletimes((prev) => [...prev, value]);
        }
      },
      [interviewAvailabletimes],
    );

  const handleSubmitFinal = useCallback(async () => {
    function getDateType(value?: string) {
      if (value === '이전') return 1;
      if (value === '이후') return 2;
      return 3;
    }

    const request: Record<string, unknown> = {
      suggest_id: suggestID,
      realestate_types: data?.realestate_types,
      buy_or_rents: Number(data?.buy_or_rents) === BuyOrRent.Buy ? '1' : '2,3',
      invest_amount: Number(data?.buy_or_rents) === BuyOrRent.Buy ? convertPriceInputToNumber(investAmount) : 0,
      trade_price: Number(data?.buy_or_rents) === BuyOrRent.Buy ? convertPriceInputToNumber(price) : 0,
      deposit: Number(data?.buy_or_rents) !== BuyOrRent.Buy ? convertPriceInputToNumber(price) : 0,
      monthly_rent_fee: Number(data?.buy_or_rents) !== BuyOrRent.Buy ? convertPriceInputToNumber(monthlyRentFee) : 0,
      pyoungs: pyoungList.sort((a, b) => a - b).join(','),
      negotiable: Number(data?.buy_or_rents) === BuyOrRent.Buy && Boolean(+quickSale) === true ? false : negotiable,
      purpose: Number(data?.buy_or_rents) === BuyOrRent.Buy ? purpose : '',
      move_in_date: purpose === '투자' ? null : moveInDate?.toISOString(),
      move_in_date_type: purpose === '투자' ? null : getDateType(moveInDateType),
      note: description,
      quick_sale: Number(data?.buy_or_rents) === BuyOrRent.Buy ? Boolean(+quickSale) : null,
      interview_available_times: interviewAvailabletimes.join(),
    };

    Object.keys(request).forEach((key) => (request[key] === undefined || request[key] === '') && delete request[key]);

    await updateSuggest(request);
    
    await mutate('/suggest/detail');

    toast.success('구해요 글이 수정되었습니다.');

    router.replace(`/${Routes.EntryMobile}/${Routes.MySuggestDetail}?suggestID=${data?.suggest_id}`);
  }, [
    router,
    data?.suggest_id,
    suggestID,
    price,
    monthlyRentFee,
    quickSale,
    investAmount,
    negotiable,
    pyoungList,
    purpose,
    moveInDate,
    moveInDateType,
    description,
    data?.buy_or_rents,
    data?.realestate_types,
    interviewAvailabletimes,
  ]);

  // 프리필 로직
  useIsomorphicLayoutEffect(() => {
    if (typeof router.query.suggestID !== 'string') {
      router.back();
    }
    setPrice(String(data?.trade_or_deposit_price ?? '').slice(0, -4));
    setMonthlyRentFee(String(data?.monthly_rent_fee ?? '').slice(0, -4));
    setInvestAmount(String(data?.invest_amount ?? '').slice(0, -4));
    setQuickSale(data?.quick_sale ? '1' : '0');
    setNegotiable(data?.negotiable ?? true);
    setPyoungInputValue('');
    setPyoungList(data?.pyoungs?.split(',').map((v) => +v) ?? []);
    setDescription(data?.note ?? '');
    setPurpose(data?.purpose ?? '');
    setMoveInDate(data?.move_in_date ? new Date(data?.move_in_date) : null);
    setMoveInDateType(data?.move_in_date_type ? TimeTypeString[data?.move_in_date_type] : '이전');
    setInterviewAvailabletimes(data?.interview_available_times ? data.interview_available_times.split(',') : []);
  }, [router.query.danjiID]);

  useIsomorphicLayoutEffect(() => {
    setNextButtonDisabled(true);

    if (purpose === '투자' && !investAmount) return;

    if (purpose !== '투자' && !moveInDate) return;

    if (pyoungList.length === 0) return;

    if (!+quickSale && !price) return;

    if (interviewAvailabletimes.length === 0) return;

    setNextButtonDisabled(false);
  }, [purpose, investAmount, moveInDate, pyoungList, quickSale, price, interviewAvailabletimes]);

  return {
    targetText: data?.request_target_text,
    buyOrRentText: Number(data?.buy_or_rents) === BuyOrRent.Buy ? '매매' : '전월세',
    nextButtonDisabled,
    isLoading,

    danji: danji?.name,

    danjiID,

    buyOrRent: data?.buy_or_rents,

    price,
    handleChangePrice,

    monthlyRentFee,
    handleChangeMonthlyRentFee,

    quickSale,
    handleChangeQuickSale,

    investAmount,
    handleChangeInvestAmount,

    negotiable,
    handleChangeNegotiable,

    pyoungList,
    handleChangePyoungList,

    purpose,
    handleChangePurpose,

    moveInDate,
    moveInDateType,
    handleChangeMoveInDate,
    handleChangeMoveInDateType,

    description,
    handleChangeDescription,

    interviewAvailabletimes,
    handleChangeInterviewAvailabletimes,

    handleSubmitFinal,

    danjiRealPricesPyoungList: hasJyb === false ? undefined : danjiRealPricesPyoungList,

    pyoungInputValue,
    handleChangePyoungInputValue,
    handleClickPyoungDeleteIcon,
    handleClickPyoungAddIcon,
    handleClickPyoungButton,
    handleClickPyoungCloseButton,

    emptyTextFields,

    isEntryDanji: router?.query?.entry === 'danji' || router?.query?.entry === 'danjiSuggestListings',
  };
}
