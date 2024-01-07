import { createContext, Dispatch, SetStateAction } from 'react';

export type VariantTypeV2 = 'ghost' | 'outlined';

export type SizeTypeV2 = 'small' | 'medium' | 'big' | 'xlg';

interface ITextFieldContextV2 {
  variant: VariantTypeV2;
  size: SizeTypeV2;
  nego?: boolean;
  focused: boolean;
  disabled: boolean;
  hasError: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  setFocused: Dispatch<SetStateAction<boolean>>;
}

const TextFieldContextV2 = createContext<ITextFieldContextV2>({
  variant: 'ghost',
  size: 'big',
  focused: false,
  disabled: false,
  hasError: false,
  setDisabled: () => {},
  setFocused: () => {},
});

export default TextFieldContextV2;
