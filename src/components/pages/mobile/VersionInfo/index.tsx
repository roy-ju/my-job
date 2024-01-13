import { memo, useState } from 'react';

import { useRouter } from 'next/router';

import { MobileContainer } from '@/components/atoms';

import { VersionInfo } from '@/components/templates';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { checkPlatformInt } from '@/utils/checkPlatformInt';

import { PlatformType } from '@/constants/enums';

import getUserAppVersion from '@/apis/user/userAppVersion';

export default memo(() => {
  const router = useRouter();

  const [userUsedVersion, setUserUsedVersion] = useState<string>('');
  const [platformInt, setPlatformInt] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  useIsomorphicLayoutEffect(() => {
    if (localStorage.getItem('negocio_native_app_version')) {
      const value = localStorage.getItem('negocio_native_app_version');

      setUserUsedVersion(value || '');
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    const value = checkPlatformInt();

    if (value === PlatformType.Android || value === PlatformType.IOS) {
      setPlatformInt(value);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    async function getUserAppV() {
      const response = await getUserAppVersion(userUsedVersion, platformInt);

      if (response?.is_latest === false) {
        setMessage(`최신버전이 아닙니다.\n(최신버전 : ${response.latest_version_name})`);
        return;
      }

      if (response?.is_latest === true) {
        setMessage('최신버전 입니다.');
      }
    }

    if (userUsedVersion && platformInt > 0) {
      getUserAppV();
    } else {
      setMessage('');
    }
  }, [userUsedVersion, platformInt]);

  return (
    <MobileContainer>
      <VersionInfo onClickBack={() => router.back()} userUsedVersion={userUsedVersion} message={message} />
    </MobileContainer>
  );
});
