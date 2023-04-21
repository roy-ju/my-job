import { Panel } from '@/components/atoms';
import { SuggestRegionalForm } from '@/components/templates';
import { memo } from 'react';
import useSuggestRegionalForm from './useSuggestRegionalForm';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => {
  const { forms, handleClickNext } = useSuggestRegionalForm();

  return (
    <Panel width={panelWidth}>
      <SuggestRegionalForm forms={forms} onClickNext={handleClickNext} />
    </Panel>
  );
});
