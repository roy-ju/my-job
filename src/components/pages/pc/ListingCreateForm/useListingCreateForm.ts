import { CollateralType, DebtSuccessionType, InterimType } from '@/components/templates/ListingCreateForm/FormContext';
import { Forms } from '@/components/templates/ListingCreateForm/FormRenderer';
import { BuyOrRent } from '@/constants/enums';
import { useAuth } from '@/hooks/services';
import { useIsomorphicLayoutEffect, useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import convertNumberToPriceInput from '@/utils/convertNumberToPriceInput';
import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';
import _ from 'lodash';
// import Routes from '@/router/routes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import makeListingCreateParams from './makeListingCreateParams';

type PopupType = 'none' | 'buyOrRentChagne';

export default function useListingCreateForm(depth: number) {
  const router = useRouter(depth);

  const { user } = useAuth();

  // 화면에 띄워진 팝업
  const [popup, setPopup] = useState<PopupType>('none');
  // 벨리데이션 에러 팝업
  const [errPopup, setErrPopup] = useState('');
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
  const [remainingAmountDateType, setRemainingAmountDateType] = useState('이전');
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
  const [dateType, setDateType] = useState('이전');
  // 임대할 부분
  const [rentArea, setRentArea] = useState('');
  // 임대기간
  const [rentTermYear, setRentTermYear] = useState('2년');
  const [rentTermMonth, setRentTermMonth] = useState('0개월');
  const [rentTermNegotiable, setRentTermNegotiable] = useState(true);

  const [jeonsaeLoan, setJeonsaeLoan] = useState(true);

  const [quickSale, setQuickSale] = useState(false);

  const addressLine1 = router.query.addressLine1 as string;
  const addressLine2 = router.query.addressLine2 as string;

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
      setErrPopup('owner_name and owner_phone is required when isOwner is false');
      return;
    }
    setNextForm(Forms.BuyOrRent);
  }, [isOwner, ownerPhone, ownerName, setNextForm]);

  // 거래유형 submit
  const handleSubmitBuyOrRent = useCallback(() => {
    if (buyOrRent === 0) {
      setErrPopup('buy_or_rent cannot be 0');
      return;
    }

    setNextForm(Forms.Price);
  }, [buyOrRent, setNextForm]);

  // 가격 submit
  const handleSubmitPrice = useCallback(() => {
    if (price === '') {
      setErrPopup('price is required');
      return;
    }

    if (buyOrRent === BuyOrRent.Wolsae && monthlyRentFee === '') {
      setErrPopup('monthly_rent_fee is required');
      return;
    }

    if (contractAmount === '') {
      setContractAmount(`${Math.floor(Number(price) * 0.1)}`);
    }

    if (buyOrRent === BuyOrRent.Buy) {
      setNextForm(Forms.DebtSuccessions);
    } else {
      setNextForm(Forms.RentArea);
    }
  }, [buyOrRent, price, contractAmount, monthlyRentFee, setNextForm]);

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
    if (contractAmount === '') {
      setErrPopup('contract_amount cannot be empty');
      return;
    }
    if (remainingAmount === '' || Number(remainingAmount) < 0) {
      setErrPopup('remaining_amount cannot be empty or less than 0');
      return;
    }

    if (buyOrRent === BuyOrRent.Buy) {
      setNextForm(Forms.SpecialTerms);
    } else {
      setNextForm(Forms.Collaterals);
    }
  }, [contractAmount, remainingAmount, buyOrRent, setNextForm]);

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
    // 한번더 최종 밸리데이션
    if (!isOwner && (!ownerName || !ownerPhone)) {
      setErrPopup('owner_name and owner_phone is required when isOwner is false');
      const isOwnerForm = document.getElementById(Forms.IsOwner);
      isOwnerForm?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (price === '') {
      setErrPopup('price is required');
      const priceForm = document.getElementById(Forms.Price);
      priceForm?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (buyOrRent === BuyOrRent.Wolsae && monthlyRentFee === '') {
      setErrPopup('monthly_rent_fee is required');
      const priceForm = document.getElementById(Forms.Price);
      priceForm?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (contractAmount === '') {
      setErrPopup('contract_amount cannot be empty');
      const paymentForm = document.getElementById(Forms.PaymentSchedules);
      paymentForm?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (remainingAmount === '' || Number(remainingAmount) < 0) {
      setErrPopup('remaining_amount cannot be empty or less than 0');
      const paymentForm = document.getElementById(Forms.PaymentSchedules);
      paymentForm?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const params = makeListingCreateParams({
      ownerName,
      ownerPhone,
      buyOrRent,
      price,
      monthlyRentFee,
      contractAmount,
      contractAmountNegotiable,
      remainingAmount,
      remainingAmountDate,
      remainingAmountDateType,
      interims,
      debtSuccessionDeposit,
      debtSuccessionMiscs,
      jeonsaeLoan,
      moveInDate,
      dateType,
      rentArea,
      rentTermYear,
      rentTermMonth,
      rentTermNegotiable,
      specialTerms,
      collaterals,
      quickSale,
    });

    if (isOwner && user) {
      params.owner_name = user.name;
      params.owner_phone = user.phone;
    }

    const encoded = JSON.stringify(params);

    router.replace(Routes.ListingCreateChooseAgent, {
      searchParams: { listingID: router.query.listingID as string, params: encoded },
    });
  }, [
    router,
    user,
    isOwner,
    ownerName,
    ownerPhone,
    buyOrRent,
    price,
    monthlyRentFee,
    contractAmount,
    contractAmountNegotiable,
    remainingAmount,
    remainingAmountDate,
    remainingAmountDateType,
    interims,
    debtSuccessionDeposit,
    debtSuccessionMiscs,
    moveInDate,
    dateType,
    rentArea,
    rentTermYear,
    rentTermMonth,
    rentTermNegotiable,
    specialTerms,
    collaterals,
    quickSale,
    jeonsaeLoan,
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

  const handleChangeQuickSale = useCallback((value: boolean) => {
    setQuickSale(value);
  }, []);

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

  const handleChangeInterimDate = useCallback(
    (key: string) => (value: string) => {
      setInterims((prev) => {
        const updated = [...prev];
        const interim = prev.find((item) => item.key === key);
        if (interim) {
          interim.date = value;
        }
        return updated;
      });
    },
    [],
  );

  const handleChangeInterimDateType = useCallback(
    (key: string) => (value: string) => {
      setInterims((prev) => {
        const updated = [...prev];
        const interim = prev.find((item) => item.key === key);
        if (interim) {
          interim.dateType = value;
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
    newInterims.push({ price: '', date: '', dateType: '이전', negotiable: true, key });
    newInterims[newInterims.length - 1].onRemove = handleRemoveInterim(key);
    newInterims[newInterims.length - 1].onChangePrice = handleChangeInterimPrice(key);
    newInterims[newInterims.length - 1].onChangeDate = handleChangeInterimDate(key);
    newInterims[newInterims.length - 1].onChangeDateType = handleChangeInterimDateType(key);
    newInterims[newInterims.length - 1].onChangeNegotiable = handleChangeInterimNegotiable(key);
    setInterims(newInterims);
  }, [
    interims,
    handleRemoveInterim,
    handleChangeInterimPrice,
    handleChangeInterimNegotiable,
    handleChangeInterimDate,
    handleChangeInterimDateType,
  ]);

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

  const handleChangeDateType = useCallback((value: string) => {
    setDateType(value);
  }, []);

  const handleChangeRemainingAmountDate = useCallback((value: string) => {
    setRemainingAmountDate(value);
  }, []);

  const handleChangeRemainingAmountDateType = useCallback((value: string) => {
    setRemainingAmountDateType(value);
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

  const handleChangeJeonsaeLoan = useCallback((value: boolean) => {
    setJeonsaeLoan(value);
  }, []);

  // 잔금 계산
  useEffect(() => {
    const p = convertPriceInputToNumber(price);
    const deposit = convertPriceInputToNumber(debtSuccessionDeposit);
    const miscTotal = _.sum(debtSuccessionMiscs?.map((item) => convertPriceInputToNumber(item.price))) ?? 0;
    const actualTotal = p - deposit - miscTotal;

    const c = convertPriceInputToNumber(contractAmount);
    const interimsTotal = _.sum(interims?.map((item) => convertPriceInputToNumber(item.price))) ?? 0;
    const r = actualTotal - c - interimsTotal;
    setRemainingAmount(`${r / 10000}`);
  }, [price, contractAmount, debtSuccessionDeposit, debtSuccessionMiscs, interims]);

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

  const closeErrPopup = useCallback(() => {
    setErrPopup('');
  }, []);

  const handleConfirmChangeBuyOrRent = useCallback(() => {
    setPopup('none');
    resetForms(Forms.BuyOrRent);
  }, [resetForms]);

  // 수정하기로 왔을때, parmas 에서 값을 꺼내와서 초기값으로 설정한다.
  useIsomorphicLayoutEffect(() => {
    const params = router.query.params;
    if (typeof params !== 'string') return;
    const parsed = JSON.parse(params);
    console.log(parsed);

    const convertDateType = (value: number) => {
      if (value === 1) return '이전';
      if (value === 2) return '이후';
      return '이전';
    };

    if (parsed.owner_name && parsed.owner_phone) {
      setIsOwner(false);
      setOwnerName(parsed.owner_name);
      setOwnerPhone(parsed.owner_phone);
    }

    if (parsed.buy_or_rent === BuyOrRent.Buy) {
      setForms([
        Forms.IsOwner,
        Forms.BuyOrRent,
        Forms.Price,
        Forms.DebtSuccessions,
        Forms.MoveInDate,
        Forms.PaymentSchedules,
        Forms.SpecialTerms,
        Forms.Optionals,
      ]);
    } else {
      setForms([
        Forms.IsOwner,
        Forms.BuyOrRent,
        Forms.Price,
        Forms.RentArea,
        Forms.RentTerm,
        Forms.MoveInDate,
        Forms.PaymentSchedules,
        Forms.Collaterals,
        Forms.JeonsaeLoan,
        Forms.SpecialTerms,
        Forms.Optionals,
      ]);
    }

    if (parsed.buy_or_rent) {
      setBuyOrRent(parsed.buy_or_rent);
    }

    if (parsed.trade_price) {
      setPrice(convertNumberToPriceInput(parsed.trade_price));
    }

    if (parsed.deposit) {
      setPrice(convertNumberToPriceInput(parsed.deposit));
    }

    if (parsed.monthly_rent_fee) {
      setMonthlyRentFee(convertNumberToPriceInput(parsed.monthly_rent_fee));
    }

    if (parsed.rent_area) {
      setRentArea(parsed.rent_area);
    }

    if (parsed.rent_contract_term_year) {
      setRentTermYear(`${parsed.rent_contract_term_year}년`);
    }

    if (parsed.rent_contract_term_month) {
      setRentTermYear(`${parsed.rent_contract_term_month}개월`);
    }

    if (parsed.rent_contract_term_negotiable !== undefined) {
      setRentTermNegotiable(parsed.rent_contract_term_negotiable);
    }

    if (parsed.move_in_date) {
      setMoveInDate(parsed.move_in_date);
    }

    if (parsed.contract_amount) {
      setContractAmount(convertNumberToPriceInput(parsed.contract_amount));
    }

    if (parsed.contract_amount_negotiable !== undefined) {
      setContractAmountNegotiable(parsed.contract_amount_negotiable);
    }

    if (parsed.remaining_amount_payment_time) {
      setRemainingAmountDate(parsed.remaining_amount_payment_time);
    }

    if (parsed.remaining_amount_payment_time_type) {
      setRemainingAmountDateType(convertDateType(parsed.remaining_amount_payment_time_type));
    }

    if (parsed.quick_sale !== undefined) {
      setQuickSale(parsed.quick_sale);
    }

    if (parsed.special_terms) {
      setSpecialTerms(parsed.special_terms);
    }

    if (parsed.jeonsae_loan !== undefined) {
      setJeonsaeLoan(parsed.jeonsae_loan);
    }

    const defaultInterims: InterimType[] = [];

    if (parsed.interim_amount1) {
      const k = uuidv4();
      defaultInterims.push({
        key: k,
        price: convertNumberToPriceInput(parsed.interim_amount1),
        negotiable: Boolean(parsed.interim_amount_negotiable1),
        date: parsed.interim_amount_payment_time1 ?? '',
        dateType: convertDateType(parsed.interim_amount_payment_time1_type),
        onChangePrice: handleChangeInterimPrice(k),
        onChangeNegotiable: handleChangeInterimNegotiable(k),
        onChangeDate: handleChangeInterimDate(k),
        onChangeDateType: handleChangeInterimDateType(k),
        onRemove: handleRemoveInterim(k),
      });
    }

    if (parsed.interim_amount2) {
      const k = uuidv4();
      defaultInterims.push({
        key: k,
        price: convertNumberToPriceInput(parsed.interim_amount2),
        negotiable: Boolean(parsed.interim_amount_negotiable2),
        date: parsed.interim_amount_payment_time2 ?? '',
        dateType: convertDateType(parsed.interim_amount_payment_time2_type),
        onChangePrice: handleChangeInterimPrice(k),
        onChangeNegotiable: handleChangeInterimNegotiable(k),
        onChangeDate: handleChangeInterimDate(k),
        onChangeDateType: handleChangeInterimDateType(k),
        onRemove: handleRemoveInterim(k),
      });
    }

    if (parsed.interim_amount3) {
      const k = uuidv4();
      defaultInterims.push({
        key: k,
        price: convertNumberToPriceInput(parsed.interim_amount3),
        negotiable: Boolean(parsed.interim_amount_negotiable3),
        date: parsed.interim_amount_payment_time3 ?? '',
        dateType: convertDateType(parsed.interim_amount_payment_time3_type),
        onChangePrice: handleChangeInterimPrice(k),
        onChangeNegotiable: handleChangeInterimNegotiable(k),
        onChangeDate: handleChangeInterimDate(k),
        onChangeDateType: handleChangeInterimDateType(k),
        onRemove: handleRemoveInterim(k),
      });
    }

    setInterims(defaultInterims);
  }, [router.query.params]);

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
      dateType,

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
      handleChangeDateType,

      remainingAmountDate,
      remainingAmountDateType,
      handleChangeRemainingAmountDate,
      handleChangeRemainingAmountDateType,

      rentArea,
      handleChangeRentArea,

      rentTermMonth,
      rentTermYear,
      rentTermNegotiable,
      handleChangeRentTermMonth,
      handleChangeRentTermYear,
      handleChangeRentTermNegotiable,

      quickSale,
      handleChangeQuickSale,

      jeonsaeLoan,
      handleChangeJeonsaeLoan,

      // Popup actions
      popup,
      errPopup,
      closePopup,
      closeErrPopup,
      handleConfirmChangeBuyOrRent,
    }),
    [
      addressLine1,
      addressLine2,

      popup,
      errPopup,
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
      dateType,

      handleChangeIsOwner,
      handleChangeOwnerName,
      handleChangeOwnerPhone,
      handleChangeBuyOrRent,
      handleClickNext,
      closePopup,
      closeErrPopup,
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
      handleChangeDateType,

      remainingAmountDate,
      remainingAmountDateType,
      handleChangeRemainingAmountDate,
      handleChangeRemainingAmountDateType,

      rentArea,
      handleChangeRentArea,

      rentTermMonth,
      rentTermYear,
      rentTermNegotiable,
      handleChangeRentTermMonth,
      handleChangeRentTermYear,
      handleChangeRentTermNegotiable,

      quickSale,
      handleChangeQuickSale,

      jeonsaeLoan,
      handleChangeJeonsaeLoan,
    ],
  );
}
