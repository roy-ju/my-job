import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import tw from 'twin.macro';
import Logo from '@/assets/icons/logo.svg';
import Menu from '@/assets/icons/menu.svg';

interface NavigationContextType {
  selectedTab: number;
  changeTab: (tab: number) => void;
}

const defaultOption = {
  selectedTab: 0,
  changeTab: () => {},
};

const NavigationContext = createContext<NavigationContextType>(defaultOption);

function GlobalNavigation({
  children,
  onChangeTab,
  defaultTabIndex = 0,
}: {
  children: ReactNode;
  onChangeTab?: () => void;
  defaultTabIndex?: number;
}) {
  const [selectedTab, setSelectedTab] = useState<number>(defaultTabIndex);

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

  useEffect(() => {
    if (!onChangeTab) return;
    onChangeTab();
  }, [selectedTab, onChangeTab]);

  return (
    <NavigationContext.Provider value={providerValue}>
      <div tw="w-16 h-full min-h-[36rem] bg-white flex flex-col justify-between border-r border-gray-300">
        <div>
          <div tw="w-full h-[5.5rem] flex justify-center items-center py-5">
            <Logo />
          </div>
          {children}
        </div>
        <button
          type="button"
          tw="w-full h-[5.25rem] flex justify-center items-center py-5 mb-5"
        >
          <Menu />
        </button>
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

function TabButton({
  text,
  idx,
  icon,
}: {
  text: string;
  idx: number;
  icon: any;
}) {
  const { selectedTab, changeTab } = useNavigationContext();

  function handleTabButton() {
    if (selectedTab === idx) return;
    changeTab(idx);
  }

  return (
    <button
      type="button"
      css={[
        tw`w-full h-[5.25rem] flex flex-col items-center py-5 gap-2 hover:bg-gray-300`,
        selectedTab === idx ? tw`bg-nego-100` : tw`bg-white`,
      ]}
      onClick={handleTabButton}
    >
      <div css={[selectedTab === idx ? tw`text-nego-700` : tw`text-gray-600`]}>
        {icon}
      </div>
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
