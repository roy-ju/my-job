import { isValidElement, ReactNode, useCallback, useContext, useMemo } from 'react';

import { motion } from 'framer-motion';

import useControlled from '@/hooks/useControlled';

import tw from 'twin.macro';

import getChildrenByType from '@/utils/getChildrenByType';

import SchoolTabsContext from './SchoolTabsContext';

const schoolTabStyles = {
  ghost: tw`w-full`,
  outlined: tw`w-full h-10 text-b1`,
  contained: tw`w-full h-9 text-b2 text-gray-700`,
};

const schoolIndicatorStyles = {
  ghost: tw`w-full h-full`,
  outlined: tw`w-full h-full border-b-2 border-b-gray-1000`,
  contained: tw`w-full h-full bg-white rounded-lg shadow-[0px_6px_12px_rgba(0,0,0,0.08)]`,
};

const schoolTabsStyles = {
  ghost: tw``,
  outlined: tw`bg-white border-b border-gray-300`,
  contained: tw`p-1 bg-gray-200 rounded-lg`,
};

interface TabProps {
  value: number;
  children?: ReactNode;
}

function Tab({ value, children }: TabProps) {
  const { variant, value: currentValue, onChange } = useContext(SchoolTabsContext);

  return (
    <button type="button" onClick={() => onChange(value)} css={[tw`relative z-10`, schoolTabStyles[variant]]}>
      <span css={[value === currentValue ? tw`font-bold text-gray-1000` : tw`text-gray-700`]}>{children}</span>
    </button>
  );
}

function Indicator({ children }: { children?: ReactNode }) {
  const { variant } = useContext(SchoolTabsContext);

  return <div css={schoolIndicatorStyles[variant]}>{children}</div>;
}

interface TabsProps {
  variant?: 'outlined' | 'contained' | 'ghost';
  value?: number;
  onChange?: (newValue: number) => void;
  children?: ReactNode;
}

function SchoolTabs({ variant = 'outlined', value: valueProp, children, onChange }: TabsProps) {
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
    <SchoolTabsContext.Provider value={context}>
      <motion.div layout layoutRoot css={[tw`flex items-center`, schoolTabsStyles[variant]]}>
        {tabChildren?.map((child) =>
          isValidElement(child) ? (
            <div tw="relative flex-1" key={child.key ?? child.props.value}>
              {child}
              {value === child.props.value && (
                <motion.div
                  layoutId={`school-${variant}-indicator`}
                  tw="absolute left-0 top-0 w-full h-full pointer-events-none z-0"
                >
                  {indicatorChild}
                </motion.div>
              )}
            </div>
          ) : null,
        )}
      </motion.div>
    </SchoolTabsContext.Provider>
  );
}

export default Object.assign(SchoolTabs, { Tab, Indicator });
