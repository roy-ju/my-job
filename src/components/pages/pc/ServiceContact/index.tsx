import { Panel } from '@/components/atoms';
import { useAuth } from '@/hooks/services';
import { memo } from 'react';
import { ServiceContact as ServiceContactTemplate } from '@/components/templates';
import useAPI_GetServiceQnaList from '@/apis/serviceqna/getServiceQnaList';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => {
  const { user } = useAuth();
  const { list, mutate } = useAPI_GetServiceQnaList();

  return (
    <Panel width={panelWidth}>
      <ServiceContactTemplate mutateQna={mutate} loggedIn={user !== null} list={list} />
    </Panel>
  );
});
