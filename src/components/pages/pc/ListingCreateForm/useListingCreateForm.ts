import { InterimType } from '@/components/templates/ListingCreateForm/FormContext';
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

  const [popup, setPopup] = useState<PopupType>('none');

  const [forms, setForms] = useState<string[]>([Forms.IsOwner]);

  const [isOwner, setIsOwner] = useState(true);
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');

  const [buyOrRent, setBuyOrRent] = useState(0);
  const [price, setPrice] = useState('');
  const [monthlyRentFee, setMonthlyRentFee] = useState('');
  const [contractAmount, setContractAmount] = useState('');
  const [contractAmountNegotiable, setContractAmountNegotiable] = useState(true);
  const [remainingAmount, setRemainingAmount] = useState('');
  const [interims, setInterims] = useState<InterimType[]>([]);

  const [addressData, setAddressData] = useState<KakaoAddressAutocompleteResponseItem | null>(null);

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
      });

      const newForms = [...forms];
      newForms.splice(index + 1, newForms.length - index);
      setForms(newForms);
    },
    [forms, resetBuyOrRent, resetPrice],
  );

  /** Input Validations 과 다음에는 어떤 필드가 올지 결정하는 핸들러들 */

  const handleSubmitIsOwner = useCallback(() => {
    setNextForm(Forms.BuyOrRent);
  }, [setNextForm]);

  const handleSubmitBuyOrRent = useCallback(() => {
    if (buyOrRent === 0) {
      console.error('buy_or_rent cannot be 0');
      return;
    }

    setNextForm(Forms.Price);
  }, [buyOrRent, setNextForm]);

  const handleSubmitPrice = useCallback(() => {
    if (price === '') {
      console.error('price is required');
      return;
    }

    if (buyOrRent === BuyOrRent.Wolsae && monthlyRentFee === '') {
      console.error('monthly_rent_fee is required');
      return;
    }

    setNextForm(Forms.PaymentSchedules);
  }, [buyOrRent, price, monthlyRentFee, setNextForm]);

  const handleSubmitPaymentSchedules = useCallback(() => {
    setNextForm(Forms.SpecialTerms);
  }, [setNextForm]);

  const handleSubmitSpecialTerms = useCallback(() => {
    setNextForm(Forms.ListingOptions, Forms.ExtraOptions, Forms.AdminFee, Forms.Description);
  }, [setNextForm]);

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
      case Forms.PaymentSchedules:
        handleSubmitPaymentSchedules();
        break;
      case Forms.SpecialTerms:
        handleSubmitSpecialTerms();
        break;
      case Forms.Description:
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
    handleSubmitFinal,
  ]);

  const handleCancelChangeBuyOrRent = useCallback(() => {
    setPopup('none');
  }, []);

  const handleConfirmChangeBuyOrRent = useCallback(() => {
    setPopup('none');
    resetForms(Forms.BuyOrRent);
  }, [resetForms]);

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

  const handleRemoveInterim = useCallback(
    (key: string) => () => {
      setInterims((prev) => prev.filter((interim) => interim.key !== key));
    },
    [],
  );

  const handleAddInterim = useCallback(() => {
    const newInterims = [...interims];
    const key = uuidv4();
    newInterims.push({ price: '', negotiable: true, key });
    newInterims[newInterims.length - 1].onRemove = handleRemoveInterim(key);
    newInterims[newInterims.length - 1].onChangePrice = handleChangeInterimPrice(key);
    newInterims[newInterims.length - 1].onChangeNegotiable = handleChangeInterimNegotiable(key);
    setInterims(newInterims);
  }, [interims, handleRemoveInterim, handleChangeInterimPrice, handleChangeInterimNegotiable]);

  useIsomorphicLayoutEffect(() => {
    const currentForm = forms[forms.length - 1];
    if (currentForm === Forms.IsOwner) return;
    // 기타정보
    if (currentForm === Forms.Description) {
      const formElement = document.getElementById(Forms.ListingOptions);
      formElement?.scrollIntoView({ behavior: 'smooth' });
      const nextButtonContainer = document.getElementById('formSubmitContainer');
      if (nextButtonContainer) {
        nextButtonContainer.style.height = '';
      }

      return;
    }

    const formContainer = document.getElementById('formContainer');
    const formElement = document.getElementById(currentForm);
    const nextButtonContainer = document.getElementById('formSubmitContainer');

    const containerHeight = formContainer?.getBoundingClientRect().height ?? 0;
    const formElementHeight = formElement?.getBoundingClientRect().height ?? 0;

    if (nextButtonContainer) {
      nextButtonContainer.style.height = `${containerHeight - formElementHeight}px`;
      formElement?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [forms]);

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

      // Popup actions
      popup,
      handleCancelChangeBuyOrRent,
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

      handleChangeIsOwner,
      handleChangeOwnerName,
      handleChangeOwnerPhone,
      handleChangeBuyOrRent,
      handleClickNext,
      handleCancelChangeBuyOrRent,
      handleConfirmChangeBuyOrRent,
      handleChangePrice,
      handleChangeMonthlyRentFee,
      handleChangeContractAmount,
      handleChangeContractAmountNegotiable,
      handleChangeRemainingAmount,
      handleAddInterim,
    ],
  );
}
