import { Panel } from '@/components/atoms';
import { Developer as DeveloperTemplate } from '@/components/templates';
import Keys from '@/constants/storage_keys';
import { useAuth } from '@/hooks/services';
import { useLocalStorage } from '@/hooks/utils';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => {
  const { mutateUser } = useAuth();
  const [jwt, setJwt] = useLocalStorage(Keys.ACCESS_TOKEN, '');

  const handleApplyChangeJwt = useCallback(
    (newValue: string) => {
      setJwt(newValue);
      mutateUser();
    },
    [setJwt, mutateUser],
  );

  return (
    <Panel width={panelWidth}>
      <DeveloperTemplate defaultJwt={jwt} onApplyChangeJwt={handleApplyChangeJwt} />
    </Panel>
  );
});
