import { RegionItem } from '@/components/organisms/RegionList';
import { Forms } from '@/components/templates/SuggestRegionalForm/FormRenderer';
import { BuyOrRent } from '@/constants/enums';
import { useIsomorphicLayoutEffect, useRouter } from '@/hooks/utils';
import { useCallback, useState } from 'react';
import Routes from '@/router/routes';
import { toast } from 'react-toastify';
import { searchAddress } from '@/lib/kakao/search_address';
import * as gtag from '@/lib/gtag';
import makeSuggestRegionalParams from './makeSuggestRegionalParams';

export default function useSuggestRegionalForm(depth: number) {
  const router = useRouter(depth);

  const [forms, setForms] = useState<string[]>([Forms.Region]);
  const [isRegionListOpen, setIsRegionListOpen] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  const [bubjungdong, setBubjungdong] = useState<RegionItem | null>(null);
  const [realestateType, setRealestateType] = useState<number[]>([]);
  const [buyOrRent, setBuyOrRent] = useState(0);
  const [price, setPrice] = useState('');
  const [monthlyRentFee, setMonthlyRentFee] = useState('');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [floor, setFloor] = useState<string[]>(['저층', '중층', '고층']);
  const [purpose, setPurpose] = useState('');
  const [moveInDate, setMoveInDate] = useState<Date | null>(null);
  const [remainingAmountDate, setRemainingAmountDate] = useState<Date | null>(null);
  const [moveInDateType, setMoveInDateType] = useState('이전');
  const [remainingAmountDateType, setRemainingAmountDateType] = useState('이전');
  const [description, setDescription] = useState('');

  const [isPrefillingBubjungdong, setIsPrefillingBubjungdong] = useState(true);
  const [openResetPopup, setOpenResetPopup] = useState(false);

  const handleChangeRealestateType = useCallback((value: number[]) => {
    setRealestateType(value);
  }, []);

  const handleChangeBuyOrRent = useCallback(
    (value: number) => {
      if (forms.length > 2 && buyOrRent) {
        setOpenResetPopup(true);
        return;
      }
      setBuyOrRent(value);
    },
    [buyOrRent, forms.length],
  );

  const handleChangePrice = useCallback((value: string) => {
    setPrice(value);
  }, []);

  const handleChangeMonthlyRentFee = useCallback((value: string) => {
    setMonthlyRentFee(value);
  }, []);

  const handleChangeMinArea = useCallback((value: string) => {
    setMinArea(value);
  }, []);

  const handleChangeMaxArea = useCallback((value: string) => {
    setMaxArea(value);
  }, []);

  const handleChangeFloor = useCallback((value: string[]) => {
    setFloor(value);
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

  const handleOpenRegionList = useCallback(() => {
    gtag.event({
      action: 'suggest_regional_choose_region_click',
      category: 'button_click',
      label: '지역선택 버튼',
      value: '',
    });

    setIsRegionListOpen(true);
  }, []);

  const handleCloseRegionList = useCallback(() => {
    setIsRegionListOpen(false);
  }, []);

  const setNextForm = useCallback((...formNames: string[]) => {
    setForms((prev) => [...prev, ...formNames]);
  }, []);

  const handleSubmitRegion = useCallback(() => {
    gtag.event({
      action: 'suggest_regional_region_submit',
      category: 'button_click',
      label: '지역선택 선택완료 버튼',
      value: '',
    });

    setNextForm(Forms.RealestateType);
  }, [setNextForm]);

  const handleSubmitRealestateType = useCallback(() => {
    gtag.event({
      action: 'suggest_regional_realestate_type_submit',
      category: 'button_click',
      label: '부동산종류 및 거래종류 선택후 다음 버튼',
      value: '',
    });

    setNextForm(Forms.Area);
  }, [setNextForm]);

  const handleSubmitBuyOrRent = useCallback(() => {}, []);

  const handleSubmitPrice = useCallback(() => {
    gtag.event({
      action: 'suggest_regional_price_submit',
      category: 'button_click',
      label: '가격대 입력후 다음버튼',
      value: '',
    });

    setNextForm(Forms.Description);
  }, [setNextForm]);

  const handleSubmitArea = useCallback(() => {
    gtag.event({
      action: 'suggest_regional_area_submit',
      category: 'button_click',
      label: '관심있는 평수 선택후 다음버튼',
      value: '',
    });

    setNextForm(Forms.Floor);
  }, [setNextForm]);

  const handleSubmitFloor = useCallback(() => {
    gtag.event({
      action: 'suggest_regional_floor_submit',
      category: 'button_click',
      label: '관심있는 층수 선택후 다음버튼',
      value: '',
    });

    if (buyOrRent === BuyOrRent.Buy) {
      setNextForm(Forms.Purpose);
    } else {
      setNextForm(Forms.Price);
    }
  }, [buyOrRent, setNextForm]);

  const handleSubmitPurpose = useCallback(() => {
    gtag.event({
      action: 'suggest_regional_trade_purpose_submit',
      category: 'button_click',
      label: '매매거래 목적 및 입주/잔급일 선택후 다음버튼',
      value: '',
    });

    setNextForm(Forms.Price);
  }, [setNextForm]);

  const onClosePopup = useCallback(() => {
    setOpenResetPopup(false);
  }, []);

  const onConfirmPopup = useCallback(() => {
    setForms([Forms.Region, Forms.RealestateType]);
    setRealestateType([]);
    setBuyOrRent(0);
    setPrice('');
    setMonthlyRentFee('');
    setMinArea('');
    setMaxArea('');
    setFloor(['저층', '중층', '고층']);
    setPurpose('');
    setMoveInDate(null);
    setRemainingAmountDate(null);
    setMoveInDateType('이전');
    setRemainingAmountDateType('이전');
    setDescription('');
    setOpenResetPopup(false);
  }, []);

  const handleSubmitFinal = useCallback(async () => {
    if (!bubjungdong) return;

    // region
    if (!bubjungdong) {
      const form = document.getElementById(Forms.Region);
      form?.scrollIntoView();
      toast.error('어느 지역을 추천받고 싶은지 선택해주세요.');
      return;
    }
    // realestate type
    if (!realestateType) {
      const form = document.getElementById(Forms.RealestateType);
      form?.scrollIntoView();
      toast.error('매물의 부동산 종류를 선택해주세요');
      return;
    }
    // buy or rent
    if (!buyOrRent) {
      const form = document.getElementById(Forms.RealestateType);
      form?.scrollIntoView();
      toast.error('매물의 거래 종류를 선택해 주세요.');
      return;
    }
    // price
    // if (!price) {
    //   const form = document.getElementById(Forms.Price);
    //   form?.scrollIntoView();
    //   toast.error('매물의 가격대를 입력해주세요.');
    //   return;
    // }
    // floor
    if (!floor.length) {
      const form = document.getElementById(Forms.Floor);
      form?.scrollIntoView();
      toast.error('관심있는 층수를 선택해 주세요.');
      return;
    }

    const params = makeSuggestRegionalParams({
      bubjungdong,
      realestateType,
      buyOrRent,
      price,
      monthlyRentFee,
      minArea,
      maxArea,
      floor,
      purpose,
      moveInDate,
      moveInDateType,
      remainingAmountDate,
      remainingAmountDateType,
      description,
    });

    gtag.event({
      action: 'suggest_regional_final_submit',
      category: 'button_click',
      label: '지역매물 추천요청 확인버튼',
      value: '',
    });

    router.replace(Routes.SuggestRegionalSummary, {
      searchParams: {
        params: JSON.stringify(params),
      },
    });
  }, [
    bubjungdong,
    realestateType,
    buyOrRent,
    price,
    monthlyRentFee,
    minArea,
    maxArea,
    floor,
    purpose,
    moveInDate,
    moveInDateType,
    remainingAmountDate,
    remainingAmountDateType,
    description,
    router,
  ]);

  const handleChangeBubjungdong = useCallback(
    (item: RegionItem) => {
      setBubjungdong(item);
      const currentForm = forms[forms.length - 1];
      if (currentForm === Forms.Region) {
        handleSubmitRegion();
      }
    },
    [handleSubmitRegion, forms],
  );

  const handleClickNext = useCallback(() => {
    const lastForm = forms[forms.length - 1];
    switch (lastForm) {
      case Forms.Region:
        handleSubmitRegion();
        break;

      case Forms.RealestateType:
        handleSubmitRealestateType();
        break;

      case Forms.BuyOrRent:
        handleSubmitBuyOrRent();
        break;

      case Forms.Price:
        handleSubmitPrice();
        break;

      case Forms.Area:
        handleSubmitArea();
        break;

      case Forms.Floor:
        handleSubmitFloor();
        break;

      case Forms.Purpose:
        handleSubmitPurpose();
        break;

      case Forms.Description:
        handleSubmitFinal();
        break;

      default:
        break;
    }
  }, [
    forms,
    handleSubmitRegion,
    handleSubmitRealestateType,
    handleSubmitBuyOrRent,
    handleSubmitPrice,
    handleSubmitArea,
    handleSubmitFloor,
    handleSubmitPurpose,
    handleSubmitFinal,
  ]);

  // 법정동 프리필 로직
  useIsomorphicLayoutEffect(() => {
    if (typeof router.query.address === 'string') {
      setIsPrefillingBubjungdong(true);
      searchAddress(router.query.address).then((data) => {
        const bCode = data?.documents?.[0].address?.b_code;
        if (bCode) {
          setBubjungdong({
            name: router.query.address as string,
            code: bCode,
          });
          setIsPrefillingBubjungdong(false);
        }
      });
    } else {
      setIsPrefillingBubjungdong(false);
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

      setTimeout(() => formElement.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  }, [forms]);

  // 버튼 비활성화 로직
  useIsomorphicLayoutEffect(() => {
    setNextButtonDisabled(false);
    const currentForm = forms[forms.length - 1];

    if (currentForm === Forms.Region) {
      if (!bubjungdong) {
        setNextButtonDisabled(true);
      }
    }

    if (currentForm === Forms.RealestateType) {
      if (!realestateType.length || !buyOrRent) {
        setNextButtonDisabled(true);
      }
    }

    // if (currentForm === Forms.BuyOrRent) {
    //   if (!buyOrRent) {
    //     setNextButtonDisabled(true);
    //   }
    // }

    // if (currentForm === Forms.Price) {
    //   if (!price) {
    //     setNextButtonDisabled(true);
    //   }
    // }

    if (currentForm === Forms.Floor) {
      if (!floor.length) {
        setNextButtonDisabled(true);
      }
    }

    if (currentForm === Forms.Purpose) {
      if (!purpose) {
        setNextButtonDisabled(true);
      }

      if (purpose === '투자') {
        if (!remainingAmountDate) {
          setNextButtonDisabled(true);
        }
      } else if (purpose === '실거주') {
        if (!moveInDate) {
          setNextButtonDisabled(true);
        }
      }
    }
  }, [forms, bubjungdong, realestateType, buyOrRent, price, floor, purpose, remainingAmountDate, moveInDate]);

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

    minArea,
    handleChangeMinArea,

    maxArea,
    handleChangeMaxArea,

    floor,
    handleChangeFloor,

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

    isPrefillingBubjungdong,
    openResetPopup,
    onClosePopup,
    onConfirmPopup,
  };
}
