import { RegionItem } from '@/components/organisms/RegionList';
import { Forms } from '@/components/templates/SuggestRegionalForm/FormRenderer';
import { BuyOrRent, RealestateType } from '@/constants/enums';
import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import { useCallback, useState } from 'react';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { searchAddress } from '@/lib/kakao/search_address';
import { TimeTypeString } from '@/constants/strings';
import makeSuggestRegionalParams from './makeSuggestRegionalParams';

export default function useSuggestRegionalForm() {
  const router = useRouter();

  const [forms, setForms] = useState<string[]>([Forms.BasicInfo]);
  const [isRegionListOpen, setIsRegionListOpen] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  const [bubjungdong, setBubjungdong] = useState<RegionItem | null>(null);
  const [realestateType, setRealestateType] = useState<number[]>([]);
  const [buyOrRent, setBuyOrRent] = useState(0);
  const [price, setPrice] = useState('');
  const [monthlyRentFee, setMonthlyRentFee] = useState('');
  const [investAmount, setInvestAmount] = useState('');
  const [negotiable, setNegotiable] = useState(true);
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [purpose, setPurpose] = useState('');
  const [moveInDate, setMoveInDate] = useState<Date | null>(null);
  const [moveInDateType, setMoveInDateType] = useState('이전');
  const [remainingAmountDate, setRemainingAmountDate] = useState<Date | null>(null);
  const [remainingAmountDateType, setRemainingAmountDateType] = useState('이전');
  const [interviewAvailabletimes, setInterviewAvailabletimes] = useState<string[]>([]);
  const [description, setDescription] = useState('');

  const [openResetPopup, setOpenResetPopup] = useState(false);

  const [emptyTextFields, setEmptyTextFields] = useState({
    price: false,
    investAmount: false,
  });

  const handleChangeRealestateType = useCallback((value: number[]) => {
    setRealestateType(value);
  }, []);

  const handleChangeBuyOrRent = useCallback(
    (value: number) => {
      if (forms.length > 2 && buyOrRent) {
        setOpenResetPopup(true);
        return;
      }
      setPrice('');
      setMonthlyRentFee('');
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

  const handleChangeRemainingAmountDate = useCallback((value: Date | null) => {
    setRemainingAmountDate(value);
  }, []);

  const handleChangeRemainingAmountDateType = useCallback((value: string) => {
    setRemainingAmountDateType(value);
  }, []);

  const handleChangeInterviewAvailabletimes = useCallback(
    (value: string) => {
      if (value === '시간대 상관 없어요') {
        if (interviewAvailabletimes.includes(value)) {
          const result = interviewAvailabletimes.filter((ele) => ele !== value);
          setInterviewAvailabletimes(result);
        } else {
          setInterviewAvailabletimes([value]);
        }
      } else {
        const result = interviewAvailabletimes.includes('시간대 상관 없어요')
          ? [value]
          : interviewAvailabletimes.includes(value)
          ? interviewAvailabletimes.filter((ele) => ele !== value)
          : [...interviewAvailabletimes, value];
        setInterviewAvailabletimes(result);
      }
    },
    [interviewAvailabletimes],
  );

  const handleOpenRegionList = useCallback(() => {
    setIsRegionListOpen(true);
  }, []);

  const handleCloseRegionList = useCallback(() => {
    setIsRegionListOpen(false);
  }, []);

  const setNextForm = useCallback((...formNames: string[]) => {
    setForms((prev) => [...prev, ...formNames]);
  }, []);

  const handleSubmitBasicInfo = useCallback(() => {
    if (buyOrRent === BuyOrRent.Buy) {
      setNextForm(Forms.Purpose);
      return;
    }
    setNextForm(Forms.MoveInDate);
  }, [setNextForm, buyOrRent]);

  const handleSubmitMoveInDate = useCallback(() => {
    setNextForm(Forms.Option);
  }, [setNextForm]);

  const handleSubmitArea = useCallback(() => {
    setNextForm(Forms.Description);
  }, [setNextForm]);

  const handleSubmitPurpose = useCallback(() => {
    setNextForm(Forms.Option);
  }, [setNextForm]);

  const onClosePopup = useCallback(() => {
    setOpenResetPopup(false);
  }, []);

  const onConfirmPopup = useCallback(() => {
    setForms([Forms.BasicInfo]);
    setRealestateType([]);
    setBuyOrRent(0);
    setPrice('');
    setMonthlyRentFee('');
    setInvestAmount('');
    setNegotiable(true);
    setMinArea('');
    setMaxArea('');
    setPurpose('');
    setMoveInDate(null);
    setRemainingAmountDate(null);
    setMoveInDateType('이전');
    setRemainingAmountDateType('이전');
    setDescription('');
    setOpenResetPopup(false);
    setEmptyTextFields({
      price: false,
      investAmount: false,
    });
    setInterviewAvailabletimes([]);
  }, []);

  const handleSubmitFinal = useCallback(async () => {
    if (!bubjungdong) return;

    // region
    if (!bubjungdong) {
      const form = document.getElementById(Forms.BasicInfo);
      form?.scrollIntoView({ behavior: 'smooth' });
      toast.error('어느 지역을 추천받고 싶은지 선택해주세요.');
      return;
    }

    // realestate type
    if (!realestateType.length) {
      const form = document.getElementById(Forms.BasicInfo);
      form?.scrollIntoView({ behavior: 'smooth' });
      toast.error('매물의 부동산 종류를 선택해주세요');
      return;
    }

    // buy or rent
    if (!buyOrRent) {
      const form = document.getElementById(Forms.BasicInfo);
      form?.scrollIntoView({ behavior: 'smooth' });
      toast.error('매물의 거래 종류를 선택해 주세요.');
      return;
    }

    if (buyOrRent === BuyOrRent.Buy && !price) {
      const form = document.getElementById(Forms.BasicInfo);
      form?.scrollIntoView({ behavior: 'smooth' });
      setEmptyTextFields({ ...emptyTextFields, price: true });
      return;
    }

    if (buyOrRent !== BuyOrRent.Buy && !monthlyRentFee && !price) {
      const form = document.getElementById(Forms.BasicInfo);
      form?.scrollIntoView({ behavior: 'smooth' });
      setEmptyTextFields({ ...emptyTextFields, price: true });
      return;
    }

    // area
    if (minArea && maxArea) {
      if (Number(minArea) > Number(maxArea)) {
        const form = document.getElementById(Forms.Area);
        form?.scrollIntoView({ behavior: 'smooth' });
        toast.error('최소 면적이 최대 면적보다 큽니다.');
        return;
      }
    }

    // purpose
    if (purpose === '투자' && !investAmount) {
      const form = document.getElementById(Forms.Purpose);
      form?.scrollIntoView({ behavior: 'smooth' });
      setEmptyTextFields({ ...emptyTextFields, investAmount: true });
      return;
    }
    // move in date
    if (purpose !== '투자' && !moveInDate) {
      if (buyOrRent === BuyOrRent.Buy) {
        const form = document.getElementById(Forms.BasicInfo);
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

    const params = makeSuggestRegionalParams({
      bubjungdong,
      realestateType,
      buyOrRent,
      price,
      investAmount,
      monthlyRentFee,
      negotiable,
      minArea,
      maxArea,
      purpose,
      moveInDate,
      moveInDateType,
      description,
      interviewAvailabletimes,
    });

    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.SuggestRegionalSummary}`,
      query: {
        params: JSON.stringify(params),
        forms: JSON.stringify(forms),
        ...(router?.query?.entry ? { entry: router.query.entry as string } : {}),
        ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
      },
    });
  }, [
    bubjungdong,
    realestateType,
    buyOrRent,
    price,
    monthlyRentFee,
    investAmount,
    negotiable,
    minArea,
    maxArea,
    purpose,
    moveInDate,
    moveInDateType,
    description,
    router,
    emptyTextFields,
    forms,
    interviewAvailabletimes,
  ]);

  const handleChangeBubjungdong = useCallback((item: RegionItem) => {
    setBubjungdong(item);
  }, []);

  const handleClickNext = useCallback(() => {
    const lastForm = forms[forms.length - 1];
    switch (lastForm) {
      case Forms.BasicInfo:
        handleSubmitBasicInfo();
        break;

      case Forms.Area:
        handleSubmitArea();
        break;

      case Forms.MoveInDate:
        handleSubmitMoveInDate();
        break;

      case Forms.Purpose:
        handleSubmitPurpose();
        break;

      case Forms.Option:
        handleSubmitFinal();
        break;

      case Forms.Description:
        break;

      default:
        break;
    }
  }, [forms, handleSubmitBasicInfo, handleSubmitMoveInDate, handleSubmitArea, handleSubmitPurpose, handleSubmitFinal]);

  // 법정동 프리필 로직
  useIsomorphicLayoutEffect(() => {
    if (typeof router.query.address === 'string') {
      searchAddress(router.query.address).then((data) => {
        const bCode = data?.documents?.[0].address?.b_code;
        if (bCode) {
          setBubjungdong({
            name: router.query.address as string,
            code: bCode,
          });
        }
      });
    }
  }, [router.query.address]);

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

      setTimeout(() => {
        if (router.query.params) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [forms]);

  console.log(router.query);

  // 버튼 비활성화 로직
  useIsomorphicLayoutEffect(() => {
    setNextButtonDisabled(false);
    const currentForm = forms[forms.length - 1];

    if (currentForm === Forms.BasicInfo) {
      if (!bubjungdong || !realestateType.length || !buyOrRent || !price) {
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
    bubjungdong,
    realestateType,
    buyOrRent,
    price,
    purpose,
    remainingAmountDate,
    moveInDate,
    investAmount,
    interviewAvailabletimes,
  ]);

  // 수정하기 프리필 로직
  useIsomorphicLayoutEffect(() => {
    if (!router.query.params) return;
    if (!router.query.forms) return;

    setForms(JSON.parse(router.query.forms as string));

    const params: Record<string, unknown> = JSON.parse(router.query.params as string);

    setRealestateType(
      String(params.realestate_types)
        .split(',')
        .map((v) => +v)
        .filter((type) => type !== RealestateType.Yunrip),
    );

    if (Number(params.buy_or_rents) === BuyOrRent.Buy) {
      setBuyOrRent(1);
      setPrice(params.trade_price ? String(params.trade_price)?.slice(0, -4) : '');
      setInvestAmount(params.invest_amount ? String(params.invest_amount)?.slice(0, -4) : '');
    } else {
      setBuyOrRent(2);
      setPrice(params.deposit ? String(params.deposit)?.slice(0, -4) : '');
      setMonthlyRentFee(params.monthly_rent_fee ? String(params.monthly_rent_fee)?.slice(0, -4) : '');
    }

    setNegotiable(Boolean(params.negotiable));

    setMinArea(String(params.pyoung_from ?? ''));

    setMaxArea(String(params.pyoung_to ?? ''));

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

    const basicInfo = document.getElementById(Forms.BasicInfo);
    if (basicInfo) {
      basicInfo.style.minHeight = '';
    }
  }, []);

  return {
    forms,
    isRegionListOpen,
    nextButtonDisabled,
    handleClickNext,
    handleOpenRegionList,
    handleCloseRegionList,

    bubjungdong,
    handleChangeBubjungdong,

    realestateType,
    handleChangeRealestateType,

    buyOrRent,
    handleChangeBuyOrRent,

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

    remainingAmountDate,
    handleChangeRemainingAmountDate,

    remainingAmountDateType,
    handleChangeRemainingAmountDateType,

    interviewAvailabletimes,
    handleChangeInterviewAvailabletimes,

    openResetPopup,
    onClosePopup,
    onConfirmPopup,

    emptyTextFields,
  };
}
