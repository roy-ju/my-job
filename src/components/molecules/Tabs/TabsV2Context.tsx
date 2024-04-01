import { createContext } from 'react';

interface ITabsContextV2 {
  variant: 'contained';
  value: number;
  onChange: (newValue: number) => void;
}

const TabsV2Context = createContext<ITabsContextV2>({
  variant: 'contained',
  value: 0,
  onChange: () => {},
});

export default TabsV2Context;
