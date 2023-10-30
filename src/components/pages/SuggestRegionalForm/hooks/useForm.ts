import { useContext } from "react";

import { FormContext } from "../provider/SuggestRegionalProvider";

export default function useForm() {
  return useContext(FormContext);
}
