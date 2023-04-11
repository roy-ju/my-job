import { Accordion } from '@/components/molecules';
import { ReactNode } from 'react';
import Tooltip from '@/assets/icons/tooltip.svg';
// import Popup from './Popup';

interface SectionProps {
  title?: string;
  children?: ReactNode;
  hasToolTip?: true;
  defaultExpanded?: boolean;
}

export default function Section({ title, children, hasToolTip, defaultExpanded }: SectionProps) {
  // const [isTooltipShown, setIsTooltipShown] = useState(false);

  // const showTooltip = useCallback(() => setIsTooltipShown(true), []);
  // const hideTooltip = useCallback(() => setIsTooltipShown(false), []);

  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <Accordion.Summary tw="text-b2 py-[0.5625rem] relative">
        <div tw="flex items-center gap-1.5">
          {title}
          {hasToolTip && <Tooltip />}
        </div>
        {/* {isTooltipShown && <Popup />} */}
      </Accordion.Summary>
      <Accordion.Details>{children}</Accordion.Details>
    </Accordion>
  );
}
