import { Panel } from '@/components/atoms';
import { BiddingSuccess } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const canReceiveSuggest = router.query.canReceiveSuggest === 'true';

  const onClickNext = useCallback(() => {
    router.pop();
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <BiddingSuccess onClickNext={onClickNext} canReceiveSuggest={canReceiveSuggest} />
    </Panel>
  );
});
