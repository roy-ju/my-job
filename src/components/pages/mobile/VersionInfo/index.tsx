import { MobileContainer } from '@/components/atoms';
import { VersionInfo } from '@/components/templates';
import { useRouter } from 'next/router';
import { memo } from 'react';

export default memo(() => {
  const router = useRouter();

  return (
    <MobileContainer>
      <VersionInfo onClickBack={() => router.back()} />
    </MobileContainer>
  );
});
