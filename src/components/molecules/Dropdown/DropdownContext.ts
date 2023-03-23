import { createContext } from 'react';

interface IDropdownContext {
  value: string;
  onChange: (value: string) => void;
}

const DropdownContext = createContext<IDropdownContext>({
  value: '',
  onChange: () => {},
});

export default DropdownContext;
