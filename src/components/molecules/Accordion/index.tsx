import { useControlled } from '@/hooks/utils';
import { HTMLProps, ReactNode, useCallback, useContext, useMemo } from 'react';
import ChevronDown from '@/assets/icons/chevron_down_24.svg';
import ChevronDownNew from '@/assets/icons/chevron_down.svg';

import ArrowDownDeepgray from '@/assets/icons/arrow_down_deepgrey.svg';
import ArrowDownLightgray from '@/assets/icons/arrow_down_lightgrey.svg';

import tw from 'twin.macro';
import { AnimatePresence, motion } from 'framer-motion';
import AccordionContext from './AccordionContext';

interface AccordionProps extends Omit<HTMLProps<HTMLDivElement>, 'onChange'> {
  expanded?: boolean;
  onChange?: (expanded: boolean) => void;
  children?: ReactNode;
  defaultExpanded?: boolean;
}

function Accordion({ expanded: expandedProp, onChange, children, defaultExpanded = false, ...others }: AccordionProps) {
  const [expanded, setExpanded] = useControlled({ controlled: expandedProp, default: defaultExpanded });

  const handleChange = useCallback(
    (value: boolean) => {
      setExpanded(value);
      onChange?.(value);
    },
    [setExpanded, onChange],
  );

  const context = useMemo(() => ({ expanded, onChange: handleChange }), [expanded, handleChange]);

  return (
    <AccordionContext.Provider value={context}>
      <div tw="bg-white" {...others}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

const SummaryButton = tw.button`w-full flex items-center justify-between hover:bg-gray-100`;

interface AccordionSummaryProps extends Omit<HTMLProps<HTMLButtonElement>, 'type' | 'onClick'> {
  hideArrow?: boolean;
  isNewIcon?: boolean;
  isNewIconSmall?: boolean;
  isNewIconSmallV2?: boolean;
}

function AccordionSummary({
  children,
  hideArrow = false,
  isNewIcon = false,
  isNewIconSmall = false,
  isNewIconSmallV2 = false,
  ...others
}: AccordionSummaryProps) {
  const { expanded, onChange } = useContext(AccordionContext);

  return (
    <SummaryButton type="button" onClick={() => onChange?.(!expanded)} {...others}>
      <div tw="w-full">{children}</div>
      {!hideArrow && (
        <div css={[tw`transition-transform`, expanded && tw`rotate-180`]}>
          {isNewIconSmall ? (
            <ArrowDownDeepgray tw="rotate-180" />
          ) : isNewIconSmallV2 ? (
            <ArrowDownLightgray tw="rotate-180" />
          ) : isNewIcon ? (
            <ChevronDownNew />
          ) : (
            <ChevronDown />
          )}
        </div>
      )}
    </SummaryButton>
  );
}

function AccordionDetails({ children, ...others }: HTMLProps<HTMLDivElement>) {
  const { expanded } = useContext(AccordionContext);

  return (
    <AnimatePresence initial={false}>
      {expanded && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          transition={{ type: 'just' }}
          tw="overflow-hidden"
        >
          <div {...others}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Object.assign(Accordion, { Summary: AccordionSummary, Details: AccordionDetails });
