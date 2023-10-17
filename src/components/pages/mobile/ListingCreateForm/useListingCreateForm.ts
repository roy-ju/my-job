import { CollateralType, DebtSuccessionType } from '@/components/templates/ListingCreateForm/FormContext';
import { Forms } from '@/components/templates/ListingCreateForm/FormRenderer';
import { BuyOrRent } from '@/constants/enums';
import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import Routes from '@/router/routes';
import convertNumberToPriceInput from '@/utils/convertNumberToPriceInput';
// import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';
import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import makeListingCreateParams from './makeListingCreateParams';

type PopupType = 'none' | 'buyOrRentChagne' | 'back';

export default function useListingCreateForm() {
  const router = useRouter();

  // const [isAddInterimButtonDisabled, setIsAddInterimButtonDisabled] = useState(false);
  const [isAddCollateralDisabled, setIsAddCollateralDisabled] = useState(false);
  const [isAddDebtSuccessionDisabled, setIsAddDebtSuccessionDisabled] = useState(false);

  const autoScrollEnabled = useRef(true);

  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

  // 화면에 띄워진 팝업
  const [popup, setPopup] = useState<PopupType>('none');

  // 벨리데이션 에러 팝업
  const [errPopup, setErrPopup] = useState('');

  // 현재 화면에 그려진 입력필드들
  const [forms, setForms] = useState<string[]>([Forms.BuyOrRent]);

  // 거래 유형 매매/전세/월세
  const [buyOrRent, setBuyOrRent] = useState(0);

  // 거래 유형 매매/전세/월세
  const [changingBuyOrRent, setChangingBuyOrRent] = useState<number>();

  // 가격 매매가/전세가
  const [price, setPrice] = useState('');

  // 월세
  const [monthlyRentFee, setMonthlyRentFee] = useState('');

  // 계약금
  // const [contractAmount, setContractAmount] = useState('');

  // 계약금 협의 가능
  // const [contractAmountNegotiable, setContractAmountNegotiable] = useState(true);

  // 잔금
  // const [remainingAmount, setRemainingAmount] = useState('');

  // 중도금
  // const [interims, setInterims] = useState<InterimType[]>([]);

  // 채무승계 보증금
  const [debtSuccessionDeposit, setDebtSuccessionDeposit] = useState('');

  // 채무승계 기타
  const [debtSuccessionMiscs, setDebtSuccessionMiscs] = useState<DebtSuccessionType[]>([]);

  // 선순위 담보권
  const [collaterals, setCollaterals] = useState<CollateralType[]>([]);

  // 특약사항
  const [specialTerms, setSpecialTerms] = useState('');

  // 특약사항
  const [hasSpecialTerms, setHasSpecialTerms] = useState('0');

  // 입주가능시기
  const [moveInDate, setMoveInDate] = useState<Date | null>(null);

  // 입주가능시기
  const [moveInDateType, setMoveInDateType] = useState('이후');

  // 입주가능시기
  const [hasMoveInDate, setHasMoveInDate] = useState('0'); // '0' 없음 , '1' 있음

  // 임대할 부분
  const [rentArea, setRentArea] = useState('');

  // 임대할 부분
  const [hasRentArea, setHasRentArea] = useState('0');

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

  // 베란다 확장
  const [verandaExtended, setVerandaExtended] = useState(false);

  // 2년 내 올수리
  const [verandaRemodelling, setVerandaRemodelling] = useState(false);

  // 추가 옵션
  const [extraOptions, setExtraOptions] = useState<number[]>([]);

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

  // 채무승계 여부
  const [hasDebtSuccession, setHasDebtSuccession] = useState('0');

  const setNextForm = useCallback((...formNames: string[]) => {
    setForms((prev) => [...prev, ...formNames]);
  }, []);

  const resetBuyOrRent = useCallback(() => {
    setBuyOrRent(0);
  }, []);

  const resetPrice = useCallback(() => {
    setPrice('');
    setMonthlyRentFee('');
    setQuickSale(false);
  }, []);

  // const resetPaymentSchedules = useCallback(() => {
  //   setContractAmount('');
  //   setContractAmountNegotiable(true);
  //   setInterims([]);
  //   setRemainingAmount('');
  // }, []);

  const resetDebtSuccessions = useCallback(() => {
    setHasDebtSuccession('0');
    setDebtSuccessionDeposit('');
    setDebtSuccessionMiscs([]);
    setRentEndDate(null);
  }, []);

  const resetMoveInDate = useCallback(() => {
    setHasMoveInDate('0');
    setMoveInDate(null);
    setMoveInDateType('이후');
  }, []);

  const resetCollaterals = useCallback(() => {
    setCollaterals([]);
  }, []);

  const resetSpecialTerms = useCallback(() => {
    setHasSpecialTerms('0');
    setSpecialTerms('');
  }, []);

  const resetListingOptions = useCallback(() => {
    setVerandaExtended(false);
    setVerandaRemodelling(false);
  }, []);

  const resetExtraOptions = useCallback(() => {
    setExtraOptions([]);
  }, []);

  const resetDescription = useCallback(() => {
    setDescription('');
  }, []);

  const resetRentArea = useCallback(() => {
    setHasRentArea('0');
    setRentArea('');
  }, []);

  const resetRentTerm = useCallback(() => {
    setRentTermYear('2년');
    setRentTermMonth('0개월');
    setRentTermNegotiable(true);
  }, []);

  const resetJeonsaeLoan = useCallback(() => {
    setJeonsaeLoan(false);
    setRentTermMonth('0개월');
    setRentTermNegotiable(true);
  }, []);

  // formName 이후에 있는 팝업들을 다 지운다.
  const resetForms = useCallback(
    (formName: string) => {
      const index = forms.findIndex((form) => form === formName);

      forms.slice(index, forms.length).forEach((form) => {
        if (form === Forms.BuyOrRent) {
          if (changingBuyOrRent) {
            setBuyOrRent(changingBuyOrRent);
          } else {
            resetBuyOrRent();
          }
        }

        if (form === Forms.Price) {
          resetPrice();
        }

        if (form === Forms.DebtSuccessions) {
          resetDebtSuccessions();
          resetMoveInDate();
        }

        // if (form === Forms.PaymentSchedules) {
        //   resetPaymentSchedules();
        // }

        if (form === Forms.Collaterals) {
          resetCollaterals();
        }

        if (form === Forms.SpecialTerms) {
          resetSpecialTerms();
        }

        if (form === Forms.MoveInDate) {
          resetMoveInDate();
        }

        if (form === Forms.RentArea) {
          resetRentArea();
        }

        if (form === Forms.RentTerm) {
          resetRentTerm();
        }

        if (form === Forms.JeonsaeLoan) {
          resetJeonsaeLoan();
        }

        if (form === Forms.Optionals) {
          resetListingOptions();
          resetExtraOptions();
          resetDescription();
        }

        if (listingPhotoUrls) {
          setListingPhotoUrls([]);
        }
        if (danjiPhotoUrls) {
          setDanjiPhotoUrls([]);
        }
      });

      const newForms = [...forms];
      newForms.splice(index + 1, newForms.length - index);
      setForms(newForms);
    },
    [
      forms,
      listingPhotoUrls,
      danjiPhotoUrls,
      changingBuyOrRent,
      resetBuyOrRent,
      resetPrice,
      resetDebtSuccessions,
      resetMoveInDate,
      resetCollaterals,
      resetSpecialTerms,
      resetRentArea,
      resetRentTerm,
      resetJeonsaeLoan,
      resetListingOptions,
      resetExtraOptions,
      resetDescription,
    ],
  );

  // 아래 Callback들은 Input Validations 과 다음에는 어떤 필드가 올지 결정하는 핸들러들

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
      setErrPopup('월차임을 입력해주세요');
      return;
    }

    // if (contractAmount === '') {
    //   setContractAmount(`${Math.floor(Number(price) * 0.1)}`);
    // }

    if (buyOrRent === BuyOrRent.Buy) {
      setNextForm(Forms.DebtSuccessions);
    } else {
      setNextForm(Forms.RentArea);
    }
  }, [buyOrRent, price, monthlyRentFee, setNextForm]);

  // 채무승계 submit
  const handleSubmitDebtSuccessions = useCallback(() => {
    // setNextForm(Forms.PaymentSchedules);
    setNextForm(Forms.SpecialTerms);
  }, [setNextForm]);

  // 임대할 부분 submit
  const handleSubmitRentArea = useCallback(() => {
    setNextForm(Forms.RentTerm);
  }, [setNextForm]);

  // 입주가능시기 submit
  const handleSubmitMoveInDate = useCallback(() => {
    // setNextForm(Forms.PaymentSchedules);
    setNextForm(Forms.Collaterals);
  }, [setNextForm]);

  // 임대차계약종료일 submit
  const handleSubmitRentEndDate = useCallback(() => {
    if (!rentEndDate) {
      setErrPopup('임대차 계약 종료일을 입력해주세요.');
      return;
    }

    // setNextForm(Forms.PaymentSchedules);
    setNextForm(Forms.SpecialTerms);
  }, [rentEndDate, setNextForm]);

  // 임대기간 submit
  const handleSubmitRentTerm = useCallback(() => {
    setNextForm(Forms.MoveInDate);
  }, [setNextForm]);

  // 희망지급일정 submit
  // const handleSubmitPaymentSchedules = useCallback(() => {
  //   if (contractAmount === '') {
  //     setErrPopup('계약금을 입력해주세요');
  //     return;
  //   }
  //   if (remainingAmount === '' || Number(remainingAmount) < 0) {
  //     setErrPopup('입력하신 금액은 실제 지급 총액을 넘을 수 없습니다.');
  //     return;
  //   }

  //   if (buyOrRent === BuyOrRent.Buy) {
  //     setNextForm(Forms.SpecialTerms);
  //   } else {
  //     setNextForm(Forms.Collaterals);
  //   }
  // }, [contractAmount, remainingAmount, buyOrRent, setNextForm]);

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

    if (buyOrRent === 0) {
      setErrPopup('거래종류를 선택해주세요.');

      const buyOrRentForm = document.getElementById(Forms.BuyOrRent);

      buyOrRentForm?.scrollIntoView({ behavior: 'smooth' });
    }

    if (price === '') {
      if (buyOrRent === BuyOrRent.Buy) setErrPopup('매매가를 입력해주세요.');

      if (buyOrRent === BuyOrRent.Jeonsae) setErrPopup('전세금을 입력해주세요.');

      if (buyOrRent === BuyOrRent.Wolsae) setErrPopup('보증금을 입력해주세요.');

      const priceForm = document.getElementById(Forms.Price);

      priceForm?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (buyOrRent === BuyOrRent.Wolsae && monthlyRentFee === '') {
      setErrPopup('월차임을 입력해주세요');

      const priceForm = document.getElementById(Forms.Price);
      priceForm?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // if (contractAmount === '') {
    //   setErrPopup('계약금을 입력해주세요');

    //   const paymentForm = document.getElementById(Forms.PaymentSchedules);

    //   paymentForm?.scrollIntoView({ behavior: 'smooth' });
    //   return;
    // }

    // if (remainingAmount === '' || Number(remainingAmount) < 0) {
    //   setErrPopup('입력하신 금액은 실제 지급 총액을 넘을 수 없습니다.');

    //   const paymentForm = document.getElementById(Forms.PaymentSchedules);

    //   paymentForm?.scrollIntoView({ behavior: 'smooth' });
    //   return;
    // }

    // if (interims.length > 0) {
    //   const falsies = interims.map((item) => item.price).filter((value) => value === '');
    //   if (falsies.length > 0) {
    //     setErrPopup('중도금을 입력해 주세요.');

    //     autoScrollEnabled.current = false;

    //     const paymentForm = document.getElementById(Forms.PaymentSchedules);
    //     paymentForm?.scrollIntoView({ behavior: 'smooth' });

    //     return;
    //   }
    // }

    if (hasDebtSuccession === '1') {
      if (!debtSuccessionDeposit && !rentEndDate) {
        setErrPopup('채무승계 금액을 입력해주세요.');

        setHasMoveInDate('0');
        setMoveInDate(null);
        setMoveInDateType('이전');

        autoScrollEnabled.current = false;

        const debtSuccessionForm = document.getElementById(Forms.DebtSuccessions);
        debtSuccessionForm?.scrollIntoView({ behavior: 'smooth' });

        return;
      }
    }

    // 채무승계 보증금이 있는데, 기존 임대차 계약 종료일을 입력 안한경우
    if (debtSuccessionDeposit !== '' && !rentEndDate) {
      setErrPopup('기존 임대차 계약 종료일을 입력해주세요.');

      // 자, 이제 이 경우에는 기존 임대차 계약 종료일 을 입력 받아야된다.
      // 아마 입력했을지도 모르는 입주가능시기 필드들을 초기화 해주고,
      setHasMoveInDate('0');
      setMoveInDate(null);
      setMoveInDateType('이전');

      autoScrollEnabled.current = false;

      const debtSuccessionForm = document.getElementById(Forms.DebtSuccessions);
      debtSuccessionForm?.scrollIntoView({ behavior: 'smooth' });

      return;
    }

    // 채무승계보증금이 없는데, 기존 임대차 계약 종료일 값이 있는 경우
    if (debtSuccessionDeposit === '' && rentEndDate) {
      setErrPopup('채무승계 금액을 입력해주세요.');

      autoScrollEnabled.current = false;

      const debtSuccessionForm = document.getElementById(Forms.DebtSuccessions);
      debtSuccessionForm?.scrollIntoView({ behavior: 'smooth' });

      return;
    }

    if (debtSuccessionMiscs.length > 0) {
      const falsies = debtSuccessionMiscs
        .map((item) => ({ name: item.name, price: item.price }))
        .filter((value) => value.name === '' || value.price === '');

      if (falsies.length > 0) {
        setErrPopup('기타 채무를 입력해주세요.');

        autoScrollEnabled.current = false;

        const debtSuccessionForm = document.getElementById(Forms.DebtSuccessions);
        debtSuccessionForm?.scrollIntoView({ behavior: 'smooth' });

        return;
      }
    }

    if (buyOrRent !== BuyOrRent.Buy && hasMoveInDate === '1' && !moveInDate) {
      setErrPopup('입주가능 시기를 선택해 주세요.');

      autoScrollEnabled.current = false;

      const moveInDateForm = document.getElementById(Forms.MoveInDate);
      moveInDateForm?.scrollIntoView({ behavior: 'smooth' });

      return;
    }

    if (hasRentArea === '1' && !rentArea) {
      setErrPopup('임대할 부분을 입력해주세요.');

      autoScrollEnabled.current = false;

      const rentAreaForm = document.getElementById(Forms.RentArea);
      rentAreaForm?.scrollIntoView({ behavior: 'smooth' });

      return;
    }

    if (collaterals.length > 0) {
      const falsies = collaterals
        .map((item) => ({ name: item.name, price: item.price }))
        .filter((value) => value.name === '' || value.price === '');

      if (falsies.length > 0) {
        setErrPopup('선순위 담보권을 입력해 주세요.');

        autoScrollEnabled.current = false;

        const CollateralsForm = document.getElementById(Forms.Collaterals);
        CollateralsForm?.scrollIntoView({ behavior: 'smooth' });

        return;
      }
    }

    if (hasSpecialTerms === '1' && !specialTerms) {
      setErrPopup('특약조건을 입력해 주세요.');

      autoScrollEnabled.current = false;

      const specialTermsForm = document.getElementById(Forms.SpecialTerms);
      specialTermsForm?.scrollIntoView({ behavior: 'smooth' });

      return;
    }

    const params = makeListingCreateParams({
      buyOrRent,
      price,
      monthlyRentFee,
      // contractAmount,
      // contractAmountNegotiable,
      // remainingAmount,
      // interims,
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
      verandaExtended,
      verandaRemodelling,
      extraOptions,
    });

    const encoded = JSON.stringify(params);

    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.ListingCreateChooseAgent}`,
      query: {
        ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
        ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
        params: encoded,
        userAddressID: router?.query?.userAddressID as string,
      },
    });
  }, [
    buyOrRent,
    price,
    monthlyRentFee,
    hasDebtSuccession,
    debtSuccessionDeposit,
    rentEndDate,
    debtSuccessionMiscs,
    hasMoveInDate,
    moveInDate,
    hasRentArea,
    rentArea,
    collaterals,
    hasSpecialTerms,
    specialTerms,
    jeonsaeLoan,
    moveInDateType,
    rentTermYear,
    rentTermMonth,
    rentTermNegotiable,
    quickSale,
    adminFee,
    description,
    listingPhotoUrls,
    danjiPhotoUrls,
    verandaExtended,
    verandaRemodelling,
    extraOptions,
    router,
  ]);

  const openBackPopup = useCallback(() => {
    setPopup('back');
  }, []);

  const handleClickBack = useCallback(() => {
    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.ListingSelectAddress}`,
      query: {
        ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
        ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
      },
    });
  }, [router]);

  const handleClickNext = useCallback(() => {
    const lastForm = forms[forms.length - 1];
    switch (lastForm) {
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
      // case Forms.PaymentSchedules:
      //   handleSubmitPaymentSchedules();
      //   break;
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
    handleSubmitBuyOrRent,
    handleSubmitPrice,
    // handleSubmitPaymentSchedules,
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

  const handleChangeBuyOrRent = useCallback(
    (value: number) => {
      if (buyOrRent === value) {
        return;
      }

      const currentForm = forms[forms.length - 1];

      if (currentForm !== Forms.BuyOrRent) {
        setPopup('buyOrRentChagne');
        setChangingBuyOrRent(value);
      } else {
        setBuyOrRent(value);
      }
    },
    [buyOrRent, forms],
  );

  const handleChangePrice = useCallback((value: string) => {
    setPrice(value);
  }, []);

  const handleChangeMonthlyRentFee = useCallback((value: string) => {
    setMonthlyRentFee(value);
  }, []);

  // const handleChangeContractAmount = useCallback((value: string) => {
  //   setContractAmount(value);
  // }, []);

  // const handleChangeContractAmountNegotiable = useCallback((value: boolean) => {
  //   setContractAmountNegotiable(value);
  // }, []);

  // const handleChangeRemainingAmount = useCallback((value: string) => {
  //   setRemainingAmount(value);
  // }, []);

  // const handleChangeInterimPrice = useCallback(
  //   (key: string) => (value: string) => {
  //     setInterims((prev) => {
  //       const updated = [...prev];
  //       const interim = prev.find((item) => item.key === key);
  //       if (interim) {
  //         interim.price = value;
  //       }
  //       return updated;
  //     });
  //   },
  //   [],
  // );

  // const handleChangeInterimNegotiable = useCallback(
  //   (key: string) => (value: boolean) => {
  //     setInterims((prev) => {
  //       const updated = [...prev];
  //       const interim = prev.find((item) => item.key === key);
  //       if (interim) {
  //         interim.negotiable = value;
  //       }
  //       return updated;
  //     });
  //   },
  //   [],
  // );

  // 중도금 삭제
  // const handleRemoveInterim = useCallback(
  //   (key: string) => () => {
  //     setInterims((prev) => prev.filter((interim) => interim.key !== key));
  //   },
  //   [],
  // );

  // 중도금 추가
  // const handleAddInterim = useCallback(() => {
  //   if (interims.length === 3) return;

  //   const newInterims = [...interims];
  //   const key = uuidv4();
  //   newInterims.push({ price: '', negotiable: true, key });
  //   newInterims[newInterims.length - 1].onRemove = handleRemoveInterim(key);
  //   newInterims[newInterims.length - 1].onChangePrice = handleChangeInterimPrice(key);
  //   newInterims[newInterims.length - 1].onChangeNegotiable = handleChangeInterimNegotiable(key);
  //   setInterims(newInterims);
  // }, [interims, handleRemoveInterim, handleChangeInterimPrice, handleChangeInterimNegotiable]);

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
    if (debtSuccessionMiscs.length > 1) {
      toast.error('최대 2개까지 추가 가능합니다.');
      return;
    }

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
    if (collaterals.length > 2) {
      toast.error('최대 3개까지 추가 가능합니다.');
      return;
    }

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
  const handleChangeVerandaExtended = useCallback((value: boolean) => {
    setVerandaExtended(value);
  }, []);

  const handleChangeVerandaRemodelling = useCallback((value: boolean) => {
    setVerandaRemodelling(value);
  }, []);

  const handleChangeExtraOptions = useCallback(
    (id: number) => {
      let newValue = [...extraOptions];
      if (extraOptions.includes(id)) {
        newValue = newValue.filter((item) => item !== id);
      } else {
        newValue.push(id);
      }
      setExtraOptions(newValue);
    },
    [extraOptions],
  );

  const handleChangeMoveInDate = useCallback((value: Date | null) => {
    setMoveInDate(value);
  }, []);

  const handleChangeMoveInDateType = useCallback((value: string) => {
    setMoveInDateType(value);
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
    // 임대차 계약 종료일이 존재한다면 입주가능시기를 임대차 계약종료일과 똑같은 날짜로 지정해준다.
    setRentEndDate(value);

    setHasMoveInDate('1');
    setMoveInDate(value);
    setMoveInDateType('이후');
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

  const handleChangeHasDebtSuccession = useCallback(
    (value: string) => {
      if (value === '0') {
        // 없음 선택시
        setDebtSuccessionDeposit('');
        setDebtSuccessionMiscs([]);
      }

      if (rentEndDate) {
        setRentEndDate(null);
      }

      if (hasMoveInDate) {
        setHasMoveInDate('0');
      }

      if (moveInDate) {
        setMoveInDate(null);
      }

      if (moveInDateType) {
        setMoveInDateType('이후');
      }

      setHasDebtSuccession(value);
    },
    [hasMoveInDate, moveInDate, moveInDateType, rentEndDate],
  );

  // 잔금 계산
  // useEffect(() => {
  //   const p = convertPriceInputToNumber(price);
  //   const deposit = convertPriceInputToNumber(debtSuccessionDeposit);
  //   const miscTotal = _.sum(debtSuccessionMiscs?.map((item) => convertPriceInputToNumber(item.price))) ?? 0;
  //   const actualTotal = p - deposit - miscTotal;

  //   const c = convertPriceInputToNumber(contractAmount);
  //   const interimsTotal = _.sum(interims?.map((item) => convertPriceInputToNumber(item.price))) ?? 0;
  //   const r = actualTotal - c - interimsTotal;
  //   setRemainingAmount(`${r / 10000}`);
  // }, [price, contractAmount, debtSuccessionDeposit, debtSuccessionMiscs, interims]);

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
        if (autoScrollEnabled.current) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        } else {
          autoScrollEnabled.current = true;
        }
      }
    }, 500);
  }, [forms]);

  // 버튼 비활성화 로직
  useEffect(() => {
    setNextButtonDisabled(false);

    const currentForm = forms[forms.length - 1];

    if (currentForm === Forms.BuyOrRent) {
      if (!buyOrRent) {
        setNextButtonDisabled(true);
      }
    }

    if (currentForm === Forms.Price) {
      if (!price) {
        setNextButtonDisabled(true);
      }

      if (buyOrRent === BuyOrRent.Wolsae && !monthlyRentFee) {
        setNextButtonDisabled(true);
      }
    }

    if (currentForm === Forms.DebtSuccessions) {
      if (hasDebtSuccession === '1') {
        const falsies = debtSuccessionMiscs
          .map((item) => ({ name: item.name, price: item.price }))
          .filter((value) => value.name === '' || value.price === '');

        const truies = debtSuccessionMiscs
          .map((item) => ({ name: item.name, price: item.price }))
          .filter((value) => value.name && value.price);

        if (debtSuccessionDeposit && rentEndDate && debtSuccessionMiscs.length === 0) {
          setNextButtonDisabled(false);
          return;
        }

        if (
          !debtSuccessionDeposit &&
          !rentEndDate &&
          truies.length > 0 &&
          truies.length === debtSuccessionMiscs.length
        ) {
          setNextButtonDisabled(false);
          return;
        }

        if (debtSuccessionDeposit && rentEndDate && truies.length > 0 && truies.length === debtSuccessionMiscs.length) {
          setNextButtonDisabled(false);
          return;
        }

        if (debtSuccessionDeposit && rentEndDate && falsies.length > 0) {
          setNextButtonDisabled(true);
          return;
        }

        if (debtSuccessionDeposit && !rentEndDate && (debtSuccessionMiscs.length === 0 || falsies.length > 0)) {
          setNextButtonDisabled(true);
          return;
        }

        if (debtSuccessionDeposit && !rentEndDate && truies.length > 0) {
          setNextButtonDisabled(true);
          return;
        }

        if (!debtSuccessionDeposit && rentEndDate && truies.length > 0) {
          setNextButtonDisabled(true);
          return;
        }

        if (!debtSuccessionDeposit && rentEndDate && (debtSuccessionMiscs.length === 0 || falsies.length > 0)) {
          setNextButtonDisabled(true);
          return;
        }

        if (!debtSuccessionDeposit && !rentEndDate && (debtSuccessionMiscs.length === 0 || falsies.length > 0)) {
          setNextButtonDisabled(true);
          return;
        }
      }

      if (hasMoveInDate === '1') {
        if (!moveInDate) {
          setNextButtonDisabled(true);
          return;
        }
      }
    }

    if (currentForm === Forms.RentArea) {
      if (hasRentArea === '1' && !rentArea) {
        setNextButtonDisabled(true);
      }
    }

    if (currentForm === Forms.MoveInDate) {
      if (hasMoveInDate === '1' && !moveInDate) {
        setNextButtonDisabled(true);
      }
    }

    if (currentForm === Forms.RentEndDate) {
      if (!rentEndDate) {
        setNextButtonDisabled(true);
      }
    }

    // if (currentForm === Forms.PaymentSchedules) {
    //   if (!contractAmount) {
    //     setNextButtonDisabled(true);
    //   }

    //   if (interims.length > 0) {
    //     const falsies = interims.map((item) => item.price).filter((value) => value === '');
    //     if (falsies.length > 0) setNextButtonDisabled(true);
    //   }
    // }

    if (currentForm === Forms.Collaterals) {
      if (collaterals.length > 0) {
        const falsies = collaterals
          .map((item) => ({ name: item.name, price: item.price }))
          .filter((value) => value.name === '' || value.price === '');

        if (falsies.length > 0) setNextButtonDisabled(true);
      }
    }

    if (currentForm === Forms.SpecialTerms) {
      if (hasSpecialTerms === '1' && !specialTerms) {
        setNextButtonDisabled(true);
      }
    }
  }, [
    forms,
    buyOrRent,
    price,
    monthlyRentFee,
    rentEndDate,
    hasSpecialTerms,
    specialTerms,
    hasMoveInDate,
    moveInDate,
    rentArea,
    hasRentArea,
    hasDebtSuccession,
    debtSuccessionMiscs,
    debtSuccessionDeposit,
    collaterals,
  ]);

  // 팝업 콜백들

  const closePopup = useCallback(() => {
    setChangingBuyOrRent(undefined);
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

    if (parsed.buy_or_rent === BuyOrRent.Buy) {
      setForms([
        Forms.BuyOrRent,
        Forms.Price,
        Forms.DebtSuccessions,
        // Forms.PaymentSchedules,
        Forms.SpecialTerms,
        Forms.Optionals,
      ]);
    } else {
      setForms([
        Forms.BuyOrRent,
        Forms.Price,
        Forms.RentArea,
        Forms.RentTerm,
        Forms.MoveInDate,
        // Forms.PaymentSchedules,
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

    // if (parsed.contract_amount) {
    //   setContractAmount(convertNumberToPriceInput(parsed.contract_amount));
    // }

    // if (parsed.contract_amount_negotiable !== undefined) {
    //   setContractAmountNegotiable(parsed.contract_amount_negotiable);
    // }

    if (parsed.quick_sale !== undefined) {
      setQuickSale(parsed.quick_sale);
    }

    if (parsed.special_terms) {
      setSpecialTerms(parsed.special_terms);
    }

    if (parsed.veranda_extended) {
      setVerandaExtended(parsed.veranda_extended);
    }

    if (parsed.veranda_remodelling) {
      setVerandaRemodelling(parsed.veranda_remodelling);
    }

    if (parsed.options) {
      setExtraOptions(parsed.options);
    }

    if (parsed.jeonsae_loan !== undefined) {
      setJeonsaeLoan(parsed.jeonsae_loan);
    }

    if (parsed.administrative_fee) {
      setAdminFee(convertNumberToPriceInput(parsed.administrative_fee));
    }

    // const defaultInterims: InterimType[] = [];
    const defaultDebtSuccessions: DebtSuccessionType[] = [];
    const defaultCollaterals: CollateralType[] = [];

    // if (parsed.interim_amount1) {
    //   const k = uuidv4();
    //   defaultInterims.push({
    //     key: k,
    //     price: convertNumberToPriceInput(parsed.interim_amount1),
    //     negotiable: Boolean(parsed.interim_amount_negotiable1),

    //     onChangePrice: handleChangeInterimPrice(k),
    //     onChangeNegotiable: handleChangeInterimNegotiable(k),

    //     onRemove: handleRemoveInterim(k),
    //   });
    // }

    // if (parsed.interim_amount2) {
    //   const k = uuidv4();
    //   defaultInterims.push({
    //     key: k,
    //     price: convertNumberToPriceInput(parsed.interim_amount2),
    //     negotiable: Boolean(parsed.interim_amount_negotiable2),

    //     onChangePrice: handleChangeInterimPrice(k),
    //     onChangeNegotiable: handleChangeInterimNegotiable(k),

    //     onRemove: handleRemoveInterim(k),
    //   });
    // }

    // if (parsed.interim_amount3) {
    //   const k = uuidv4();
    //   defaultInterims.push({
    //     key: k,
    //     price: convertNumberToPriceInput(parsed.interim_amount3),
    //     negotiable: Boolean(parsed.interim_amount_negotiable3),

    //     onChangePrice: handleChangeInterimPrice(k),
    //     onChangeNegotiable: handleChangeInterimNegotiable(k),

    //     onRemove: handleRemoveInterim(k),
    //   });
    // }

    if (parsed.debt_successions?.length) {
      if (parsed.debt_successions[0]?.name === '보증금') {
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
      setHasDebtSuccession('1');
    }

    if (parsed.collaterals?.length) {
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

    // setInterims(defaultInterims);
    setDebtSuccessionMiscs(defaultDebtSuccessions);
    setCollaterals(defaultCollaterals);
  }, [router.query.params]);

  // useEffect(() => {
  //   setIsAddInterimButtonDisabled(interims.length > 2);
  // }, [interims]);

  useEffect(() => {
    setIsAddDebtSuccessionDisabled(debtSuccessionMiscs.length > 1);
  }, [debtSuccessionMiscs]);

  useEffect(() => {
    setIsAddCollateralDisabled(collaterals.length > 2);
  }, [collaterals]);

  return {
    // isAddInterimButtonDisabled,
    isAddCollateralDisabled,
    isAddDebtSuccessionDisabled,

    nextButtonDisabled,
    handleClickNext,
    handleClickBack,

    forms,

    buyOrRent,
    handleChangeBuyOrRent,

    price,
    handleChangePrice,

    monthlyRentFee,
    handleChangeMonthlyRentFee,

    // contractAmount,
    // handleChangeContractAmount,

    // contractAmountNegotiable,
    // handleChangeContractAmountNegotiable,

    // remainingAmount,
    // handleChangeRemainingAmount,

    // interims,
    // handleAddInterim,

    hasDebtSuccession,
    handleChangeHasDebtSuccession,

    debtSuccessionDeposit,
    handleChangeDebtSuccessionDeposit,

    debtSuccessionMiscs,
    handleAddDebtSuccessionMisc,

    rentEndDate,
    handleChangeRentEndDate,

    collaterals,
    handleAddCollaterals,

    hasSpecialTerms,
    handleChangeHasSpecialTerms: setHasSpecialTerms,

    specialTerms,
    handleChangeSpecialTerms,

    hasMoveInDate,
    handleChangeHasMoveInDate: setHasMoveInDate,

    moveInDate,
    handleChangeMoveInDate,

    moveInDateType,
    handleChangeMoveInDateType,

    verandaExtended,
    handleChangeVerandaExtended,

    verandaRemodelling,
    handleChangeVerandaRemodelling,

    extraOptions,
    handleChangeExtraOptions,

    rentArea,
    handleChangeRentArea,

    hasRentArea,
    handleChangeHasRentArea: setHasRentArea,

    rentTermYear,
    handleChangeRentTermYear,

    rentTermMonth,
    handleChangeRentTermMonth,

    rentTermNegotiable,
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

    // Popup actions
    popup,
    closePopup,

    errPopup,
    closeErrPopup,

    openBackPopup,
    handleConfirmChangeBuyOrRent,
  };
}
