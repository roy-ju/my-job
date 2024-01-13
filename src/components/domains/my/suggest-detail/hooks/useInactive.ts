import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useMySuggestDetailStore from './useMySuggestDetailStore';

export default function useRedirect({ depth }: { depth?: number }) {
  const { platform } = useCheckPlatform();

  const value = useMySuggestDetailStore();

  const customRouter = useCustomRouter(depth);

  const router = useRouter();

  const [showInactivePopup, setShowInactivePopup] = useState(false);

  useEffect(() => {
    if (value && value.suggestDetailData?.my_suggest === false) {
      setShowInactivePopup(true);
    }
  }, [value]);

  const inactivePopupCTA = () => {
    setShowInactivePopup(false);

    if (platform === 'pc') {
      customRouter.popAll();
    } else {
      router.replace('/');
    }
  };

  return { showInactivePopup, inactivePopupCTA };
}
