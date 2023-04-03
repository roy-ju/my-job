import { Panel } from '@/components/atoms';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import { memo } from 'react';
import { ServiceContact as ServiceContactTemplate } from '@/components/templates';

interface Props {
  depth: number;
  panelWidth?: string;
}

const mock = [
  {
    admin_message: 'string',
    admin_response_time: 'string',
    created_time: 'string',
    id: 0,
    user_id: 0,
    user_message: 'string',
  },
  {
    admin_message: 'string',
    admin_response_time: 'string',
    created_time: 'string',
    id: 1,
    user_id: 1,
    user_message: 'string',
  },
  {
    admin_message: 'string',
    admin_response_time: 'string',
    created_time: 'string',
    id: 2,
    user_id: 2,
    user_message: 'string',
  },
];

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const { user, isLoading } = useAuth();
  return (
    <Panel width={panelWidth}>
      <ServiceContactTemplate list={mock} />
    </Panel>
  );
});
