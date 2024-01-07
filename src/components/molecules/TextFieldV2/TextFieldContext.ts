import { createContext, Dispatch, SetStateAction } from 'react';

export type VariantTypeV2 = 'ghost' | 'outlined';

interface ITextFieldContextV2 {
  variant: VariantTypeV2;
  focused: boolean;
  disabled: boolean;
  hasError: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  setFocused: Dispatch<SetStateAction<boolean>>;
}

const TextFieldContextV2 = createContext<ITextFieldContextV2>({
  variant: 'ghost',
  focused: false,
  disabled: false,
  hasError: false,
  setDisabled: () => {},
  setFocused: () => {},
});

export default TextFieldContextV2;
