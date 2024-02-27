import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import { SuggestDetailResponse } from '@/services/suggests/types';

export default function useInactive({
  suggestDetailData,
}: {
  suggestDetailData: (SuggestDetailResponse & ErrorResponse) | null;
}) {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const [showInactivePopup, setShowInactivePopup] = useState(false);

  useEffect(() => {
    if (suggestDetailData && (suggestDetailData?.my_suggest === false || suggestDetailData?.error_code)) {
      setShowInactivePopup(true);
    }
  }, [suggestDetailData]);

  const inactivePopupCTA = () => {
    setShowInactivePopup(false);

    if (platform === 'pc') {
      router.replace('/');
    } else {
      router.replace(`/${Routes.EntryMobile}`);
    }
  };

  return { showInactivePopup, inactivePopupCTA };
}
