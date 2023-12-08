import { useRouter as useNextRouter } from 'next/router';

import { usePlatform } from '@/providers/PlatformProvider';

import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';

export default function useHandleClickBack() {
  const platform = usePlatform();

  const router = useRouter(platform?.depth);

  const nextRouter = useNextRouter();

  const renderBackUICondition =
    platform?.platform === 'mobile' ? true : router.query.entry === 'my' ? true : !!router.query.back;

  const handleClickBack = () => {
    if (platform?.platform === 'pc') {
      if (router.query.back) {
        nextRouter.replace(router.query.back as string);
      } else {
        router.replace(Routes.SuggestRequestedList);
      }
    } else if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        nextRouter.back();
      } else {
        nextRouter.replace(`/${Routes.EntryMobile}/${Routes.SuggestRequestedList}`);
      }
    }
  };

  return { renderBackUICondition, handleClickBack };
}
