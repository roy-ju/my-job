import { Forms } from '@/components/templates/SuggestRegionalForm/FormRenderer';
import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import { useCallback, useState } from 'react';

export default function useSuggestRegionalForm() {
  const [forms, setForms] = useState<string[]>([Forms.Region]);

  const setNextForm = useCallback((...formNames: string[]) => {
    setForms((prev) => [...prev, ...formNames]);
  }, []);

  const handleSubmitRegion = useCallback(() => {
    setNextForm(Forms.RealestateType);
  }, [setNextForm]);

  const handleSubmitRealestateType = useCallback(() => {
    setNextForm(Forms.Price);
  }, [setNextForm]);

  const handleSubmitPrice = useCallback(() => {
    setNextForm(Forms.Area);
  }, [setNextForm]);

  const handleSubmitArea = useCallback(() => {
    setNextForm(Forms.Floor);
  }, [setNextForm]);

  const handleSubmitFloor = useCallback(() => {
    setNextForm(Forms.Purpose);
  }, [setNextForm]);

  const handleSubmitPurpose = useCallback(() => {
    setNextForm(Forms.Description);
  }, [setNextForm]);

  const handleSubmitDescription = useCallback(() => {}, []);

  const handleClickNext = useCallback(() => {
    const lastForm = forms[forms.length - 1];
    switch (lastForm) {
      case Forms.Region:
        handleSubmitRegion();
        break;

      case Forms.RealestateType:
        handleSubmitRealestateType();
        break;

      case Forms.Price:
        handleSubmitPrice();
        break;

      case Forms.Area:
        handleSubmitArea();
        break;

      case Forms.Floor:
        handleSubmitFloor();
        break;

      case Forms.Purpose:
        handleSubmitPurpose();
        break;

      case Forms.Description:
        handleSubmitDescription();
        break;

      default:
        break;
    }
  }, [
    forms,
    handleSubmitRegion,
    handleSubmitRealestateType,
    handleSubmitPrice,
    handleSubmitArea,
    handleSubmitFloor,
    handleSubmitPurpose,
    handleSubmitDescription,
  ]);

  // 필드 자동스크롤 로직
  useIsomorphicLayoutEffect(() => {
    const currentForm = forms[forms.length - 1];

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

  return {
    forms,
    handleClickNext,
  };
}
