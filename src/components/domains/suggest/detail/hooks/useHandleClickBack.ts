import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useHandleClickBack() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const handleClickBack = () => {
    if (typeof window === 'undefined') return;

    if (platform === 'pc') {
      if (router.query.back) {
        router.replace(router.query.back as string);
      } else {
        router.back();
      }
    }

    if (platform === 'mobile') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace(`/${Routes.EntryMobile}/${Routes.SuggestRequestedList}`);
      }
    }
  };

  return { handleClickBack };
}
