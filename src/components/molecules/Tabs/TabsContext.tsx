import { createContext } from 'react';

interface ITabsContext {
  variant: 'outlined' | 'contained' | 'ghost';
  value: number;
  onChange: (newValue: number) => void;
}

const TabsContext = createContext<ITabsContext>({
  variant: 'outlined',
  value: 0,
  onChange: () => {},
});

export default TabsContext;
