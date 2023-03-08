import { ChangeEventHandler, createContext } from 'react';

interface IAutocompleteContext {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: () => void;
  onOptionClick?: (value: string) => void;
}

const AutocompleteContext = createContext<IAutocompleteContext>({});

export default AutocompleteContext;
