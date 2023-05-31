import { Panel } from '@/components/atoms';
import { DanjiRecommendationSuccess as DanjiRecommendationSuccessTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';

import React from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function DanjiRecommendationSuccess({ depth, panelWidth }: Props) {
  const router = useRouter(depth);

  const handleCTA = () => {
    router.popLast();
  };

  return (
    <Panel width={panelWidth}>
      <DanjiRecommendationSuccessTemplate handleCTA={handleCTA} />
    </Panel>
  );
}
