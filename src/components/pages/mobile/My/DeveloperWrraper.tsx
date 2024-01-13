import useAPI_GetJwtList from '@/apis/test/getJwtList';
import { MobileContainer } from '@/components/atoms';
import { MobDeveloper } from '@/components/templates';
import useAuth from '@/hooks/services/useAuth';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';

export default function DeveloperWrraper() {
  const { user, login } = useAuth();
  const { data: getJwtListResponse } = useAPI_GetJwtList();

  const jwtList = useMemo(() => getJwtListResponse ?? [], [getJwtListResponse]);
  const jwtOwners = useMemo(() => jwtList.map((item) => item.nickname), [jwtList]);

  const [jwtOwner, setJwtOwner] = useState('');

  const router = useRouter();

  const handleChangeJwtOwner = useCallback(
    (newValue: string) => {
      setJwtOwner(newValue);

      login(jwtList.find((item) => item.nickname === newValue)?.jwt ?? '', '');

      setTimeout(() => {
        router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
      }, 300);
    },
    [jwtList, login, router],
  );

  return (
    <MobileContainer>
      <MobDeveloper
        userName={user?.name ?? ''}
        userNickname={user?.nickname ?? ''}
        jwtOwner={jwtOwner}
        onChangeJwtOwner={handleChangeJwtOwner}
        jwtOwners={jwtOwners}
      />
    </MobileContainer>
  );
}
