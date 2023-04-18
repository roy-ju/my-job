import useAPI_GetListingDetail from '@/apis/listing/getListingDetail';
import { Forms } from '@/components/templates/BiddingForm/FormRenderer';
import { useIsomorphicLayoutEffect, useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useCallback, useEffect, useState } from 'react';
import { BuyOrRent } from '@/constants/enums';
import makeCreateBiddingParams from './makeCreateBiddingParams';

export default function useBiddingForm(depth: number) {
  const router = useRouter(depth);

  const listingID = Number(router.query.listingID);

  const { data } = useAPI_GetListingDetail(listingID);

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
    const params = makeCreateBiddingParams({
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
    });

    router.replace(Routes.BiddingSummary, {
      searchParams: {
        listingID: router.query.listingID as string,
      },
      state: {
        params: JSON.stringify(params),
      },
    });
  }, [
    router,
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

      formElement.scrollIntoView({ behavior: 'smooth' });
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

  return {
    nextButtonDisabled,
    listing: data?.listing,
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
