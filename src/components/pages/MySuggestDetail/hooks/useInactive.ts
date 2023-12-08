import { useEffect, useState } from 'react';
import { useRouter as useNextRouter } from 'next/router';
import { usePlatform } from '@/providers/PlatformProvider';
import { useRouter } from '@/hooks/utils';
import useMySuggestDetailStore from './useMySuggestDetailStore';

export default function useRedirect() {
  const platform = usePlatform();

  const value = useMySuggestDetailStore();

  const router = useRouter(platform?.depth);

  const nextRouter = useNextRouter();

  const [showInactivePopup, setShowInactivePopup] = useState(false);

  useEffect(() => {
    if (value && value.suggestDetailData?.my_suggest === false) {
      setShowInactivePopup(true);
    }
  }, [value]);

  const inactivePopupCTA = () => {
    setShowInactivePopup(false);

    if (platform?.platform === 'pc') {
      router.popAll();
    } else {
      nextRouter.replace('/');
    }
  };

  return { showInactivePopup, inactivePopupCTA };
}
