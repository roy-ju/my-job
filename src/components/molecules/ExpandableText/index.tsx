import { HTMLAttributes, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import tw from 'twin.macro';

import useControlled from '@/hooks/useControlled';

import ChevronDown from '@/assets/icons/chevron_down.svg';

interface ExpandableTextProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  expanded?: boolean;
  defaultExpanded?: boolean;
  onChange?: (expanded: boolean) => void;
  hideArrow?: boolean;
  color?: string;
  children: ReactNode;
}

export default function ExpandableText({
  expanded: expandedProp,
  defaultExpanded = false,
  onChange,
  hideArrow = false,
  color = 'none',
  children,
  ...others
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useControlled({ controlled: expandedProp, default: defaultExpanded });
  const [showExpandButton, setShowExpandButton] = useState(!hideArrow);
  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (ref.current.scrollHeight > ref.current.clientHeight) {
      setShowExpandButton(true);
    } else {
      setShowExpandButton(false);
    }
  }, []);

  const handleChange = useCallback(
    (value: boolean) => {
      setExpanded(value);
      onChange?.(value);
    },
    [setExpanded, onChange],
  );

  return (
    <div tw="flex justify-between gap-4 w-full text-gray-1000 text-info" {...others}>
      <p ref={ref} tw="break-all text-left flex-1" css={[expanded === false && tw`line-clamp-1`]}>
        {children}
      </p>
      {showExpandButton && (
        <button
          type="button"
          onClick={() => {
            handleChange?.(!expanded);
          }}
          tw="flex items-start"
        >
          <ChevronDown
            role="presentation"
            style={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease-in-out',
              alignSelf: 'top',
              ...(color !== 'none' ? { color } : {}),
            }}
          />
        </button>
      )}
    </div>
  );
}
