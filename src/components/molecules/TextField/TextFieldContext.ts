import { createContext, Dispatch, SetStateAction } from 'react';

interface ITextFieldContext {
  disabled?: boolean;
  setDisabled?: Dispatch<SetStateAction<boolean | undefined>>;
}

const TextFieldContext = createContext<ITextFieldContext>({});

export default TextFieldContext;
