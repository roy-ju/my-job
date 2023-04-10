import { CollateralType, DebtSuccessionType, InterimType } from '@/components/templates/ListingCreateForm/FormContext';
import { Forms } from '@/components/templates/ListingCreateForm/FormRenderer';
import { BuyOrRent } from '@/constants/enums';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import { useIsomorphicLayoutEffect, useRouter } from '@/hooks/utils';
// import Routes from '@/router/routes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type PopupType = 'none' | 'buyOrRentChagne';

export default function useListingCreateForm(depth: number) {
  const router = useRouter(depth);
  // 매물 주소 정보
  const [addressData, setAddressData] = useState<KakaoAddressAutocompleteResponseItem | null>(null);
  // 화면에 띄워진 팝업
  const [popup, setPopup] = useState<PopupType>('none');
  // 현재 화면에 그려진 입력필드들
  const [forms, setForms] = useState<string[]>([Forms.IsOwner]);
  // 소유자 본인인지 아닌지
  const [isOwner, setIsOwner] = useState(true);
  // 소유자 성명
  const [ownerName, setOwnerName] = useState('');
  // 소유자 휴대폰번호
  const [ownerPhone, setOwnerPhone] = useState('');
  // 거래 유형 매매/전세/월세
  const [buyOrRent, setBuyOrRent] = useState(0);
  // 가격 매매가/전세가
  const [price, setPrice] = useState('');
  // 월세
  const [monthlyRentFee, setMonthlyRentFee] = useState('');
  // 계약금
  const [contractAmount, setContractAmount] = useState('');
  // 계약금 협의 가능
  const [contractAmountNegotiable, setContractAmountNegotiable] = useState(true);
  // 잔금
  const [remainingAmount, setRemainingAmount] = useState('');
  const [remainingAmountDate, setRemainingAmountDate] = useState('');
  const [remainingAmountBeforeOrAfter, setRemainingAMountBeforeOrAfter] = useState('이전');
  // 중도금
  const [interims, setInterims] = useState<InterimType[]>([]);
  // 채무승계 보증금
  const [debtSuccessionDeposit, setDebtSuccessionDeposit] = useState('');
  // 채무승계 기타
  const [debtSuccessionMiscs, setDebtSuccessionMiscs] = useState<DebtSuccessionType[]>([]);
  // 선순위 담보권
  const [collaterals, setCollaterals] = useState<CollateralType[]>([]);
  // 특약사항
  const [specialTerms, setSpecialTerms] = useState('');
  // 입주가능시기
  const [moveInDate, setMoveInDate] = useState('');
  const [beforeOrAfter, setBeforeOrAfter] = useState('이전');
  // 임대할 부분
  const [rentArea, setRentArea] = useState('');
  // 임대기간
  const [rentTermYear, setRentTermYear] = useState('2년');
  const [rentTermMonth, setRentTermMonth] = useState('0개월');
  const [rentTermNegotiable, setRentTermNegotiable] = useState(true);

  const addressLine1 = useMemo(() => {
    if (addressData) {
      if (addressData.roadAddressName) {
        return addressData.roadAddressName;
      }
      return addressData.addressName;
    }
    return '';
  }, [addressData]);

  const addressLine2 = useMemo(() => {
    if (addressData && addressData.placeName) {
      return addressData.placeName;
    }
    return '';
  }, [addressData]);

  useEffect(() => {
    const { addressData: inAddressData } = router.query;
    if (!inAddressData) {
      // router.replace(Routes.ListingCreateAddress);
    } else {
      const parsed = JSON.parse(inAddressData as string) as KakaoAddressAutocompleteResponseItem;
      setAddressData(parsed);
    }
  }, [router]);

  const setNextForm = useCallback((...formNames: string[]) => {
    setForms((prev) => [...prev, ...formNames]);
  }, []);

  const resetBuyOrRent = useCallback(() => {
    setBuyOrRent(0);
  }, []);

  const resetPrice = useCallback(() => {
    setPrice('');
    setMonthlyRentFee('');
  }, []);

  const resetPaymentSchedules = useCallback(() => {
    setContractAmount('');
    setContractAmountNegotiable(true);
    setInterims([]);
    setRemainingAmount('');
  }, []);

  const resetDebtSuccessions = useCallback(() => {
    setDebtSuccessionDeposit('');
    setDebtSuccessionMiscs([]);
  }, []);

  // formName 이후에 있는 팝업들을 다 지운다.
  const resetForms = useCallback(
    (formName: string) => {
      const index = forms.findIndex((form) => form === formName);

      forms.slice(index, forms.length).forEach((form) => {
        if (form === Forms.BuyOrRent) {
          resetBuyOrRent();
        }
        if (form === Forms.Price) {
          resetPrice();
        }
        if (form === Forms.PaymentSchedules) {
          resetPaymentSchedules();
        }
        if (form === Forms.DebtSuccessions) {
          resetDebtSuccessions();
        }
      });

      const newForms = [...forms];
      newForms.splice(index + 1, newForms.length - index);
      setForms(newForms);
    },
    [forms, resetBuyOrRent, resetPrice, resetPaymentSchedules, resetDebtSuccessions],
  );

  // 아래 Callback들은 Input Validations 과 다음에는 어떤 필드가 올지 결정하는 핸들러들

  // 소유자 본인 submit
  const handleSubmitIsOwner = useCallback(() => {
    if (!isOwner && (!ownerName || !ownerPhone)) {
      console.error('owner_name and owner_phone is required when isOwner is false');
      return;
    }
    setNextForm(Forms.BuyOrRent);
  }, [isOwner, ownerPhone, ownerName, setNextForm]);

  // 거래유형 submit
  const handleSubmitBuyOrRent = useCallback(() => {
    if (buyOrRent === 0) {
      console.error('buy_or_rent cannot be 0');
      return;
    }

    setNextForm(Forms.Price);
  }, [buyOrRent, setNextForm]);

  // 가격 submit
  const handleSubmitPrice = useCallback(() => {
    if (price === '') {
      console.error('price is required');
      return;
    }

    if (buyOrRent === BuyOrRent.Wolsae && monthlyRentFee === '') {
      console.error('monthly_rent_fee is required');
      return;
    }

    if (buyOrRent === BuyOrRent.Buy) {
      setNextForm(Forms.DebtSuccessions);
    } else {
      setNextForm(Forms.RentArea);
    }
  }, [buyOrRent, price, monthlyRentFee, setNextForm]);

  // 채무승계 submit
  const handleSubmitDebtSuccessions = useCallback(() => {
    setNextForm(Forms.MoveInDate);
  }, [setNextForm]);

  // 임대할 부분 submit
  const handleSubmitRentArea = useCallback(() => {
    setNextForm(Forms.RentTerm);
  }, [setNextForm]);

  // 입주가능시기 submit
  const handleSubmitMoveInDate = useCallback(() => {
    setNextForm(Forms.PaymentSchedules);
  }, [setNextForm]);

  // 임대기간 submit
  const handleSubmitRentTerm = useCallback(() => {
    setNextForm(Forms.MoveInDate);
  }, [setNextForm]);

  // 희망지급일정 submit
  const handleSubmitPaymentSchedules = useCallback(() => {
    if (buyOrRent === BuyOrRent.Buy) {
      setNextForm(Forms.SpecialTerms);
    } else {
      setNextForm(Forms.Collaterals);
    }
  }, [buyOrRent, setNextForm]);

  //  선순위 담보권 submit
  const handleSubmitCollaterals = useCallback(() => {
    setNextForm(Forms.JeonsaeLoan);
  }, [setNextForm]);

  // 전세자금 대출 여부 submit
  const handleSubmitJeonsaeLaon = useCallback(() => {
    setNextForm(Forms.SpecialTerms);
  }, [setNextForm]);

  // 특약사항 submit
  const handleSubmitSpecialTerms = useCallback(() => {
    setNextForm(Forms.Optionals);
  }, [setNextForm]);

  // 모든 필드 다 입력후 최종적으로 다음 버튼 눌렀을때 handler
  const handleSubmitFinal = useCallback(() => {
    console.log(router.asPath);
    console.log({
      addressData,
      isOwner,
      ownerName,
      ownerPhone,
      buyOrRent,
      price,
      monthlyRentFee,
      contractAmount,
      contractAmountNegotiable,
      remainingAmount,
      interims,
      debtSuccessionDeposit,
      debtSuccessionMiscs,
    });

    // router.replace(Routes.ListingCreateChooseAgent);
  }, [
    addressData,
    isOwner,
    ownerName,
    ownerPhone,
    buyOrRent,
    price,
    monthlyRentFee,
    contractAmount,
    contractAmountNegotiable,
    remainingAmount,
    interims,
    debtSuccessionDeposit,
    debtSuccessionMiscs,
    router,
  ]);

  const handleClickNext = useCallback(() => {
    const lastForm = forms[forms.length - 1];
    switch (lastForm) {
      case Forms.IsOwner:
        handleSubmitIsOwner();
        break;
      case Forms.BuyOrRent:
        handleSubmitBuyOrRent();
        break;
      case Forms.Price:
        handleSubmitPrice();
        break;
      case Forms.DebtSuccessions:
        handleSubmitDebtSuccessions();
        break;
      case Forms.RentArea:
        handleSubmitRentArea();
        break;
      case Forms.MoveInDate:
        handleSubmitMoveInDate();
        break;
      case Forms.RentTerm:
        handleSubmitRentTerm();
        break;
      case Forms.PaymentSchedules:
        handleSubmitPaymentSchedules();
        break;
      case Forms.Collaterals:
        handleSubmitCollaterals();
        break;
      case Forms.JeonsaeLoan:
        handleSubmitJeonsaeLaon();
        break;
      case Forms.SpecialTerms:
        handleSubmitSpecialTerms();
        break;
      case Forms.Optionals:
        handleSubmitFinal();
        break;
      default:
        break;
    }
  }, [
    forms,
    handleSubmitIsOwner,
    handleSubmitBuyOrRent,
    handleSubmitPrice,
    handleSubmitPaymentSchedules,
    handleSubmitSpecialTerms,
    handleSubmitDebtSuccessions,
    handleSubmitRentArea,
    handleSubmitMoveInDate,
    handleSubmitRentTerm,
    handleSubmitCollaterals,
    handleSubmitJeonsaeLaon,
    handleSubmitFinal,
  ]);

  // 입력필드 값 Change Event Handlers

  const handleChangeIsOwner = useCallback((value: boolean) => {
    setIsOwner(value);
  }, []);

  const handleChangeOwnerName = useCallback((value: string) => {
    setOwnerName(value);
  }, []);

  const handleChangeOwnerPhone = useCallback((value: string) => {
    setOwnerPhone(value);
  }, []);

  const handleChangeBuyOrRent = useCallback(
    (value: number) => {
      const currentForm = forms[forms.length - 1];
      if (currentForm !== Forms.BuyOrRent) {
        setPopup('buyOrRentChagne');
      } else {
        setBuyOrRent(value);
      }
    },
    [forms],
  );

  const handleChangePrice = useCallback((value: string) => {
    setPrice(value);
  }, []);

  const handleChangeMonthlyRentFee = useCallback((value: string) => {
    setMonthlyRentFee(value);
  }, []);

  const handleChangeContractAmount = useCallback((value: string) => {
    setContractAmount(value);
  }, []);

  const handleChangeContractAmountNegotiable = useCallback((value: boolean) => {
    setContractAmountNegotiable(value);
  }, []);

  const handleChangeRemainingAmount = useCallback((value: string) => {
    setRemainingAmount(value);
  }, []);

  const handleChangeInterimPrice = useCallback(
    (key: string) => (value: string) => {
      setInterims((prev) => {
        const updated = [...prev];
        const interim = prev.find((item) => item.key === key);
        if (interim) {
          interim.price = value;
        }
        return updated;
      });
    },
    [],
  );

  const handleChangeInterimNegotiable = useCallback(
    (key: string) => (value: boolean) => {
      setInterims((prev) => {
        const updated = [...prev];
        const interim = prev.find((item) => item.key === key);
        if (interim) {
          interim.negotiable = value;
        }
        return updated;
      });
    },
    [],
  );

  // 중도금 삭제
  const handleRemoveInterim = useCallback(
    (key: string) => () => {
      setInterims((prev) => prev.filter((interim) => interim.key !== key));
    },
    [],
  );

  // 중도금 추가
  const handleAddInterim = useCallback(() => {
    const newInterims = [...interims];
    const key = uuidv4();
    newInterims.push({ price: '', negotiable: true, key });
    newInterims[newInterims.length - 1].onRemove = handleRemoveInterim(key);
    newInterims[newInterims.length - 1].onChangePrice = handleChangeInterimPrice(key);
    newInterims[newInterims.length - 1].onChangeNegotiable = handleChangeInterimNegotiable(key);
    setInterims(newInterims);
  }, [interims, handleRemoveInterim, handleChangeInterimPrice, handleChangeInterimNegotiable]);

  const handleChangeDebtSuccessionDeposit = useCallback((value: string) => {
    setDebtSuccessionDeposit(value);
  }, []);

  const handleChangeDebtSuccessionMiscPrice = useCallback(
    (key: string) => (value: string) => {
      setDebtSuccessionMiscs((prev) => {
        const updated = [...prev];
        const interim = prev.find((item) => item.key === key);
        if (interim) {
          interim.price = value;
        }
        return updated;
      });
    },
    [],
  );

  const handleChangeDebtSuccessionMiscName = useCallback(
    (key: string) => (value: string) => {
      setDebtSuccessionMiscs((prev) => {
        const updated = [...prev];
        const interim = prev.find((item) => item.key === key);
        if (interim) {
          interim.name = value;
        }
        return updated;
      });
    },
    [],
  );

  const handleRemoveDebtSuccessionMisc = useCallback(
    (key: string) => () => {
      setDebtSuccessionMiscs((prev) => prev.filter((interim) => interim.key !== key));
    },
    [],
  );

  const handleAddDebtSuccessionMisc = useCallback(() => {
    const newDebtSuccessions = [...debtSuccessionMiscs];
    const key = uuidv4();
    newDebtSuccessions.push({ price: '', name: '', key });
    newDebtSuccessions[newDebtSuccessions.length - 1].onChangePrice = handleChangeDebtSuccessionMiscPrice(key);
    newDebtSuccessions[newDebtSuccessions.length - 1].onChangeName = handleChangeDebtSuccessionMiscName(key);
    newDebtSuccessions[newDebtSuccessions.length - 1].onRemove = handleRemoveDebtSuccessionMisc(key);
    setDebtSuccessionMiscs(newDebtSuccessions);
  }, [
    debtSuccessionMiscs,
    handleChangeDebtSuccessionMiscPrice,
    handleChangeDebtSuccessionMiscName,
    handleRemoveDebtSuccessionMisc,
  ]);

  const handleChangeCollateralPrice = useCallback(
    (key: string) => (value: string) => {
      setCollaterals((prev) => {
        const updated = [...prev];
        const interim = prev.find((item) => item.key === key);
        if (interim) {
          interim.price = value;
        }
        return updated;
      });
    },
    [],
  );

  const handleChangeCollateralName = useCallback(
    (key: string) => (value: string) => {
      setCollaterals((prev) => {
        const updated = [...prev];
        const interim = prev.find((item) => item.key === key);
        if (interim) {
          interim.name = value;
        }
        return updated;
      });
    },
    [],
  );

  const handleRemoveCollateral = useCallback(
    (key: string) => () => {
      setCollaterals((prev) => prev.filter((interim) => interim.key !== key));
    },
    [],
  );

  const handleAddCollaterals = useCallback(() => {
    const newCollaterals = [...collaterals];
    const key = uuidv4();
    newCollaterals.push({ price: '', name: '', key });
    newCollaterals[newCollaterals.length - 1].onChangePrice = handleChangeCollateralPrice(key);
    newCollaterals[newCollaterals.length - 1].onChangeName = handleChangeCollateralName(key);
    newCollaterals[newCollaterals.length - 1].onRemove = handleRemoveCollateral(key);
    setCollaterals(newCollaterals);
  }, [collaterals, handleChangeCollateralPrice, handleChangeCollateralName, handleRemoveCollateral]);

  const handleChangeSpecialTerms = useCallback((value: string) => {
    setSpecialTerms(value);
  }, []);

  const handleChangeMoveInDate = useCallback((value: string) => {
    setMoveInDate(value);
  }, []);

  const handleChangeBeforeOrAfter = useCallback((value: string) => {
    setBeforeOrAfter(value);
  }, []);

  const handleChangeRemainingAmountDate = useCallback((value: string) => {
    setRemainingAmountDate(value);
  }, []);

  const handleChangeRemainingAmountBeforeOrAfter = useCallback((value: string) => {
    setRemainingAMountBeforeOrAfter(value);
  }, []);

  const handleChangeRentArea = useCallback((value: string) => {
    setRentArea(value);
  }, []);

  const handleChangeRentTermYear = useCallback((value: string) => {
    setRentTermYear(value);
  }, []);

  const handleChangeRentTermMonth = useCallback((value: string) => {
    setRentTermMonth(value);
  }, []);

  const handleChangeRentTermNegotiable = useCallback((value: boolean) => {
    setRentTermNegotiable(value);
  }, []);

  // 필드 자동스크롤 로직
  useIsomorphicLayoutEffect(() => {
    const currentForm = forms[forms.length - 1];
    if (currentForm === Forms.IsOwner) return;

    const formContainer = document.getElementById('formContainer');
    const formElement = document.getElementById(currentForm);
    const nextButtonContainer = document.getElementById('formSubmitContainer');

    const containerHeight = formContainer?.getBoundingClientRect().height ?? 0;
    const formElementHeight = formElement?.getBoundingClientRect().height ?? 0;

    if (nextButtonContainer) {
      const height = containerHeight - formElementHeight;
      if (height > 0) {
        nextButtonContainer.style.minHeight = `${height}px`;
      } else {
        nextButtonContainer.style.minHeight = '';
      }
      formElement?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [forms]);

  // 팝업 콜백들

  const closePopup = useCallback(() => {
    setPopup('none');
  }, []);

  const handleConfirmChangeBuyOrRent = useCallback(() => {
    setPopup('none');
    resetForms(Forms.BuyOrRent);
  }, [resetForms]);

  return useMemo(
    () => ({
      addressLine1,
      addressLine2,

      forms,
      isOwner,
      ownerName,
      ownerPhone,
      buyOrRent,
      price,
      monthlyRentFee,

      contractAmount,
      contractAmountNegotiable,
      remainingAmount,
      interims,

      debtSuccessionDeposit,
      debtSuccessionMiscs,
      collaterals,

      specialTerms,

      moveInDate,
      beforeOrAfter,

      handleChangeIsOwner,
      handleChangeOwnerName,
      handleChangeOwnerPhone,
      handleChangeBuyOrRent,
      handleClickNext,
      handleChangePrice,
      handleChangeMonthlyRentFee,
      handleChangeContractAmount,
      handleChangeContractAmountNegotiable,
      handleChangeRemainingAmount,
      handleAddInterim,
      handleChangeDebtSuccessionDeposit,
      handleAddDebtSuccessionMisc,
      handleChangeSpecialTerms,
      handleAddCollaterals,
      handleChangeMoveInDate,
      handleChangeBeforeOrAfter,

      remainingAmountDate,
      remainingAmountBeforeOrAfter,
      handleChangeRemainingAmountDate,
      handleChangeRemainingAmountBeforeOrAfter,

      rentArea,
      handleChangeRentArea,

      rentTermMonth,
      rentTermYear,
      rentTermNegotiable,
      handleChangeRentTermMonth,
      handleChangeRentTermYear,
      handleChangeRentTermNegotiable,

      // Popup actions
      popup,
      closePopup,
      handleConfirmChangeBuyOrRent,
    }),
    [
      addressLine1,
      addressLine2,

      popup,
      forms,
      isOwner,
      ownerName,
      ownerPhone,
      buyOrRent,
      price,
      monthlyRentFee,
      contractAmount,
      contractAmountNegotiable,
      remainingAmount,

      interims,
      debtSuccessionDeposit,
      debtSuccessionMiscs,
      collaterals,

      specialTerms,
      moveInDate,
      beforeOrAfter,

      handleChangeIsOwner,
      handleChangeOwnerName,
      handleChangeOwnerPhone,
      handleChangeBuyOrRent,
      handleClickNext,
      closePopup,
      handleConfirmChangeBuyOrRent,
      handleChangePrice,
      handleChangeMonthlyRentFee,
      handleChangeContractAmount,
      handleChangeContractAmountNegotiable,
      handleChangeRemainingAmount,
      handleAddInterim,
      handleChangeDebtSuccessionDeposit,
      handleAddDebtSuccessionMisc,
      handleChangeSpecialTerms,
      handleAddCollaterals,
      handleChangeMoveInDate,
      handleChangeBeforeOrAfter,

      remainingAmountDate,
      remainingAmountBeforeOrAfter,
      handleChangeRemainingAmountDate,
      handleChangeRemainingAmountBeforeOrAfter,

      rentArea,
      handleChangeRentArea,

      rentTermMonth,
      rentTermYear,
      rentTermNegotiable,
      handleChangeRentTermMonth,
      handleChangeRentTermYear,
      handleChangeRentTermNegotiable,
    ],
  );
}
