import { RegionItem } from '@/components/organisms/RegionList';
import { Forms } from '@/components/templates/SuggestRegionalForm/FormRenderer';
import { BuyOrRent } from '@/constants/enums';
import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import { useCallback, useState } from 'react';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import makeSuggestRegionalParams from './makeSuggestRegionalParams';

export default function useSuggestRegionalForm() {
  const router = useRouter();

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

  const handleChangeRealestateType = useCallback((value: number[]) => {
    setRealestateType(value);
  }, []);

  const handleChangeBuyOrRent = useCallback((value: number) => {
    setBuyOrRent(value);
  }, []);

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
    setNextForm(Forms.BuyOrRent);
  }, [setNextForm]);

  const handleSubmitBuyOrRent = useCallback(() => {
    setNextForm(Forms.Price);
  }, [setNextForm]);

  const handleSubmitPrice = useCallback(() => {
    setNextForm(Forms.Area);
  }, [setNextForm]);

  const handleSubmitArea = useCallback(() => {
    if (buyOrRent === BuyOrRent.Buy) {
      setNextForm(Forms.Purpose);
    } else {
      setNextForm(Forms.Floor);
    }
  }, [buyOrRent, setNextForm]);

  const handleSubmitFloor = useCallback(() => {
    setNextForm(Forms.Description);
  }, [setNextForm]);

  const handleSubmitPurpose = useCallback(() => {
    setNextForm(Forms.Floor);
  }, [setNextForm]);

  const handleSubmitFinal = useCallback(async () => {
    if (!bubjungdong) return;

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

    router.replace(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.SuggestRegionalSummary}`,
        query: {
          params: JSON.stringify(params),
        },
      },
      `/${Routes.EntryMobile}/${Routes.SuggestRegionalSummary}`,
    );
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
      handleSubmitRegion();
    },
    [handleSubmitRegion],
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

  // 필드 자동스크롤 로직
  useIsomorphicLayoutEffect(() => {
    const currentForm = forms[forms.length - 1];
    setTimeout(() => {
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

        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
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
      if (!realestateType.length) {
        setNextButtonDisabled(true);
      }
    }

    if (currentForm === Forms.BuyOrRent) {
      if (!buyOrRent) {
        setNextButtonDisabled(true);
      }
    }

    if (currentForm === Forms.Price) {
      if (!price) {
        setNextButtonDisabled(true);
      }
    }

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
  };
}
