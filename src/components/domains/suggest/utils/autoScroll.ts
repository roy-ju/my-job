import forms from '../form/constants/forms';

export default function autoScroll<T extends string>(
  elementID: string,
  formsProps: T[],
  currentForm: T,
  params?: string | string[],
) {
  const formContainer = document.getElementById(elementID);

  const formElement = document.getElementById(currentForm);

  const containerHeight = formContainer?.getBoundingClientRect().height ?? 0;

  if (formElement && currentForm !== forms.REGION_OR_DANJI && currentForm !== forms.SUMMARY) {
    formElement.style.minHeight = `${containerHeight}px`;
    const prevForm = formsProps[formsProps.length - 2];

    if (prevForm) {
      const prevFormElement = document.getElementById(prevForm);

      if (prevFormElement && !params) {
        prevFormElement.style.minHeight = '';
      }
    }

    if (params) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    } else {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
