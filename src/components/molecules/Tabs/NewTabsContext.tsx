import { createContext } from 'react';

interface ITabsContext {
  variant: 'contained';
  value: number;
  onChange: (newValue: number) => void;
}

const NewTabsContext = createContext<ITabsContext>({
  variant: 'contained',
  value: 0,
  onChange: () => {},
});

export default NewTabsContext;
