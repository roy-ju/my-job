import { Accordion } from '@/components/molecules';
import { ReactNode, useCallback, useState } from 'react';
import Tooltip from '@/assets/icons/tooltip.svg';
import Popup from './Popup';

interface SectionProps {
  title?: string;
  children?: ReactNode;
  hasToolTip?: true;
}

export default function Section({ title, children, hasToolTip }: SectionProps) {
  const [isTooltipShown, setIsTooltipShown] = useState(false);

  const showTooltip = useCallback(() => setIsTooltipShown(true), []);
  const hideTooltip = useCallback(() => setIsTooltipShown(false), []);

  return (
    <Accordion defaultExpanded>
      <Accordion.Summary tw="text-b2 py-[0.5625rem] relative">
        <div tw="flex items-center gap-1.5">
          {title}
          {hasToolTip && <Tooltip onMouseEnter={showTooltip} onMouseLeave={hideTooltip} />}
        </div>
        {isTooltipShown && <Popup onClick={hideTooltip} />}
      </Accordion.Summary>
      <Accordion.Details>{children}</Accordion.Details>
    </Accordion>
  );
}
