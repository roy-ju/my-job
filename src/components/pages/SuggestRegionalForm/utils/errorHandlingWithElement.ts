import { toast } from "react-toastify";

import { Forms } from "../types";

type ErrorHandlingWithElementTypes = {
  elementID: Forms;
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
      toast.error(errorMessage);
    }
  }
}
