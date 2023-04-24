import { Panel } from '@/components/atoms';
import { SuggestRegionalSuccess } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);

  return (
    <Panel width={panelWidth}>
      <SuggestRegionalSuccess onClickNext={() => router.pop()} />
    </Panel>
  );
});
