import { createContext } from 'react';

interface ITabsContext {
  variant: 'outlined' | 'contained' | 'ghost';
  value: number;
  onChange: (newValue: number) => void;
}

const SchoolTabsContext = createContext<ITabsContext>({
  variant: 'outlined',
  value: 0,
  onChange: () => {},
});

export default SchoolTabsContext;
