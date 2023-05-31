import { MobileContainer } from '@/components/atoms';
import { SuggestRegionalSuccess } from '@/components/templates';
import { useRouter } from 'next/router';
import { memo } from 'react';

export default memo(() => {
  const router = useRouter();

  return (
    <MobileContainer>
      <SuggestRegionalSuccess
        onClickNext={() => {
          router.back();
        }}
      />
    </MobileContainer>
  );
});
