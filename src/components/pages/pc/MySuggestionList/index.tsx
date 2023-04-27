import { Panel } from '@/components/atoms';
import { useRouter } from '@/hooks/utils';
import { memo } from 'react';
import { MySuggestionList as MySuggestionListTemplate } from '@/components/templates';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  return (
    <Panel width={panelWidth}>
      <MySuggestionListTemplate />
    </Panel>
  );
});
