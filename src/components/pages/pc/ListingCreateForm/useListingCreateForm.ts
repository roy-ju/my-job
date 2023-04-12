import { CollateralType, DebtSuccessionType, InterimType } from '@/components/templates/ListingCreateForm/FormContext';
import { Forms } from '@/components/templates/ListingCreateForm/FormRenderer';
import { BuyOrRent } from '@/constants/enums';
import { useAuth } from '@/hooks/services';
import { useIsomorphicLayoutEffect, useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import convertNumberToPriceInput from '@/utils/convertNumberToPriceInput';
import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
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
  const [remainingAmountDate, setRemainingAmountDate] = useState<Date | null>(null);
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
  const [moveInDate, setMoveInDate] = useState<Date | null>(null);
  const [moveInDateType, setMoveInDateType] = useState('이전');
  // 임대할 부분
  const [rentArea, setRentArea] = useState('');
  // 임대기간 년
  const [rentTermYear, setRentTermYear] = useState('2년');
  // 임대기간 월
  const [rentTermMonth, setRentTermMonth] = useState('0개월');
  // 임대기간 네고가능
  const [rentTermNegotiable, setRentTermNegotiable] = useState(true);
  // 전세자금대출
  const [jeonsaeLoan, setJeonsaeLoan] = useState(true);
  // 급매
  const [quickSale, setQuickSale] = useState(false);
  // 고정관리비
  const [adminFee, setAdminFee] = useState('');
  // 매물설명
  const [description, setDescription] = useState('');
  // 임대차계약 종료일
  const [rentEndDate, setRentEndDate] = useState<Date | null>(null);
  // 매물사진
  const [listingPhotoUrls, setListingPhotoUrls] = useState<string[]>([]);
  // 단지사진
  const [danjiPhotoUrls, setDanjiPhotoUrls] = useState<string[]>([]);
  // 화면에 표현할 주소1
  const addressLine1 = router.query.addressLine1 as string;
  // 화면에 표현할 주소2
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
      setErrPopup('소유자 성명과 휴대폰 번호를 입력해주세요.');
      return;
    }
    setNextForm(Forms.BuyOrRent);
  }, [isOwner, ownerPhone, ownerName, setNextForm]);

  // 거래유형 submit
  const handleSubmitBuyOrRent = useCallback(() => {
    if (buyOrRent === 0) {
      setErrPopup('거래종류를 선택해주세요.');
      return;
    }

    setNextForm(Forms.Price);
  }, [buyOrRent, setNextForm]);

  // 가격 submit
  const handleSubmitPrice = useCallback(() => {
    if (price === '') {
      if (buyOrRent === BuyOrRent.Buy) setErrPopup('희망가를 입력해주세요.');
      if (buyOrRent === BuyOrRent.Jeonsae) setErrPopup('전세금을 입력해주세요.');
      if (buyOrRent === BuyOrRent.Wolsae) setErrPopup('보증금을 입력해주세요.');
      return;
    }

    if (buyOrRent === BuyOrRent.Wolsae && monthlyRentFee === '') {
      setErrPopup('월세를 입력해주세요');
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
    console.log(debtSuccessionDeposit);

    if (debtSuccessionDeposit) {
      setNextForm(Forms.RentEndDate);
    } else {
      setNextForm(Forms.MoveInDate);
    }
  }, [debtSuccessionDeposit, setNextForm]);

  // 임대할 부분 submit
  const handleSubmitRentArea = useCallback(() => {
    setNextForm(Forms.RentTerm);
  }, [setNextForm]);

  // 입주가능시기 submit
  const handleSubmitMoveInDate = useCallback(() => {
    setNextForm(Forms.PaymentSchedules);
  }, [setNextForm]);

  // 임대차계약종료일 submit
  const handleSubmitRentEndDate = useCallback(() => {
    if (!rentEndDate) {
      setErrPopup('임대차 계약 종료일을 입력해주세요.');
      return;
    }

    setNextForm(Forms.PaymentSchedules);
  }, [rentEndDate, setNextForm]);

  // 임대기간 submit
  const handleSubmitRentTerm = useCallback(() => {
    setNextForm(Forms.MoveInDate);
  }, [setNextForm]);

  // 희망지급일정 submit
  const handleSubmitPaymentSchedules = useCallback(() => {
    if (contractAmount === '') {
      setErrPopup('계약금을 입력해주세요');
      return;
    }
    if (remainingAmount === '' || Number(remainingAmount) < 0) {
      setErrPopup('입력하신 금액은 실제 지급 총액을 넘을 수 없습니다.');
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
      setErrPopup('소유자 성명과 휴대폰 번호를 입력해주세요.');
      const isOwnerForm = document.getElementById(Forms.IsOwner);
      isOwnerForm?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (buyOrRent === 0) {
      setErrPopup('거래종류를 선택해주세요.');
      const buyOrRentForm = document.getElementById(Forms.BuyOrRent);
      buyOrRentForm?.scrollIntoView({ behavior: 'smooth' });
    }

    if (price === '') {
      if (buyOrRent === BuyOrRent.Buy) setErrPopup('희망가를 입력해주세요.');
      if (buyOrRent === BuyOrRent.Jeonsae) setErrPopup('전세금을 입력해주세요.');
      if (buyOrRent === BuyOrRent.Wolsae) setErrPopup('보증금을 입력해주세요.');
      const priceForm = document.getElementById(Forms.Price);
      priceForm?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (buyOrRent === BuyOrRent.Wolsae && monthlyRentFee === '') {
      setErrPopup('월세를 입력해주세요');
      const priceForm = document.getElementById(Forms.Price);
      priceForm?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (contractAmount === '') {
      setErrPopup('계약금을 입력해주세요');
      const paymentForm = document.getElementById(Forms.PaymentSchedules);
      paymentForm?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (remainingAmount === '' || Number(remainingAmount) < 0) {
      setErrPopup('입력하신 금액은 실제 지급 총액을 넘을 수 없습니다.');
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
      moveInDateType,
      rentArea,
      rentTermYear,
      rentTermMonth,
      rentTermNegotiable,
      specialTerms,
      collaterals,
      quickSale,
      adminFee,
      description,
      rentEndDate,
      listingPhotoUrls,
      danjiPhotoUrls,
    });

    if (isOwner && user) {
      params.owner_name = user.name;
      params.owner_phone = user.phone;
    }

    const encoded = JSON.stringify(params);

    router.replace(Routes.ListingCreateChooseAgent, {
      searchParams: { listingID: router.query.listingID as string },
      state: { params: encoded, addressLine1, addressLine2 },
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
    moveInDateType,
    rentArea,
    rentTermYear,
    rentTermMonth,
    rentTermNegotiable,
    specialTerms,
    collaterals,
    quickSale,
    jeonsaeLoan,
    adminFee,
    description,
    rentEndDate,
    listingPhotoUrls,
    danjiPhotoUrls,
    addressLine1,
    addressLine2,
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
      case Forms.RentEndDate:
        handleSubmitRentEndDate();
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
    handleSubmitRentEndDate,
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
    (key: string) => (value: Date | null) => {
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
    newInterims.push({ price: '', date: null, dateType: '이전', negotiable: true, key });
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

  const handleChangeAdminFee = useCallback((value: string) => {
    setAdminFee(value);
  }, []);

  const handleChangeDescription = useCallback((value: string) => {
    setDescription(value);
  }, []);

  const handleChangeRentEndDate = useCallback((value: Date | null) => {
    setRentEndDate(value);
  }, []);

  const handleChangeListingPhotoUrls = useCallback((values: string[]) => {
    if (values.length > 6) {
      toast.error('6개까지 추가 가능합니다.');
      return;
    }

    setListingPhotoUrls(values);
  }, []);

  const handleChangeDanjiPhotoUrls = useCallback((values: string[]) => {
    if (values.length > 6) {
      toast.error('6개까지 추가 가능합니다.');
      return;
    }

    setDanjiPhotoUrls(values);
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

  useIsomorphicLayoutEffect(() => {
    if (!router.query.listingID) router.pop();
    if (!router.query.addressLine1) router.pop();
  }, [router]);

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
        parsed.debt_successions ? Forms.RentEndDate : Forms.MoveInDate,
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
      setMoveInDate(new Date(parsed.move_in_date));
    }

    if (parsed.contract_amount) {
      setContractAmount(convertNumberToPriceInput(parsed.contract_amount));
    }

    if (parsed.contract_amount_negotiable !== undefined) {
      setContractAmountNegotiable(parsed.contract_amount_negotiable);
    }

    if (parsed.remaining_amount_payment_time) {
      setRemainingAmountDate(new Date(parsed.remaining_amount_payment_time));
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

    if (parsed.administrative_fee) {
      setAdminFee(convertNumberToPriceInput(parsed.administrative_fee));
    }

    const defaultInterims: InterimType[] = [];
    const defaultDebtSuccessions: DebtSuccessionType[] = [];
    const defaultCollaterals: CollateralType[] = [];

    if (parsed.interim_amount1) {
      const k = uuidv4();
      defaultInterims.push({
        key: k,
        price: convertNumberToPriceInput(parsed.interim_amount1),
        negotiable: Boolean(parsed.interim_amount_negotiable1),
        date: parsed.interim_amount_payment_time1 ? new Date(parsed.interim_amount_payment_time1) : null,
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
        date: parsed.interim_amount_payment_time2 ? new Date(parsed.interim_amount_payment_time2) : null,
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
        date: parsed.interim_amount_payment_time3 ? new Date(parsed.interim_amount_payment_time3) : null,
        dateType: convertDateType(parsed.interim_amount_payment_time3_type),
        onChangePrice: handleChangeInterimPrice(k),
        onChangeNegotiable: handleChangeInterimNegotiable(k),
        onChangeDate: handleChangeInterimDate(k),
        onChangeDateType: handleChangeInterimDateType(k),
        onRemove: handleRemoveInterim(k),
      });
    }

    if (parsed.debt_successions) {
      if (parsed.debt_successions[0].name === '보증금') {
        setDebtSuccessionDeposit(convertNumberToPriceInput(parsed.debt_successions[0].amount));
      }
      parsed.debt_successions.slice(1).forEach((item: { amount: number; name: string }) => {
        const k = uuidv4();
        defaultDebtSuccessions.push({
          key: k,
          name: item.name,
          price: convertNumberToPriceInput(item.amount),
          onChangeName: handleChangeDebtSuccessionMiscName(k),
          onChangePrice: handleChangeDebtSuccessionMiscPrice(k),
          onRemove: handleRemoveDebtSuccessionMisc(k),
        });
      });
    }

    if (parsed.collaterals) {
      parsed.collaterals.forEach((item: { amount: number; name: string }) => {
        const k = uuidv4();
        defaultCollaterals.push({
          key: k,
          name: item.name,
          price: convertNumberToPriceInput(item.amount),
          onChangeName: handleChangeCollateralName(k),
          onChangePrice: handleChangeCollateralPrice(k),
          onRemove: handleRemoveCollateral(k),
        });
      });
    }

    if (parsed.rent_end_date) {
      setRentEndDate(new Date(parsed.rent_end_date));
    }

    if (parsed.description) {
      setDescription(parsed.description);
    }

    if (parsed.listingPhotoUrls) {
      setListingPhotoUrls(parsed.listingPhotoUrls);
    }

    if (parsed.danjiPhotoUrls) {
      setDanjiPhotoUrls(parsed.danjiPhotoUrls);
    }

    setInterims(defaultInterims);
    setDebtSuccessionMiscs(defaultDebtSuccessions);
    setCollaterals(defaultCollaterals);
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
      moveInDateType,

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
      handleChangeMoveInDateType,

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

      adminFee,
      handleChangeAdminFee,

      listingPhotoUrls,
      handleChangeListingPhotoUrls,

      danjiPhotoUrls,
      handleChangeDanjiPhotoUrls,

      description,
      handleChangeDescription,

      rentEndDate,
      handleChangeRentEndDate,

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
      moveInDateType,

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
      handleChangeMoveInDateType,

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

      adminFee,
      handleChangeAdminFee,

      listingPhotoUrls,
      handleChangeListingPhotoUrls,

      danjiPhotoUrls,
      handleChangeDanjiPhotoUrls,

      description,
      handleChangeDescription,

      rentEndDate,
      handleChangeRentEndDate,
    ],
  );
}
