import { isValidElement, ReactNode, useCallback, useContext, useMemo, useRef } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import useControlled from '@/hooks/useControlled';
import tw from 'twin.macro';
import getChildrenByType from '@/utils/getChildrenByType';
import { v4 } from 'uuid';
import TabsContext from './TabsContext';

const tabStyles = {
  ghost: tw`w-full`,
  outlined: tw`w-full h-10 text-b1 relative z-10 hover:bg-gray-100`,
  contained: tw`w-full rounded-lg h-9 text-b2 text-gray-700 relative z-30`,
};

const indicatorStyles = {
  ghost: tw`w-full h-full`,
  outlined: tw`w-full h-full border-b-2 border-b-gray-1000`,
  contained: tw`w-full h-full bg-white rounded-lg shadow-[0px_6px_12px_rgba(0,0,0,0.08)]`,
};

const tabsStyles = {
  ghost: tw``,
  outlined: tw`bg-white border-b border-gray-300`,
  contained: tw`p-1 bg-gray-200 rounded-lg`,
};

interface TabProps {
  value: number;
  children?: ReactNode;
}

function Tab({ value, children }: TabProps) {
  const { variant, value: currentValue, onChange } = useContext(TabsContext);

  return (
    <button type="button" onClick={() => onChange(value)} css={tabStyles[variant]}>
      <span css={[value === currentValue ? tw`font-bold text-gray-1000` : tw`text-gray-700`]}>{children}</span>
    </button>
  );
}

function Indicator({ children }: { children?: ReactNode }) {
  const { variant } = useContext(TabsContext);

  return <div css={indicatorStyles[variant]}>{children}</div>;
}

interface TabsProps {
  variant?: 'outlined' | 'contained' | 'ghost';
  value?: number;
  onChange?: (newValue: number) => void;
  children?: ReactNode;
}

function Tabs({ variant = 'outlined', value: valueProp, children, onChange }: TabsProps) {
  const layoutId = useRef(v4());

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
    <TabsContext.Provider value={context}>
      <LayoutGroup id={layoutId.current}>
        <div css={[tw`flex items-center`, tabsStyles[variant]]}>
          {tabChildren?.map((child) =>
            isValidElement(child) ? (
              <div tw="relative flex-1" key={child.key ?? child.props.value}>
                {child}
                {value === child.props.value && (
                  <motion.div layoutId="indicator" tw="absolute w-full h-full left-0 top-0 pointer-events-none z-20">
                    {indicatorChild}
                  </motion.div>
                )}
              </div>
            ) : null,
          )}
        </div>
      </LayoutGroup>
    </TabsContext.Provider>
  );
}

export default Object.assign(Tabs, { Tab, Indicator });
