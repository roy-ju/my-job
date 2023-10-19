/* eslint-disable @typescript-eslint/no-unused-vars */
import { Panel } from '@/components/atoms';
import { RecommendGuide } from '@/components/templates';
import { useRouter } from '@/hooks/utils';

import { memo } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
  ipAddress?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);

  return (
    <Panel width={panelWidth}>
      <RecommendGuide title="매물 구해요" />
    </Panel>
  );
});
