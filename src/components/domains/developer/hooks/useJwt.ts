import { useMemo, useState, useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useAuth from '@/hooks/services/useAuth';

import useFetchGetJwtList from '@/services/test/useFetchJwtList';

import Keys from '@/constants/storage_keys';

import Routes from '@/router/routes';

export default function useJwt() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const { user, login, mutate: mutateUser } = useAuth();

  const { data } = useFetchGetJwtList();

  const jwtList = useMemo(() => data ?? [], [data]);

  const jwtOwners = useMemo(() => jwtList.map((item) => item.nickname), [jwtList]);

  const [jwtOwner, setJwtOwner] = useState('');

  const handleChangeJwtOwner = useCallback(
    (newValue: string) => {
      if (platform === 'pc') {
        setJwtOwner(newValue);

        localStorage.setItem(
          Keys.ACCESS_TOKEN,
          JSON.stringify(jwtList.find((item) => item.nickname === newValue)?.jwt ?? ''),
        );

        mutateUser();
      }

      if (platform === 'mobile') {
        setJwtOwner(newValue);

        login(jwtList.find((item) => item.nickname === newValue)?.jwt ?? '', '');

        setTimeout(() => {
          router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
        }, 300);
      }
    },
    [jwtList, login, mutateUser, platform, router],
  );

  return { name: user?.name ?? '', nickname: user?.nickname ?? '', jwtOwners, jwtOwner, handleChangeJwtOwner };
}
