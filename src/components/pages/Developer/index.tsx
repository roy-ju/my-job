import { ClosablePanel } from '@/components/molecules';
import { Developer as DeveloperTemplate } from '@/components/templates';
import Keys from '@/constants/storage_keys';
import { useAuth } from '@/hooks/services';
import { useLocalStorage } from '@/hooks/utils';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
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
    <ClosablePanel width={panelWidth} closable={depth === 2}>
      <DeveloperTemplate defaultJwt={jwt} onApplyChangeJwt={handleApplyChangeJwt} />
    </ClosablePanel>
  );
});
