import useAPI_GetListingDetail from '@/apis/listing/getListingDetail';
import { Forms } from '@/components/templates/BiddingForm/FormRenderer';
import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BuyOrRent } from '@/constants/enums';
import convertNumberToPriceInput from '@/utils/convertNumberToPriceInput';
import { TimeTypeString } from '@/constants/strings';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import makeCreateBiddingParams from './makeCreateBiddingParams';

export default function useBiddingForm() {
  const router = useRouter();

  const listingID = Number(router.query.listingID);

  const { data } = useAPI_GetListingDetail(listingID);

  const biddingParams = useMemo(() => {
    if (typeof router.query.params === 'string') {
      return JSON.parse(router.query.params);
    }
    return null;
  }, [router.query.params]);

  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  const [type, setType] = useState(1);
  const [price, setPrice] = useState('');
  const [monthlyRentFee, setMonthlyRentFee] = useState('');
  const [canHaveMoreContractAmount, setCanHaveMoreContractAmount] = useState<boolean | null>(null);
  const [contractAmount, setContractAmount] = useState('');
  const [canHaveMoreInterimAmount, setCanHaveMoreInterimAmount] = useState<boolean | null>(null);
  const [interimAmount, setInterimAmount] = useState('');
  const [canHaveEarlierRemainingAmountDate, setCanHaveEarlierRemainingAmountDate] = useState<boolean | null>(null);
  const [remainingAmountDate, setRemainingAmountDate] = useState<Date | null>(null);
  const [remainingAmountDateType, setRemainingAmountDateType] = useState('이전');
  const [moveInDate, setMoveInDate] = useState<Date | null>(null);
  const [moveInDateType, setMoveInDateType] = useState('이전');
  const [etcs, setEtcs] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [forms, setForms] = useState<string[]>([Forms.Price]);

  const handleChangeType = useCallback((value: number) => {
    setType(value);
    if (value === 2) {
      setForms([Forms.Price]);
      setPrice('');
      setMonthlyRentFee('');
      setCanHaveMoreContractAmount(null);
      setContractAmount('');
      setCanHaveMoreInterimAmount(null);
      setInterimAmount('');
      setCanHaveEarlierRemainingAmountDate(null);
      setRemainingAmountDate(null);
      setMoveInDate(null);
    }
  }, []);

  const handleChangePrice = useCallback((value: string) => {
    setPrice(value);
  }, []);

  const handleChangeMonthlyRentFee = useCallback((value: string) => {
    setMonthlyRentFee(value);
  }, []);

  const handleChangeCanHaveMoreContractAmount = useCallback((value: boolean | null) => {
    if (value === false) {
      setContractAmount('');
    }
    setCanHaveMoreContractAmount(value);
  }, []);

  const handleChangeContractAmount = useCallback((value: string) => {
    setContractAmount(value);
  }, []);

  const handleChangeCanHaveMoreInterimAmount = useCallback((value: boolean | null) => {
    if (value === false) {
      setInterimAmount('');
    }
    setCanHaveMoreInterimAmount(value);
  }, []);

  const handleChangeInterimAmount = useCallback((value: string) => {
    setInterimAmount(value);
  }, []);

  const handleChangeCanHaveEarlierRemainingAmountDate = useCallback((value: boolean | null) => {
    if (value === false) {
      setRemainingAmountDate(null);
    }
    setCanHaveEarlierRemainingAmountDate(value);
  }, []);

  const handleChangeRemainingAmountDate = useCallback((value: Date | null) => {
    setRemainingAmountDate(value);
  }, []);

  const handleChangeRemainingAmountDateType = useCallback((value: string) => {
    setRemainingAmountDateType(value);
  }, []);

  const handleChangeMoveInDate = useCallback((value: Date | null) => {
    setMoveInDate(value);
  }, []);

  const handleChangeMoveInDateType = useCallback((value: string) => {
    setMoveInDateType(value);
  }, []);

  const handleChangeEtcs = useCallback((value: string[]) => {
    setEtcs(value);
  }, []);

  const handleChangeDescription = useCallback((value: string) => {
    setDescription(value);
  }, []);

  const setNextForm = useCallback((...formNames: string[]) => {
    setForms((prev) => [...prev, ...formNames]);
  }, []);

  const handleSubmitFinal = useCallback(() => {
    // 한번더 최종 벨리데이션을 한다.

    if (canHaveMoreContractAmount === true && contractAmount === '') {
      const form = document.getElementById(Forms.ContractAmount);
      toast.error('계약금을 입력해주세요.');
      form?.scrollIntoView();
      return;
    }

    if (canHaveMoreInterimAmount === true && interimAmount === '') {
      const form = document.getElementById(Forms.InterimAmount);
      toast.error('중도금을 입력해주세요.');
      form?.scrollIntoView();
      return;
    }

    if (canHaveEarlierRemainingAmountDate === true && remainingAmountDate === null) {
      const form = document.getElementById(Forms.RemainingAmount);
      toast.error('잔금날짜를 입력해주세요.');
      form?.scrollIntoView();
      return;
    }

    const params = makeCreateBiddingParams({
      acceptingTargetPrice: type === 2,
      price,
      monthlyRentFee,
      canHaveMoreContractAmount,
      contractAmount,
      canHaveMoreInterimAmount,
      interimAmount,
      canHaveEarlierRemainingAmountDate,
      remainingAmountDate,
      remainingAmountDateType,
      moveInDate,
      moveInDateType,
      etcs,
      description,
    });
    router.replace(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.BiddingSummary}`,
        query: {
          listingID: router.query.listingID,
          params: JSON.stringify(params),
        },
      },
      `/${Routes.EntryMobile}/${Routes.BiddingSummary}?listingID=${router.query.listingID}`,
    );
  }, [
    router,
    price,
    type,
    monthlyRentFee,
    canHaveMoreContractAmount,
    contractAmount,
    canHaveMoreInterimAmount,
    interimAmount,
    canHaveEarlierRemainingAmountDate,
    remainingAmountDate,
    remainingAmountDateType,
    moveInDate,
    moveInDateType,
    etcs,
    description,
  ]);

  const handleSubmitPrice = useCallback(() => {
    if (type === 1) {
      if (data?.listing?.buy_or_rent === BuyOrRent.Wolsae) {
        setNextForm(Forms.MoveInDate);
      } else {
        setNextForm(Forms.ContractAmount);
      }
    } else {
      handleSubmitFinal();
    }
  }, [type, data?.listing?.buy_or_rent, setNextForm, handleSubmitFinal]);

  const handleSubmitContractAmount = useCallback(() => {
    setNextForm(Forms.InterimAmount);
  }, [setNextForm]);

  const handleSubmitInterimAmount = useCallback(() => {
    if (data?.listing?.buy_or_rent === BuyOrRent.Buy) {
      setNextForm(Forms.RemainingAmount);
    } else {
      setNextForm(Forms.MoveInDate);
    }
  }, [setNextForm, data?.listing?.buy_or_rent]);

  const handleSubmitRemainingAmount = useCallback(() => {
    setNextForm(Forms.Etc);
  }, [setNextForm]);

  const handleSubmitMoveInDate = useCallback(() => {
    setNextForm(Forms.Etc);
  }, [setNextForm]);

  const handleClickNext = useCallback(() => {
    setNextButtonDisabled(true);
    const lastForm = forms[forms.length - 1];

    switch (lastForm) {
      case Forms.Price:
        handleSubmitPrice();
        break;

      case Forms.ContractAmount:
        handleSubmitContractAmount();
        break;

      case Forms.InterimAmount:
        handleSubmitInterimAmount();
        break;

      case Forms.RemainingAmount:
        handleSubmitRemainingAmount();
        break;

      case Forms.MoveInDate:
        handleSubmitMoveInDate();
        break;

      case Forms.Etc:
        handleSubmitFinal();
        break;

      default:
        break;
    }
  }, [
    forms,
    handleSubmitPrice,
    handleSubmitContractAmount,
    handleSubmitInterimAmount,
    handleSubmitRemainingAmount,
    handleSubmitMoveInDate,
    handleSubmitFinal,
  ]);

  // 필드 자동스크롤 로직
  useIsomorphicLayoutEffect(() => {
    const currentForm = forms[forms.length - 1];
    if (currentForm === Forms.Price) return;
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
  useEffect(() => {
    setNextButtonDisabled(false);

    const currentForm = forms[forms.length - 1];
    const buyOrRent = data?.listing?.buy_or_rent ?? 0;
    if (currentForm === Forms.Price) {
      if (type === 1) {
        const priceNum = Number(price) ?? 0;
        const monthlyRentFeeNum = Number(monthlyRentFee) ?? 0;

        if ([BuyOrRent.Buy, BuyOrRent.Jeonsae].includes(buyOrRent) && priceNum < 1) {
          setNextButtonDisabled(true);
        }
        if (buyOrRent === BuyOrRent.Wolsae && (priceNum < 1 || monthlyRentFeeNum < 1)) {
          setNextButtonDisabled(true);
        }
      }
    }

    if (currentForm === Forms.ContractAmount) {
      const contractAmountNum = Number(contractAmount) ?? 0;

      if (canHaveMoreContractAmount === null) {
        setNextButtonDisabled(true);
      }
      if (canHaveMoreContractAmount === true && contractAmountNum < 1) {
        setNextButtonDisabled(true);
      }
    }

    if (currentForm === Forms.InterimAmount) {
      const interimAmountNum = Number(interimAmount) ?? 0;

      if (canHaveMoreInterimAmount === null) {
        setNextButtonDisabled(true);
      }
      if (canHaveMoreInterimAmount === true && interimAmountNum < 1) {
        setNextButtonDisabled(true);
      }
    }

    if (currentForm === Forms.RemainingAmount) {
      if (canHaveEarlierRemainingAmountDate === null && data?.listing?.remaining_amount_payment_time) {
        setNextButtonDisabled(true);
      }
      if (canHaveEarlierRemainingAmountDate === true && remainingAmountDate === null) {
        setNextButtonDisabled(true);
      }
      if (!data?.listing?.remaining_amount_payment_time && remainingAmountDate === null) {
        setNextButtonDisabled(true);
      }
    }

    if (currentForm === Forms.MoveInDate) {
      if (moveInDate === null) {
        setNextButtonDisabled(true);
      }
    }
  }, [
    forms,
    type,
    price,
    monthlyRentFee,
    data?.listing?.buy_or_rent,
    data?.listing?.remaining_amount_payment_time,
    canHaveMoreContractAmount,
    contractAmount,
    canHaveMoreInterimAmount,
    interimAmount,
    canHaveEarlierRemainingAmountDate,
    remainingAmountDate,
    moveInDate,
  ]);

  useIsomorphicLayoutEffect(() => {
    if (!biddingParams) return;
    if (data?.listing?.buy_or_rent === BuyOrRent.Buy && biddingParams.accepting_target_price === false) {
      setForms([Forms.Price, Forms.ContractAmount, Forms.InterimAmount, Forms.RemainingAmount, Forms.Etc]);
    } else if (
      [BuyOrRent.Jeonsae, BuyOrRent.Wolsae].includes(data?.listing?.buy_or_rent ?? 0) &&
      biddingParams.accepting_target_price === false
    ) {
      setForms([Forms.Price, Forms.ContractAmount, Forms.InterimAmount, Forms.MoveInDate, Forms.Etc]);
    }

    if (biddingParams.accepting_target_price === true) {
      setType(2);
    }
    if (biddingParams.accepting_target_price === false) {
      setType(1);
    }
    if (biddingParams.bidding_trade_or_deposit_price) {
      setPrice(convertNumberToPriceInput(biddingParams.bidding_trade_or_deposit_price));
    }
    if (biddingParams.bidding_monthly_rent_fee) {
      setMonthlyRentFee(convertNumberToPriceInput(biddingParams.bidding_monthly_rent_fee));
    }
    if (biddingParams.can_have_more_contract_amount !== null) {
      setCanHaveMoreContractAmount(biddingParams.can_have_more_contract_amount);
    }
    if (biddingParams.contract_amount) {
      setContractAmount(convertNumberToPriceInput(biddingParams.contract_amount));
    }
    if (biddingParams.can_have_more_interim_amount !== null) {
      setCanHaveMoreInterimAmount(biddingParams.can_have_more_interim_amount);
    }
    if (biddingParams.interim_amount) {
      setInterimAmount(convertNumberToPriceInput(biddingParams.interim_amount));
    }
    if (biddingParams.can_have_earlier_remaining_amount_payment_time !== null) {
      setCanHaveEarlierRemainingAmountDate(biddingParams.can_have_earlier_remaining_amount_payment_time);
    }
    if (biddingParams.remaining_amount_payment_time) {
      setRemainingAmountDate(new Date(biddingParams.remaining_amount_payment_time));
    }
    if (biddingParams.remaining_amount_payment_time_type) {
      setRemainingAmountDateType(TimeTypeString[biddingParams.remaining_amount_payment_time_type]);
    }
    if (biddingParams.move_in_date) {
      setMoveInDate(new Date(biddingParams.move_in_date));
    }
    if (biddingParams.move_in_date_type) {
      setMoveInDateType(TimeTypeString[biddingParams.move_in_date_type]);
    }
    if (biddingParams.etcs) {
      setEtcs(biddingParams.etcs.split(','));
    }
    if (biddingParams.description) {
      setDescription(biddingParams.description);
    }
  }, [biddingParams, data?.listing?.buy_or_rent]);

  return {
    nextButtonDisabled,
    listing: data?.listing,
    displayAddress: data?.display_address,
    type,
    handleChangeType,
    forms,
    handleClickNext,
    price,
    handleChangePrice,
    monthlyRentFee,
    handleChangeMonthlyRentFee,
    canHaveMoreContractAmount,
    handleChangeCanHaveMoreContractAmount,
    contractAmount,
    handleChangeContractAmount,
    canHaveMoreInterimAmount,
    handleChangeCanHaveMoreInterimAmount,
    interimAmount,
    handleChangeInterimAmount,
    canHaveEarlierRemainingAmountDate,
    handleChangeCanHaveEarlierRemainingAmountDate,
    remainingAmountDate,
    handleChangeRemainingAmountDate,
    remainingAmountDateType,
    handleChangeRemainingAmountDateType,
    moveInDate,
    handleChangeMoveInDate,
    moveInDateType,
    handleChangeMoveInDateType,
    etcs,
    handleChangeEtcs,
    description,
    handleChangeDescription,
  };
}