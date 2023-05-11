import { Panel } from '@/components/atoms';
import { Home } from '@/components/templates';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';

export default memo(() => {
  const { user } = useAuth();
  const router = useRouter(0);

  const handleClickLogin = useCallback(() => {
    router.replace(Routes.Login);
  }, [router]);

  const handleClickSuggestion = useCallback(() => {
    router.replace(Routes.SuggestRegionalForm);
  }, [router]);

  const handleClickBidding = useCallback(() => {}, []);

  const handleClickHomeRegister = useCallback(() => {
    router.replace(Routes.MyAddress);
  }, [router]);

  const handleClickListingCreate = useCallback(() => {
    router.replace(Routes.ListingCreateAddress);
  }, [router]);

  return (
    <Panel>
      <Home
        loggedIn={Boolean(user)}
        onClickLogin={handleClickLogin}
        onClickSuggestion={handleClickSuggestion}
        onClickBidding={handleClickBidding}
        onClickHomeRegister={handleClickHomeRegister}
        onClickListingCreate={handleClickListingCreate}
      />
    </Panel>
  );
});
