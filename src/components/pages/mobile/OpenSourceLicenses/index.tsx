import { MobileContainer } from '@/components/atoms';
import { OpenSourceLicenses } from '@/components/templates';
import { useRouter } from 'next/router';
import { memo } from 'react';

export default memo(() => {
  const router = useRouter();
  return (
    <MobileContainer>
      <OpenSourceLicenses onClickBack={() => router.back()} />
    </MobileContainer>
  );
});
