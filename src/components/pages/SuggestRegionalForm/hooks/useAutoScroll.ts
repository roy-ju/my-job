import { useEffect } from 'react';

import { useRouter } from 'next/router';

import useForm from './useForm';

export default function useAutoScroll({ elementID }: { elementID: string }) {
  const form = useForm();

  const router = useRouter();

  useEffect(() => {
    if (!form?.forms) return;

    const forms = form?.forms;

    const currentForm = forms[forms.length - 1];

    const formContainer = document.getElementById(elementID);

    const containerHeight = formContainer?.getBoundingClientRect().height ?? 0;

    const formElement = document.getElementById(currentForm);

    if (formElement) {
      formElement.style.minHeight = `${containerHeight}px`;

      const prevForm = forms[forms.length - 2];

      if (prevForm) {
        const prevFormElement = document.getElementById(prevForm);

        if (prevFormElement) {
          prevFormElement.style.minHeight = '';
        }
      }

      if (router?.query?.params) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      } else {
        setTimeout(() => {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    }
  }, [elementID, router, form?.forms]);
}
