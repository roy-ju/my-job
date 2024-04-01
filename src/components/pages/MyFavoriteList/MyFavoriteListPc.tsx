import { memo } from 'react';

import MyFavoriteList from '@/components/domains/my/MyFavoriteList';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function MyFavoriteListPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <MyFavoriteList />
    </Panel>
  );
}

export default memo(MyFavoriteListPc);
