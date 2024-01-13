import { isValidElement, ReactNode, useCallback, useContext, useMemo } from 'react';

import { motion } from 'framer-motion';

import useControlled from '@/hooks/useControlled';

import tw from 'twin.macro';

import getChildrenByType from '@/utils/getChildrenByType';

import NewTabsContext from './NewTabsContext';

const newTabStyles = {
  contained: tw`w-full text-gray-700 [height: 44px] text-b2`,
};

const newIndicatorStyles = {
  contained: tw`w-full h-full bg-white rounded-lg [border-bottom-left-radius: 0] [border-bottom-right-radius: 0] [border-top: 1px solid #E9ECEF]`,
};

const newTabsStyles = {
  contained: tw`p-0 bg-gray-200 border-0`,
};

interface TabProps {
  value: number;
  children?: ReactNode;
}

function Tab({ value, children }: TabProps) {
  const { variant, value: currentValue, onChange } = useContext(NewTabsContext);

  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      css={[tw`relative z-10`, newTabStyles[variant], value !== currentValue && tw`[border-bottom: 1px solid #E9ECEF]`]}
    >
      <span css={[value === currentValue ? tw`font-bold text-gray-1000` : tw`text-gray-700`]}>{children}</span>
    </button>
  );
}

function Indicator({ children }: { children?: ReactNode }) {
  const { variant, value } = useContext(NewTabsContext);

  return (
    <>
      <div
        tw="w-full"
        css={[
          newIndicatorStyles[variant],
          value === 1
            ? tw`[border-right: 1px solid #E9ECEF] [border-top-left-radius: 0]`
            : tw`[border-left: 1px solid #E9ECEF] [border-top-right-radius: 0]`,
        ]}
      >
        {children}
      </div>
    </>
  );
}

interface TabsProps {
  variant?: 'contained';
  value?: number;
  onChange?: (newValue: number) => void;
  children?: ReactNode;
}

function NewTabs({ variant = 'contained', value: valueProp, children, onChange }: TabsProps) {
  const [value, setValue] = useControlled({ controlled: valueProp, default: 0 });

  const handleChange = useCallback(
    (newValue: number) => {
      setValue(newValue);
      onChange?.(newValue);
    },
    [onChange, setValue],
  );

  const context = useMemo(
    () => ({
      variant,
      value,
      onChange: handleChange,
    }),
    [variant, value, handleChange],
  );

  const tabChildren = getChildrenByType(children, Tab);
  const indicatorChild = getChildrenByType(children, Indicator)?.[0] ?? null;

  return (
    <NewTabsContext.Provider value={context}>
      <motion.div css={[tw`flex items-center`, newTabsStyles[variant]]}>
        {tabChildren?.map((child) =>
          isValidElement(child) ? (
            <div tw="relative flex-1" key={child.key ?? child.props.value}>
              {child}
              {value === child.props.value && (
                <motion.div tw="absolute left-0 top-0 z-0 w-full h-full pointer-events-none">
                  {indicatorChild}
                </motion.div>
              )}
            </div>
          ) : null,
        )}
      </motion.div>
    </NewTabsContext.Provider>
  );
}

export default Object.assign(NewTabs, { Tab, Indicator });
