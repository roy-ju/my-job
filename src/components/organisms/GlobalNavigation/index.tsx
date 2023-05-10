import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';
import tw from 'twin.macro';
import Logo from '@/assets/icons/logo.svg';
import { useControlled } from '@/hooks/utils';
import GlobalHambergerMenu from '../GlobalHambergerMenu';

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
  tabIndex: tabIndexProp,
}: {
  children: ReactNode;
  onChangeTab?: (index: number) => void;
  tabIndex?: number;
}) {
  const [tabIndex, setTabIndexState] = useControlled({
    controlled: tabIndexProp,
    default: 0,
  });

  const handleChangeTab = useCallback(
    (value: number) => {
      setTabIndexState(value);
      onChangeTab?.(value);
    },
    [setTabIndexState, onChangeTab],
  );

  const providerValue = useMemo(
    () => ({
      selectedTab: tabIndex,
      changeTab: handleChangeTab,
    }),
    [tabIndex, handleChangeTab],
  );

  return (
    <NavigationContext.Provider value={providerValue}>
      <div tw="w-16 h-full min-h-[36rem] bg-white flex flex-col justify-between border-r border-gray-300 shadow-[0px_8px_16px_rgba(0,0,0,0.06)]">
        <div>
          <div tw="w-full h-[5.5rem] flex justify-center items-center py-5">
            <Logo />
          </div>
          {children}
        </div>
        <GlobalHambergerMenu />
      </div>
    </NavigationContext.Provider>
  );
}

function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('Global Navigation compound components cannot be rendered outside the GlobalNavigation component');
  }
  return context;
}

function TabButton({ text, idx, icon }: { text: string; idx: number; icon: any }) {
  const { selectedTab, changeTab } = useNavigationContext();

  function handleTabButton() {
    changeTab(idx);
  }

  return (
    <button
      type="button"
      css={[
        tw`w-full h-[5.25rem] flex flex-col items-center py-5 gap-2 hover:bg-gray-100 transition-colors`,
        selectedTab === idx ? tw`bg-nego-100 hover:bg-nego-100` : tw`bg-white`,
      ]}
      onClick={handleTabButton}
    >
      <div css={[tw`transition-colors`, selectedTab === idx ? tw`text-nego-700` : tw`text-gray-600`]}>{icon}</div>
      <span css={[tw`transition-colors text-info`, selectedTab === idx ? tw`text-nego-1000` : tw`text-gray-1000`]}>
        {text}
      </span>
    </button>
  );
}

GlobalNavigation.TabButton = TabButton;

export default GlobalNavigation;
