import useAPI_GetListingDetail from '@/apis/listing/getListingDetail';
import { Forms } from '@/components/templates/BiddingForm/FormRenderer';
import { useIsomorphicLayoutEffect, useRouter } from '@/hooks/utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BuyOrRent } from '@/constants/enums';
import convertNumberToPriceInput from '@/utils/convertNumberToPriceInput';
import useAPI_GetBiddingInfo, { GetBiddingInfoResponse } from '@/apis/bidding/getBiddingInfo';
import Routes from '@/router/routes';
import { TimeTypeString } from '@/constants/strings';
import makeUpdateBiddingParams from './makeUpdateBiddingParams';

export default function useUpdateBiddingForm(depth: number) {
  const router = useRouter(depth);

  const listingID = Number(router.query.listingID) ?? 0;
  const biddingID = Number(router.query.biddingID) ?? 0;

  const scrollLockRef = useRef(true);

  const { data, isLoading: isLoadingListing } = useAPI_GetListingDetail(listingID);
  const { data: biddingData } = useAPI_GetBiddingInfo(biddingID);
  const [isLoadingBidding, setIsLoadingBidding] = useState(true);

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
  const [canHaveEarlierMoveInDate, setCanHaveEarlierMoveInDate] = useState<boolean | null>(null);
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
      setCanHaveEarlierMoveInDate(null);
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
    setCanHaveMoreContractAmount(value);
  }, []);

  const handleChangeContractAmount = useCallback((value: string) => {
    setContractAmount(value);
  }, []);

  const handleChangeCanHaveMoreInterimAmount = useCallback((value: boolean | null) => {
    setCanHaveMoreInterimAmount(value);
  }, []);

  const handleChangeInterimAmount = useCallback((value: string) => {
    setInterimAmount(value);
  }, []);

  const handleChangeCanHaveEarlierRemainingAmountDate = useCallback((value: boolean | null) => {
    setCanHaveEarlierRemainingAmountDate(value);
  }, []);

  const handleChangeRemainingAmountDate = useCallback((value: Date | null) => {
    setRemainingAmountDate(value);
  }, []);

  const handleChangeRemainingAmountDateType = useCallback((value: string) => {
    setRemainingAmountDateType(value);
  }, []);

  const handleChangeCanHaveEarlierMoveInDate = useCallback((value: boolean | null) => {
    setCanHaveEarlierMoveInDate(value);
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
    const reqParams = makeUpdateBiddingParams({
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
      canHaveEarlierMoveInDate,
      moveInDate,
      moveInDateType,
      etcs,
      description,
      biddingInfo: biddingData as GetBiddingInfoResponse,
    });
    router.replace(Routes.UpdateBiddingSummary, {
      searchParams: {
        listingID: router.query.listingID as string,
        biddingID: router.query.biddingID as string,
      },
      state: {
        params: JSON.stringify(reqParams),
      },
    });
  }, [
    router,
    biddingData,
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
    canHaveEarlierMoveInDate,
    moveInDate,
    moveInDateType,
    etcs,
    description,
  ]);

  const handleSubmitPrice = useCallback(() => {
    if (type === 1) {
      setNextForm(Forms.ContractAmount);
    } else {
      handleSubmitFinal();
    }
  }, [type, setNextForm, handleSubmitFinal]);

  const handleSubmitContractAmount = useCallback(() => {
    setNextForm(Forms.InterimAmount);
  }, [setNextForm]);

  const handleSubmitInterimAmount = useCallback(() => {
    if (data?.listing.buy_or_rent === BuyOrRent.Buy) {
      setNextForm(Forms.RemainingAmount);
    } else {
      setNextForm(Forms.MoveInDate);
    }
  }, [setNextForm, data?.listing.buy_or_rent]);

  const handleSubmitRemainingAmount = useCallback(() => {
    setNextForm(Forms.Etc);
  }, [setNextForm]);

  const handleSubmitMoveInDate = useCallback(() => {
    setNextForm(Forms.Etc);
  }, [setNextForm]);

  const handleClickNext = useCallback(() => {
    scrollLockRef.current = false;
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

      if (!scrollLockRef.current) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [forms]);

  // 버튼 비활성화 로직
  useEffect(() => {
    setNextButtonDisabled(false);

    const currentForm = forms[forms.length - 1];
    const buyOrRent = data?.listing.buy_or_rent ?? 0;
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
      if (canHaveEarlierRemainingAmountDate === null) {
        setNextButtonDisabled(true);
      }
      if (canHaveEarlierRemainingAmountDate === true && remainingAmountDate === null) {
        setNextButtonDisabled(true);
      }
    }

    if (currentForm === Forms.MoveInDate) {
      if (canHaveEarlierMoveInDate === null) {
        setNextButtonDisabled(true);
      }
      if (canHaveEarlierMoveInDate === true && moveInDate === null) {
        setNextButtonDisabled(true);
      }
    }
  }, [
    forms,
    type,
    price,
    monthlyRentFee,
    data?.listing.buy_or_rent,
    canHaveMoreContractAmount,
    contractAmount,
    canHaveMoreInterimAmount,
    interimAmount,
    canHaveEarlierRemainingAmountDate,
    remainingAmountDate,
    canHaveEarlierMoveInDate,
    moveInDate,
  ]);

  useIsomorphicLayoutEffect(() => {
    if (!biddingParams) return;

    if (data?.listing?.buy_or_rent === BuyOrRent.Buy && biddingParams.accepting_target_price === false) {
      // 매매일때
      setForms([Forms.Price, Forms.ContractAmount, Forms.InterimAmount, Forms.RemainingAmount, Forms.Etc]);
    } else if (data?.listing?.buy_or_rent === BuyOrRent.Jeonsae && biddingParams.accepting_target_price === false) {
      setForms([Forms.Price, Forms.ContractAmount, Forms.InterimAmount, Forms.MoveInDate, Forms.Etc]);
    } else if (data?.listing?.buy_or_rent === BuyOrRent.Wolsae && biddingParams.accepting_target_price === false) {
      setForms([Forms.Price, Forms.MoveInDate, Forms.Etc]);
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
    if (biddingParams.can_have_earlier_move_in_date !== null) {
      setCanHaveEarlierMoveInDate(biddingParams.can_have_earlier_move_in_date);
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

  useIsomorphicLayoutEffect(() => {
    if (biddingParams) {
      setIsLoadingBidding(false);
      return;
    }
    if (!biddingData || !data?.listing?.buy_or_rent) return;
    if (data?.listing?.buy_or_rent === BuyOrRent.Buy && biddingData.accepting_target_price === false) {
      // 매매일때
      setForms([Forms.Price, Forms.ContractAmount, Forms.InterimAmount, Forms.RemainingAmount, Forms.Etc]);
    } else if (data?.listing?.buy_or_rent === BuyOrRent.Jeonsae && biddingData.accepting_target_price === false) {
      setForms([Forms.Price, Forms.ContractAmount, Forms.InterimAmount, Forms.MoveInDate, Forms.Etc]);
    } else if (data?.listing?.buy_or_rent === BuyOrRent.Wolsae && biddingData.accepting_target_price === false) {
      setForms([Forms.Price, Forms.MoveInDate, Forms.Etc]);
    }

    if (biddingData.accepting_target_price === true) {
      setType(2);
    }
    if (biddingData.accepting_target_price === false) {
      setType(1);
    }
    if (biddingData.bidding_trade_or_deposit_price) {
      setPrice(convertNumberToPriceInput(biddingData.bidding_trade_or_deposit_price));
    }
    if (biddingData.bidding_monthly_rent_fee) {
      setMonthlyRentFee(convertNumberToPriceInput(biddingData.bidding_monthly_rent_fee));
    }
    if (biddingData.can_have_more_contract_amount !== null) {
      setCanHaveMoreContractAmount(biddingData.can_have_more_contract_amount);
    }
    if (biddingData.contract_amount) {
      setContractAmount(convertNumberToPriceInput(biddingData.contract_amount));
    }
    if (biddingData.can_have_more_interim_amount !== null) {
      setCanHaveMoreInterimAmount(biddingData.can_have_more_interim_amount);
    }
    if (biddingData.interim_amount) {
      setInterimAmount(convertNumberToPriceInput(biddingData.interim_amount));
    }
    if (biddingData.can_have_earlier_remaining_amount_payment_time !== null) {
      setCanHaveEarlierRemainingAmountDate(biddingData.can_have_earlier_remaining_amount_payment_time);
    }
    if (biddingData.remaining_amount_payment_time) {
      setRemainingAmountDate(new Date(biddingData.remaining_amount_payment_time));
    }
    if (biddingData.remaining_amount_payment_time_type) {
      setRemainingAmountDateType(TimeTypeString[biddingData.remaining_amount_payment_time_type]);
    }
    if (biddingData.can_have_earlier_move_in_date !== null) {
      setCanHaveEarlierMoveInDate(biddingData.can_have_earlier_move_in_date);
    }
    if (biddingData.move_in_date) {
      setMoveInDate(new Date(biddingData.move_in_date));
    }
    if (biddingData.move_in_date_type) {
      setMoveInDateType(TimeTypeString[biddingData.move_in_date_type]);
    }
    if (biddingData.etcs) {
      setEtcs(biddingData.etcs.split(','));
    }
    if (biddingData.description) {
      setDescription(biddingData.description);
    }
    setIsLoadingBidding(false);
  }, [biddingParams, biddingData, data?.listing?.buy_or_rent]);

  return {
    nextButtonDisabled,
    isLoadingListing,
    isLoadingBidding,
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
    canHaveEarlierMoveInDate,
    handleChangeCanHaveEarlierMoveInDate,
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
