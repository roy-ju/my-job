import { createContext } from 'react';

interface TabsContext {
  variant: 'outlined' | 'contained' | 'ghost';
  value: number;
  onChange: (newValue: number) => void;
}

const SchoolTabsContext = createContext<TabsContext>({
  variant: 'outlined',
  value: 0,
  onChange: () => {},
});

export default SchoolTabsContext;
