import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useGoSuggestForm() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const handleClickGoSuggestForm = useCallback(() => {
    if (platform === 'pc') {
      router.push({ pathname: `/${Routes.SuggestForm}`, query: { entry: Routes.SuggestGuide } });
    } else {
      router.push({ pathname: `/${Routes.EntryMobile}/${Routes.SuggestForm}`, query: { entry: Routes.SuggestGuide } });
    }
  }, [platform, router]);

  return { platform, handleClickGoSuggestForm };
}
