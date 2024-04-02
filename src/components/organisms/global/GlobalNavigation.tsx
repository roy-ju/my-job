import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';

import dynamic from 'next/dynamic';

import tw from 'twin.macro';

import useControlled from '@/hooks/useControlled';

import { NewCount } from '@/components/atoms';

import Logo from '@/assets/icons/logo.svg';

import GlobalHambergerMenu from './GlobalHambergerMenu';

const New = dynamic(() => import('./New'), { ssr: false });

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
  onClickLogo,
}: {
  children: ReactNode;
  onChangeTab?: (index: number) => void;
  tabIndex?: number;
  onClickLogo?: () => void;
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
          <button type="button" onClick={onClickLogo} tw="w-full h-[5.5rem] flex justify-center items-center py-5">
            <Logo />
          </button>
          {children}
        </div>
        <New />
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

function TabButton({
  id,
  text,
  idx,
  icon,
  unreadChatCount = 0,
}: {
  id?: string;
  text: string;
  idx: number;
  icon: any;
  unreadChatCount?: number;
}) {
  const { selectedTab, changeTab } = useNavigationContext();

  function handleTabButton() {
    changeTab(idx);
  }

  return (
    <button
      id={id}
      type="button"
      css={[
        tw`w-full h-[5.25rem] flex flex-col items-center py-3.5 gap-0.5 hover:bg-gray-100 transition-colors`,
        selectedTab === idx ? tw`bg-nego-100 hover:bg-nego-100` : tw`bg-white`,
      ]}
      onClick={handleTabButton}
    >
      <div
        tw="[padding-top: 5px]"
        css={[tw`relative transition-colors`, selectedTab === idx ? tw`text-nego-800` : tw`text-gray-500`]}
      >
        {icon}{' '}
        {text === '채팅' && unreadChatCount > 0 && (
          <NewCount value="N" tw="font-bold absolute top-1 -right-0 translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
      <span
        tw="text-body_01 [padding-bottom: 5px]"
        css={[tw`transition-colors text-info`, selectedTab === idx ? tw`text-nego-800` : tw`text-gray-800`]}
      >
        {text}
      </span>
    </button>
  );
}

GlobalNavigation.TabButton = TabButton;

export default GlobalNavigation;
