import { MobileContainer } from '@/components/atoms';
import { MobHog as MobHogTemplate } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function MobHog() {
  const router = useRouter();

  const onClickBack = useCallback(() => {
    router.back();
  }, [router]);

  const onClickListingCreate = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.ListingSelectAddress}`);
  }, [router]);

  return (
    <MobileContainer>
      <MobHogTemplate onClickBack={onClickBack} onClickListingCreate={onClickListingCreate} />
    </MobileContainer>
  );
}
