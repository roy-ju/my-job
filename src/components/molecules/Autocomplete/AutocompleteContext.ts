import { ChangeEventHandler, createContext, KeyboardEventHandler } from 'react';

interface IAutocompleteContext {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onOptionClick?: (value: string) => void;
}

const AutocompleteContext = createContext<IAutocompleteContext>({});

export default AutocompleteContext;
