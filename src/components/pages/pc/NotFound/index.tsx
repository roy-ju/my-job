import { memo } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo((_: Props) => <div aria-label="notFound" />);
