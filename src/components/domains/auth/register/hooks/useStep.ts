import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import REGISTER_STEP from '../constants/registerStep';

import FIELD_ID from '../constants/fieldId';

export default function useStep() {
  const router = useRouter();

  const [forms, setForms] = useState<string[]>([]);

  const [step, setStep] = useState(REGISTER_STEP.NONE);

  const updateStep = useCallback((v: number) => {
    setStep(v);
  }, []);

  useEffect(() => {
    if (router?.query?.phone && router?.query?.name) {
      setStep(REGISTER_STEP.TERMS);

      return;
    }

    if (router?.query?.name && !router?.query?.phone) {
      setStep(REGISTER_STEP.PHONE);

      return;
    }

    setStep(REGISTER_STEP.NAME);
  }, [router]);

  useEffect(() => {
    if (step === REGISTER_STEP.TERMS) {
      setForms([FIELD_ID.NAME, FIELD_ID.PHONE, FIELD_ID.TERMS]);
      return;
    }

    if (step === REGISTER_STEP.PHONE) {
      setForms([FIELD_ID.NAME, FIELD_ID.PHONE]);
      return;
    }

    if (step === REGISTER_STEP.NAME) {
      setForms([FIELD_ID.NAME]);
    }
  }, [step]);

  useIsomorphicLayoutEffect(() => {
    if (step === REGISTER_STEP.NONE) return;

    const currentForm = forms[forms.length - 1];

    if (!currentForm) return;

    if (currentForm === FIELD_ID.TERMS) return;

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

      setTimeout(() => formElement.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  }, [forms]);

  return { forms, step, updateStep };
}
