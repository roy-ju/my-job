import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { checkPlatformInt } from '@/utils/checkPlatformInt';

import { PlatformType } from '@/constants/enums';

import { apiService } from '@/services';

export default function useVersionInfo() {
  const router = useRouter();

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  const [userUsedVersion, setUserUsedVersion] = useState<string>('');
  const [platformInt, setPlatformInt] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const imgUrl = `url('https://negocio-common.s3.ap-northeast-2.amazonaws.com/appicon.png')`;

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
      const response = await apiService.userAppVersion(userUsedVersion, platformInt);

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

  return { handleClickBack, userUsedVersion, message, imgUrl };
}
