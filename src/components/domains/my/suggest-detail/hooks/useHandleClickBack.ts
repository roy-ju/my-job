import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import Routes from '@/router/routes';

export default function useHandleClickBack({ depth }: { depth?: number }) {
  const { platform } = useCheckPlatform();

  const customRouter = useCustomRouter(depth);

  const router = useRouter();

  const renderBackUICondition = platform === 'mobile' ? true : router.query.entry === 'my' ? true : !!router.query.back;

  const handleClickBack = () => {
    if (platform === 'pc') {
      if (router.query.back) {
        router.replace(router.query.back as string);
      } else {
        customRouter.replace(Routes.SuggestRequestedList);
      }
    } else if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace(`/${Routes.EntryMobile}/${Routes.SuggestRequestedList}`);
      }
    }
  };

  return { renderBackUICondition, handleClickBack };
}
