import { Forms } from '@/components/templates/ListingCreateForm/FormRenderer';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useCallback, useMemo, useState } from 'react';

type PopupType = 'none' | 'buyOrRentChagne';

export default function useListingCreateForm(depth: number) {
  const router = useRouter(depth);

  const [popup, setPopup] = useState<PopupType>('none');

  const [forms, setForms] = useState<string[]>([Forms.IsOwner]);

  const [isOwner, setIsOwner] = useState(true);
  const [buyOrRent, setBuyOrRent] = useState(0);
  const [price, setPrice] = useState('');
  const [monthlyRentFee, setMonthlyRentFee] = useState('');

  const setNextForm = useCallback((formName: string) => {
    setForms((prev) => [...prev, formName]);
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

  const handleSubmitIsOwner = useCallback(() => {
    setNextForm(Forms.BuyOrRent);
  }, [setNextForm]);

  const handleSubmitBuyOrRent = useCallback(() => {
    setNextForm(Forms.Price);
  }, [setNextForm]);

  const handleSubmitPrice = useCallback(() => {
    setNextForm(Forms.PaymentSchedules);
  }, [setNextForm]);

  const handleSubmitPaymentSchedules = useCallback(() => {
    setNextForm(Forms.SpecialTerms);
  }, [setNextForm]);

  const handleSubmitSpecialTerms = useCallback(() => {
    router.replace(Routes.ListingCreateChooseAgent);
  }, [router]);

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

  return useMemo(
    () => ({
      forms,
      isOwner,
      buyOrRent,
      price,
      monthlyRentFee,
      handleChangeIsOwner,
      handleChangeBuyOrRent,
      handleClickNext,
      handleChangePrice,
      handleChangeMonthlyRentFee,

      // Popup actions
      popup,
      handleCancelChangeBuyOrRent,
      handleConfirmChangeBuyOrRent,
    }),
    [
      popup,
      forms,
      isOwner,
      buyOrRent,
      price,
      monthlyRentFee,
      handleChangeIsOwner,
      handleChangeBuyOrRent,
      handleClickNext,
      handleCancelChangeBuyOrRent,
      handleConfirmChangeBuyOrRent,
      handleChangePrice,
      handleChangeMonthlyRentFee,
    ],
  );
}
