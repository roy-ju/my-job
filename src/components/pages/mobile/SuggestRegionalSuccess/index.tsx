import { MobileContainer } from '@/components/atoms';
import { SuggestRegionalSuccess } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo } from 'react';

export default memo(() => {
  const router = useRouter();

  return (
    <MobileContainer>
      <SuggestRegionalSuccess
        onClickNext={() => {
          router.replace(`/${Routes.EntryMobile}`);
        }}
      />
    </MobileContainer>
  );
});
