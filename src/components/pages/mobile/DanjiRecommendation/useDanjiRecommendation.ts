import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import { useState, useCallback } from 'react';
import { Forms } from '@/components/templates/DanjiRecommendation/FormRenderer';
import { BuyOrRent } from '@/constants/enums';
import { toast } from 'react-toastify';
import Routes from '@/router/routes';
import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { useAPI_DanjiRealPricesPyoungList } from '@/apis/danji/danjiRealPricesPyoungList';
import { useRouter } from 'next/router';
import { TimeTypeString } from '@/constants/strings';
import makeRecommendDanjiParams from './makeRecommendDanjiParams';

export default function useDanjiRecommendation() {
  const router = useRouter();

  const [forms, setForms] = useState<string[]>(router?.query?.entry === 'danji' ? [Forms.BuyOrRent] : [Forms.Danji]);
  const [isDanjiListOpen, setIsDanjiListOpen] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [danjiID, setDanjiID] = useState<string | null>(router?.query?.danjiID as string);
  const [buyOrRent, setBuyOrRent] = useState(0);
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

  const [openResetPopup, setOpenResetPopup] = useState(false);

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
    buyOrRent: buyOrRent || null,
  });

  const handleChangeBuyOrRent = useCallback(
    (value: number) => {
      if (forms.length > 2 && buyOrRent) {
        setOpenResetPopup(true);
        return;
      }
      setPrice('');
      setBuyOrRent(value);
    },
    [buyOrRent, forms.length],
  );

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

  const handleOpenDanjiList = useCallback(() => {
    setIsDanjiListOpen(true);
  }, []);

  const handleCloseDanjiList = useCallback(() => {
    setIsDanjiListOpen(false);
  }, []);

  const setNextForm = useCallback((...formNames: string[]) => {
    setForms((prev) => [...prev, ...formNames]);
  }, []);

  const handleSubmitDanji = useCallback(() => {
    setNextForm(Forms.BuyOrRent);
  }, [setNextForm]);

  const handleSubmitBuyOrRent = useCallback(() => {
    if (buyOrRent === BuyOrRent.Buy) {
      setNextForm(Forms.Purpose);
      return;
    }
    setNextForm(Forms.MoveInDate);
  }, [setNextForm, buyOrRent]);

  const handleSubmitMoveInDate = useCallback(() => {
    setNextForm(Forms.Option);
  }, [setNextForm]);

  const handleSubmitPurpose = useCallback(() => {
    setNextForm(Forms.Option);
  }, [setNextForm]);

  const onClosePopup = useCallback(() => {
    setOpenResetPopup(false);
  }, []);

  const onConfirmPopup = useCallback(() => {
    if (router?.query?.entry === 'danji' || router?.query?.entry === 'danjiSuggestListings') {
      setForms([Forms.BuyOrRent]);
    } else {
      setForms([Forms.Danji, Forms.BuyOrRent]);
    }
    setBuyOrRent(0);
    setPrice('');
    setMonthlyRentFee('');
    setQuickSale('');
    setInvestAmount('');
    setNegotiable(true);
    setPyoungList([]);
    setPurpose('');
    setMoveInDate(null);
    setMoveInDateType('이전');
    setDescription('');
    setOpenResetPopup(false);
    setEmptyTextFields({
      price: false,
      investAmount: false,
    });
    setInterviewAvailabletimes([]);
  }, [router?.query?.entry]);

  const handleSubmitFinal = useCallback(async () => {
    // danji
    if (!danjiID) {
      const form = document.getElementById(Forms.Danji);
      form?.scrollIntoView({ behavior: 'smooth' });
      toast.error('어느 단지를 추천받고 싶은지 선택해주세요.');
      return;
    }

    // buy or rent
    if (!buyOrRent) {
      const form = document.getElementById(Forms.BuyOrRent);
      form?.scrollIntoView({ behavior: 'smooth' });
      toast.error('매물의 거래 종류를 선택해 주세요.');
      return;
    }

    if (buyOrRent === BuyOrRent.Buy && quickSale === '0' && !price) {
      const form = document.getElementById(Forms.BuyOrRent);
      form?.scrollIntoView({ behavior: 'smooth' });
      setEmptyTextFields({ ...emptyTextFields, price: true });
      return;
    }

    // purpose
    if (purpose === '투자' && !investAmount) {
      const form = document.getElementById(Forms.Purpose);
      form?.scrollIntoView({ behavior: 'smooth' });
      setEmptyTextFields({ ...emptyTextFields, investAmount: true });
      return;
    }

    // area

    if (!pyoungList.length) {
      const form = document.getElementById(Forms.Area);
      form?.scrollIntoView({ behavior: 'smooth' });
      toast.error('평수를 선택해 주세요.');
      return;
    }

    // move in date
    if (purpose !== '투자' && !moveInDate) {
      if (buyOrRent === BuyOrRent.Buy) {
        const form = document.getElementById(Forms.Purpose);
        form?.scrollIntoView({ behavior: 'smooth' });
        toast.error('입주 희망일을 입력해주세요.');
        return;
      }

      const form = document.getElementById(Forms.MoveInDate);
      form?.scrollIntoView({ behavior: 'smooth' });
      toast.error('입주 희망일을 입력해주세요.');
      return;
    }

    // interviewAvailabletimes
    if (interviewAvailabletimes.length === 0) {
      const form = document.getElementById(Forms.Option);
      form?.scrollIntoView({ behavior: 'smooth' });
      toast.error('인터뷰 가능 시간대를 선택해 주세요.');
      return;
    }

    const params = makeRecommendDanjiParams({
      danjiID,
      name: danji.name,
      buyOrRent,
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
      interviewAvailabletimes,
    });

    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.DanjiRecommendationSummary}`,
      query: {
        entry: router?.query?.entry ? (router?.query?.entry as string) : '',
        redirect: router?.query?.redirect ? (router?.query?.redirect as string) : '',
        danjiID,
        params: JSON.stringify(params),
        forms: JSON.stringify(forms),
      },
    });
  }, [
    forms,
    danjiID,
    buyOrRent,
    price,
    monthlyRentFee,
    investAmount,
    purpose,
    moveInDate,
    pyoungList,
    router,
    danji,
    moveInDateType,
    description,
    negotiable,
    quickSale,
    interviewAvailabletimes,
    emptyTextFields,
  ]);

  const handleChangeDanjiID = useCallback(
    (value: string) => {
      setDanjiID(value);
      setPyoungList([]);
      const currentForm = forms[forms.length - 1];
      if (currentForm === Forms.Danji) {
        handleSubmitDanji();
      }
    },
    [handleSubmitDanji, forms],
  );

  const handleClickNext = useCallback(() => {
    const lastForm = forms[forms.length - 1];
    switch (lastForm) {
      case Forms.Danji:
        handleSubmitDanji();
        break;

      case Forms.BuyOrRent:
        handleSubmitBuyOrRent();
        break;

      case Forms.Purpose:
        handleSubmitPurpose();
        break;

      case Forms.MoveInDate:
        handleSubmitMoveInDate();
        break;
      case Forms.Option:
        handleSubmitFinal();
        break;

      default:
        break;
    }
  }, [forms, handleSubmitDanji, handleSubmitBuyOrRent, handleSubmitPurpose, handleSubmitMoveInDate, handleSubmitFinal]);

  // 단지 id 프리필 로직
  useIsomorphicLayoutEffect(() => {
    if (typeof router.query.danjiID === 'string') {
      setDanjiID(router.query.danjiID);
    }
  }, [router.query.danjiID]);

  // 필드 자동스크롤 로직
  useIsomorphicLayoutEffect(() => {
    const currentForm = forms[forms.length - 1];

    const formContainer = document.getElementById('formContainer');
    const formElement = document.getElementById(currentForm);

    const containerHeight = formContainer?.getBoundingClientRect().height ?? 0;

    if (formElement) {
      formElement.style.minHeight = `${containerHeight}px`;
      const prevForm = forms[forms.length - 2];
      if (prevForm) {
        const prevFormElement = document.getElementById(prevForm);
        if (prevFormElement) {
          prevFormElement.style.minHeight = '';
        }
      }

      setTimeout(() => formElement.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  }, [forms]);

  // 버튼 비활성화 로직
  useIsomorphicLayoutEffect(() => {
    setNextButtonDisabled(false);
    const currentForm = forms[forms.length - 1];

    if (currentForm === Forms.Danji) {
      if (!danjiID) {
        setNextButtonDisabled(true);
      }
    }

    if (currentForm === Forms.BuyOrRent) {
      if (!buyOrRent) {
        setNextButtonDisabled(true);
      }
      if (buyOrRent === BuyOrRent.Buy && quickSale === '0' && !price) {
        setNextButtonDisabled(true);
      }
      if (buyOrRent !== BuyOrRent.Buy && !price) {
        setNextButtonDisabled(true);
      }
    }

    if (currentForm === Forms.Area) {
      if (!pyoungList.length) {
        setNextButtonDisabled(true);
      }
    }

    if (currentForm === Forms.MoveInDate) {
      if (!moveInDate) {
        setNextButtonDisabled(true);
      }
    }

    if (currentForm === Forms.Purpose) {
      if (!purpose) {
        setNextButtonDisabled(true);
      }

      if (purpose === '투자') {
        if (investAmount === '') {
          setNextButtonDisabled(true);
        }
      } else if (purpose === '실거주') {
        if (!moveInDate) {
          setNextButtonDisabled(true);
        }
      }
    }

    if (currentForm === Forms.Option) {
      if (interviewAvailabletimes.length === 0) {
        setNextButtonDisabled(true);
      }
    }
  }, [
    forms,
    danjiID,
    buyOrRent,
    investAmount,
    purpose,
    moveInDate,
    pyoungList,
    price,
    quickSale,
    interviewAvailabletimes,
  ]);

  // 수정하기 프리필 로직

  useIsomorphicLayoutEffect(() => {
    if (!router.query.params) return;
    if (!router.query.forms) return;

    setForms(JSON.parse(router.query.forms as string));

    const params: Record<string, unknown> = JSON.parse(router.query.params as string);

    setDanjiID(router.query.danjiID as string);

    if (Number(params.buy_or_rents) === BuyOrRent.Buy) {
      setBuyOrRent(1);
      setPrice(params.trade_price ? String(params.trade_price)?.slice(0, -4) : '');
      setInvestAmount(params.invest_amount ? String(params.invest_amount)?.slice(0, -4) : '');
      setQuickSale(params.quick_sale ? String(+(params.quick_sale as unknown as boolean)) : '0');
    } else {
      setBuyOrRent(2);
      setPrice(params.deposit ? String(params.deposit)?.slice(0, -4) : '');
      setMonthlyRentFee(params.monthly_rent_fee ? String(params.monthly_rent_fee)?.slice(0, -4) : '');
    }

    setNegotiable(Boolean(params.negotiable));

    setPyoungList((params.pyoungs as number[]) ?? []);

    setPurpose(String(params.purpose ?? ''));

    if (String(params.purpose) === '투자') {
      setMoveInDate(null);
      setMoveInDateType('이전');
    } else {
      setMoveInDate(new Date(String(params.move_in_date ?? '')));
      setMoveInDateType(params.move_in_date_type ? TimeTypeString[Number(params.move_in_date_type)] : '이전');
    }

    setDescription(String(params.note ?? ''));

    setInterviewAvailabletimes(String(params.interview_available_times).split(',') as unknown as string[]);

    if (router.query.entry === 'danji' || router.query.entry === 'danjiSuggestListings') {
      const formBuyOrRent = document.getElementById(Forms.BuyOrRent);
      
      if (formBuyOrRent) formBuyOrRent.style.minHeight = '';
    }

    const formDanji = document.getElementById(Forms.Danji);
    
    if (formDanji) {
      formDanji.style.minHeight = '';
    }
  }, []);

  return {
    forms,
    isDanjiListOpen,
    nextButtonDisabled,

    danji: danji?.name,

    danjiID,
    handleChangeDanjiID,

    buyOrRent,
    handleChangeBuyOrRent,

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

    openResetPopup,

    handleOpenDanjiList,
    handleCloseDanjiList,
    handleSubmitDanji,
    handleSubmitBuyOrRent,
    handleSubmitMoveInDate,
    handleSubmitPurpose,
    handleSubmitFinal,

    handleClickNext,
    onClosePopup,
    onConfirmPopup,

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
