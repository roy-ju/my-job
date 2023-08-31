import { RegionItem } from '@/components/organisms/RegionList';
import { Forms } from '@/components/templates/SuggestRegionalForm/FormRenderer';
import { BuyOrRent } from '@/constants/enums';
import { useIsomorphicLayoutEffect, useRouter } from '@/hooks/utils';
import { useCallback, useState } from 'react';
import Routes from '@/router/routes';
import { toast } from 'react-toastify';
import { searchAddress } from '@/lib/kakao/search_address';

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
  const [investAmount, setInvestAmount] = useState('');
  const [negotiable, setNegotiable] = useState(true);
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [purpose, setPurpose] = useState('');
  const [moveInDate, setMoveInDate] = useState<Date | null>(null);
  const [moveInDateType, setMoveInDateType] = useState('이전');
  const [remainingAmountDate, setRemainingAmountDate] = useState<Date | null>(null);
  const [remainingAmountDateType, setRemainingAmountDateType] = useState('이전');
  const [description, setDescription] = useState('');

  const [isPrefillingBubjungdong, setIsPrefillingBubjungdong] = useState(true);
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

  const handleOpenRegionList = useCallback(() => {
    setIsRegionListOpen(true);
  }, []);

  const handleCloseRegionList = useCallback(() => {
    setIsRegionListOpen(false);
  }, []);

  const setNextForm = useCallback((...formNames: string[]) => {
    setForms((prev) => [...prev, ...formNames]);
  }, []);

  const handleSubmitRegion = useCallback(() => {
    setNextForm(Forms.RealestateType);
  }, [setNextForm]);

  const handleSubmitRealestateType = useCallback(() => {
    if (buyOrRent === BuyOrRent.Buy) {
      setNextForm(Forms.Purpose);
      return;
    }
    setNextForm(Forms.MoveInDate);
  }, [setNextForm, buyOrRent]);

  const handleSubmitBuyOrRent = useCallback(() => {}, []);

  const handleSubmitMoveInDate = useCallback(() => {
    setNextForm(Forms.Option);
  }, [setNextForm]);

  const handleSubmitPrice = useCallback(() => {
    setNextForm(Forms.Description);
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
    setForms([Forms.Region, Forms.RealestateType]);
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
  }, []);

  const handleSubmitFinal = useCallback(async () => {
    if (!bubjungdong) return;

    // region
    if (!bubjungdong) {
      const form = document.getElementById(Forms.Region);
      form?.scrollIntoView({ behavior: 'smooth' });
      toast.error('어느 지역을 추천받고 싶은지 선택해주세요.');
      return;
    }
    // realestate type
    if (!realestateType.length) {
      const form = document.getElementById(Forms.RealestateType);
      form?.scrollIntoView({ behavior: 'smooth' });
      toast.error('매물의 부동산 종류를 선택해주세요');
      return;
    }
    // buy or rent
    if (!buyOrRent) {
      const form = document.getElementById(Forms.RealestateType);
      form?.scrollIntoView({ behavior: 'smooth' });
      toast.error('매물의 거래 종류를 선택해 주세요.');
      return;
    }

    if (buyOrRent === BuyOrRent.Buy && !price) {
      const form = document.getElementById(Forms.RealestateType);
      form?.scrollIntoView({ behavior: 'smooth' });
      setEmptyTextFields({ ...emptyTextFields, price: true });
      return;
    }

    if (buyOrRent !== BuyOrRent.Buy && !price) {
      const form = document.getElementById(Forms.RealestateType);
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
        const form = document.getElementById(Forms.RealestateType);
        form?.scrollIntoView({ behavior: 'smooth' });
        toast.error('입주 희망일을 입력해주세요.');
        return;
      }

      const form = document.getElementById(Forms.MoveInDate);
      form?.scrollIntoView({ behavior: 'smooth' });
      toast.error('입주 희망일을 입력해주세요.');
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
  }, [
    forms,
    handleSubmitRegion,
    handleSubmitRealestateType,
    handleSubmitBuyOrRent,
    handleSubmitPrice,
    handleSubmitMoveInDate,
    handleSubmitArea,
    handleSubmitPurpose,
    handleSubmitFinal,
  ]);

  const handleClickBack = useCallback(() => {
    if (router.query.back === 'true' && router.query.redirect)
      return () => {
        router.replace(router.query.redirect as string);
      };
  }, [router]);

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
      if (!realestateType.length || !buyOrRent || !price) {
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
  }, [forms, bubjungdong, realestateType, buyOrRent, price, purpose, remainingAmountDate, moveInDate, investAmount]);

  return {
    forms,
    isRegionListOpen,
    nextButtonDisabled,
    handleClickNext,
    handleOpenRegionList,
    handleCloseRegionList,
    handleClickBack,

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

    isPrefillingBubjungdong,
    openResetPopup,
    onClosePopup,
    onConfirmPopup,

    emptyTextFields,
  };
}
