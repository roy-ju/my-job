import { Panel } from '@/components/atoms';
// import { ListingCreateForm } from '@/components/templates';
import { memo } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => <Panel width={panelWidth}>{/* <ListingCreateForm /> */}</Panel>);
