import { ClosablePanel } from '@/components/molecules';
import { Developer as DeveloperTemplate } from '@/components/templates';
import Keys from '@/constants/storage_keys';
import { useLocalStorage } from '@/hooks/utils';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const [jwt, setJwt] = useLocalStorage(Keys.ACCESS_TOKEN, '');
  // const [jwt, setJwt] = useSearchParams<string>('jwt');

  const handleChangeJwt = useCallback(
    (newValue: string) => {
      setJwt(newValue);
    },
    [setJwt],
  );

  return (
    <ClosablePanel width={panelWidth} closable={depth === 2}>
      <DeveloperTemplate jwt={jwt ?? ''} onChangeJwt={handleChangeJwt} />
    </ClosablePanel>
  );
});
