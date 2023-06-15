import { MobileContainer } from '@/components/atoms';
import { VersionInfo } from '@/components/templates';
import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';

export default memo(() => {
  const router = useRouter();

  const [userUsedVersion, setUserUsedVersion] = useState('');

  useIsomorphicLayoutEffect(() => {
    if (localStorage.getItem('negocio_native_app_version')) {
      const value = localStorage.getItem('negocio_native_app_version');

      setUserUsedVersion(value || '');
    }
  }, []);

  return (
    <MobileContainer>
      <VersionInfo onClickBack={() => router.back()} userUsedVersion={userUsedVersion} />
    </MobileContainer>
  );
});
