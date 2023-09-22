import { useRouter, useIsomorphicLayoutEffect } from '@/hooks/utils';
import { useState, useCallback } from 'react';
import Routes from '@/router/routes';
import { toast } from 'react-toastify';
import { BuyOrRent, RealestateType } from '@/constants/enums';
import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';
import { TimeTypeString } from '@/constants/strings';
import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';
import { mutate } from 'swr';
import updateSuggest from '@/apis/suggest/updateSuggest';

export default function useSuggestRegionalFormUpdate(depth: number) {
  const router = useRouter(depth);
  const suggestID = Number(router.query.suggestID) ?? 0;

  const { data, isLoading } = useAPI_GetSuggestDetail(suggestID);

  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [realestateType, setRealestateType] = useState<number[]>([]);
  const [price, setPrice] = useState('');
  const [monthlyRentFee, setMonthlyRentFee] = useState('');
  const [investAmount, setInvestAmount] = useState('');
  const [negotiable, setNegotiable] = useState(true);
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [purpose, setPurpose] = useState('');
  const [moveInDate, setMoveInDate] = useState<Date | null>(null);
  const [moveInDateType, setMoveInDateType] = useState('이전');
  const [description, setDescription] = useState('');
  const buyOrRent = Number(data?.buy_or_rents);

  const [emptyTextFields, setEmptyTextFields] = useState({
    price: false,
    investAmount: false,
  });

  const handleChangeRealestateType = useCallback((value: number[]) => {
    setRealestateType(value);
  }, []);

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

  const handleChangeMinArea = useCallback((value: string) => {
    setMinArea(value);
  }, []);

  const handleChangeMaxArea = useCallback((value: string) => {
    setMaxArea(value);
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

  const handleSubmitFinal = useCallback(async () => {
    if (minArea && maxArea && Number(minArea) > Number(maxArea)) {
      toast.error('최소평수가 최대평수보다 큽니다.');
      return;
    }

    function getDateType(value?: string) {
      if (value === '이전') return 1;
      if (value === '이후') return 2;
      return 3;
    }

    const request: Record<string, unknown> = {
      suggest_id: data?.suggest_id,
      realestate_types: realestateType.includes(RealestateType.Dasaedae)
        ? `${[...realestateType, RealestateType.Yunrip]}`
        : `${realestateType}`,
      buy_or_rents: data?.buy_or_rents,
      invest_amount: buyOrRent === BuyOrRent.Buy && purpose === '투자' ? convertPriceInputToNumber(investAmount) : 0,
      trade_price: buyOrRent === BuyOrRent.Buy ? convertPriceInputToNumber(price) : 0,
      deposit: buyOrRent !== BuyOrRent.Buy ? convertPriceInputToNumber(price) : 0,
      monthly_rent_fee: buyOrRent !== BuyOrRent.Buy ? convertPriceInputToNumber(monthlyRentFee) : 0,
      negotiable,
      pyoung_from: minArea,
      pyoung_to: minArea === maxArea ? undefined : maxArea,
      purpose: buyOrRent === BuyOrRent.Buy ? purpose : '',

      move_in_date: purpose === '투자' ? null : moveInDate?.toISOString(),
      move_in_date_type: purpose === '투자' ? null : getDateType(moveInDateType),
      note: description,
    };
    Object.keys(request).forEach((key) => (request[key] === undefined || request[key] === '') && delete request[key]);

    await updateSuggest(request);
    await mutate('/suggest/detail');

    toast.success('구해요 글이 수정되었습니다.');

    router.replace(Routes.MySuggestDetail, {
      searchParams: {
        suggestID: `${data?.suggest_id}`,
      },
    });
  }, [
    router,
    minArea,
    maxArea,
    realestateType,
    buyOrRent,
    purpose,
    price,
    monthlyRentFee,
    negotiable,
    investAmount,
    moveInDate,
    moveInDateType,
    description,
    data?.suggest_id,
    data?.buy_or_rents,
  ]);

  // 프리필 로직
  useIsomorphicLayoutEffect(() => {
    if (typeof router.query.suggestID !== 'string') {
      router.pop();
    }
    setRealestateType(
      data?.realestate_types
        .split(',')
        .map((v: string) => Number(v))
        .filter((v) => v !== RealestateType.Yunrip) ?? [],
    );
    setPrice(String(data?.trade_or_deposit_price ?? '').slice(0, -4));
    setMonthlyRentFee(String(data?.monthly_rent_fee ?? '').slice(0, -4));
    setInvestAmount(String(data?.invest_amount ?? '').slice(0, -4));
    setNegotiable(data?.negotiable ?? true);
    setMinArea(String(data?.pyoung_from ?? ''));
    setMaxArea(String(data?.pyoung_to ?? ''));
    setPurpose(data?.purpose ?? '');
    setMoveInDate(data?.move_in_date ? new Date(data?.move_in_date) : null);
    setMoveInDateType(data?.move_in_date_type ? TimeTypeString[data?.move_in_date_type] : '이전');
    setDescription(data?.note ?? '');
  }, [router.query.suggestID]);

  useIsomorphicLayoutEffect(() => {
    setNextButtonDisabled(true);

    if (!realestateType.length) return;
    if (purpose === '투자' && !investAmount) return;
    if (purpose !== '투자' && !moveInDate) return;
    if (!price) return;

    setNextButtonDisabled(false);
  }, [realestateType, purpose, investAmount, moveInDate, price]);

  return {
    targetText: data?.request_target_text,
    buyOrRentText: Number(data?.buy_or_rents) === BuyOrRent.Buy ? '매매' : '전월세',
    isLoading,

    nextButtonDisabled,

    realestateType,
    handleChangeRealestateType,

    buyOrRent: data?.buy_or_rents,

    price,
    handleChangePrice,

    monthlyRentFee,
    handleChangeMonthlyRentFee,

    investAmount,
    handleChangeInvestAmount,

    negotiable,
    handleChangeNegotiable,

    minArea,
    handleChangeMinArea,

    maxArea,
    handleChangeMaxArea,

    purpose,
    handleChangePurpose,

    description,
    handleChangeDescription,

    moveInDate,
    handleChangeMoveInDate,

    moveInDateType,
    handleChangeMoveInDateType,

    emptyTextFields,

    handleSubmitFinal,
  };
}
