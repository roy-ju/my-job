import getUserAppVersion from '@/apis/user/userAppVersion';
import { MobileContainer } from '@/components/atoms';
import { VersionInfo } from '@/components/templates';
import { PlatformType } from '@/constants/enums';
import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import { checkPlatformInt } from '@/utils/checkPlatformInt';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';

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
      if (response) {
        setMessage('최신버전이 아닙니다.');
      }
    }

    if (userUsedVersion && platformInt > 0) {
      getUserAppV();
    } else {
      setMessage('최신버전 입니다.');
    }
  }, [userUsedVersion, platformInt]);

  return (
    <MobileContainer>
      <VersionInfo onClickBack={() => router.back()} userUsedVersion={userUsedVersion} message={message} />
    </MobileContainer>
  );
});
