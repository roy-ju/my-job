import { Forms } from '@/components/templates/ListingCreateForm/FormRenderer';
import { useCallback, useMemo, useState } from 'react';

export default function useListingCreateForm() {
  const [forms, setForms] = useState<string[]>([Forms.IsOwner]);

  const [isOwner, setIsOwner] = useState(true);

  const handleChangeIsOwner = useCallback((value: boolean) => {
    setIsOwner(value);
  }, []);

  const setNextForm = useCallback((formName: string) => {
    setForms((prev) => [...prev, formName]);
  }, []);

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
      default:
        break;
    }
  }, [forms, handleSubmitIsOwner, handleSubmitBuyOrRent, handleSubmitPrice, handleSubmitPaymentSchedules]);

  return useMemo(
    () => ({
      forms,
      isOwner,
      handleChangeIsOwner,
      handleClickNext,
    }),
    [forms, isOwner, handleChangeIsOwner, handleClickNext],
  );
}
