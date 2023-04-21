import { Panel } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { memo } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => (
  <Panel width={panelWidth}>
    <NavigationHeader>
      <NavigationHeader.Title>매물문의하기</NavigationHeader.Title>
    </NavigationHeader>
  </Panel>
));
