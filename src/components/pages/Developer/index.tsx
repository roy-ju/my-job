import useAPI_GetJwtList from '@/apis/test/getJwtList';
import { Panel } from '@/components/atoms';
import { Developer as DeveloperTemplate } from '@/components/templates';
import Keys from '@/constants/storage_keys';
import { useAuth } from '@/hooks/services';
import { memo, useCallback, useMemo, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => {
  const { user, mutate: mutateUser } = useAuth();
  const { data: getJwtListResponse, mutate: mutateJwtList } = useAPI_GetJwtList();
  const jwtList = useMemo(() => getJwtListResponse ?? [], [getJwtListResponse]);
  const jwtOwners = useMemo(() => jwtList.map((item) => item.nickname), [jwtList]);

  const [jwtOwner, setJwtOwner] = useState('');

  const handleChangeJwtOwner = useCallback(
    (newValue: string) => {
      setJwtOwner(newValue);
      localStorage.setItem(
        Keys.ACCESS_TOKEN,
        JSON.stringify(jwtList.find((item) => item.nickname === newValue)?.jwt ?? ''),
      );
      mutateUser();
      mutateJwtList();
    },
    [jwtList, mutateUser, mutateJwtList],
  );

  return (
    <Panel width={panelWidth}>
      <DeveloperTemplate
        userName={user?.name ?? ''}
        userNickname={user?.nickname ?? ''}
        jwtOwner={jwtOwner}
        onChangeJwtOwner={handleChangeJwtOwner}
        jwtOwners={jwtOwners}
      />
    </Panel>
  );
});
