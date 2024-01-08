import { toast } from 'react-toastify';

type ErrorHandlingWithElementTypes = {
  elementID: string;
  errorMessage?: string;
  behavior?: ScrollBehavior;
};

export default function errorHandlingWithElement({
  elementID,
  errorMessage = '',
  behavior = 'smooth',
}: ErrorHandlingWithElementTypes) {
  const element = document.getElementById(elementID);

  if (element) {
    element.scrollIntoView({ behavior });

    if (errorMessage) {
      toast.error(errorMessage, { toastId: errorMessage });
    }
  }
}
