import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import tw from 'twin.macro';

type Props = {
  children?: ReactNode;
};

type NavigationContextType = {
  selectedTab: number;
  changeTab: (tab: number) => void;
};

const defaultOption = {
  selectedTab: 0,
  changeTab: () => {},
};

const NavigationContext = createContext<NavigationContextType>(defaultOption);

function GlobalNavigation({ children }: Props) {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const changeTab = useCallback(
    (value: number) => {
      if (selectedTab !== value) setSelectedTab(value);
    },
    [setSelectedTab, selectedTab],
  );

  const providerValue = useMemo(
    () => ({
      selectedTab,
      changeTab,
    }),
    [selectedTab, changeTab],
  );

  return (
    <NavigationContext.Provider value={providerValue}>
      <div tw="w-16 h-full bg-white flex flex-col">
        <div tw="w-full h-[5.25rem] flex flex-col items-center py-5" />
        {children}
      </div>
    </NavigationContext.Provider>
  );
}

function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      'Global Navigation compound components cannot be rendered outside the GlobalNavigation component',
    );
  }
  return context;
}

function TabButton({ text, idx }: { text: string; idx: number }) {
  const { selectedTab, changeTab } = useNavigationContext();

  function handleTabButton() {
    if (selectedTab === idx) return;
    changeTab(idx);
  }

  return (
    <button
      type="button"
      css={[
        tw`w-full h-[5.25rem] flex flex-col items-center py-5`,
        selectedTab === idx ? tw`bg-nego-100` : tw`bg-white`,
      ]}
      onClick={handleTabButton}
    >
      <span
        css={[
          tw`text-info`,
          selectedTab === idx ? tw`text-nego-1000` : tw`text-gray-1000`,
        ]}
      >
        {text}
      </span>
    </button>
  );
}

GlobalNavigation.TabButton = TabButton;

export default GlobalNavigation;
