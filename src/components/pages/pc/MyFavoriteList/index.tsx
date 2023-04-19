import { Panel } from '@/components/atoms';
import { memo } from 'react';
import { MyFavoriteList as MyFavoriteListTemplate } from '@/components/templates';

interface Props {
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => {
  const a = 1;

  return (
    <Panel width={panelWidth}>
      <MyFavoriteListTemplate />
    </Panel>
  );
});
