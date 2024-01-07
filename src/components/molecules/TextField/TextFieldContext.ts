import { createContext, Dispatch, SetStateAction } from 'react';

export type VariantType = 'ghost' | 'outlined';

export type SizeType = 'small' | 'medium' | 'big' | 'xlg';

interface ITextFieldContext {
  variant: VariantType;
  size: SizeType;
  nego?: boolean;
  focused: boolean;
  disabled: boolean;
  hasError: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  setFocused: Dispatch<SetStateAction<boolean>>;
}

const TextFieldContext = createContext<ITextFieldContext>({
  variant: 'ghost',
  size: 'big',
  focused: false,
  disabled: false,
  hasError: false,
  setDisabled: () => {},
  setFocused: () => {},
});

export default TextFieldContext;
