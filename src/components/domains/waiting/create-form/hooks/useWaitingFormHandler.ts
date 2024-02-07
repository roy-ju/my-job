import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useInterval from '@/hooks/useInterval';

import Actions from '@/constants/actions';

import Routes from '@/router/routes';

export default function useWaitingFormHandler() {
  const [openPopup, setOpenPopup] = useState(false);

  const [remainTime, setRemainTime] = useState(2);

  const { platform } = useCheckPlatform();

  const router = useRouter();

  useInterval(() => setRemainTime((prev) => prev - 1), !openPopup ? (remainTime === 0 ? null : 1000) : null);

  const handleRouter = useCallback(() => {
    if (platform === 'pc') {
      router.push(`/${Routes.My}/${Routes.SuggestRequestedList}`);
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.SuggestRequestedList}`);
    }

    if (openPopup) {
      setOpenPopup(false);
    }
  }, [openPopup, platform, router]);

  const handleReplaceRouter = useCallback(() => {
    if (platform === 'pc') {
      router.replace(`/${Routes.My}`);
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
    }
  }, [platform, router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const suggestFormValue = window.sessionStorage.getItem(Actions.Suggest_Create_Form.key);

      if (!suggestFormValue) {
        setOpenPopup(true);
        return;
      }

      if (remainTime === 0) {
        handleRouter();
      }
    }
  }, [handleRouter, remainTime]);

  useEffect(() => {
    const routeChangeStarthandler = () => {
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(Actions.Suggest_Create_Form.key);
      }
    };

    router.events.on('routeChangeStart', routeChangeStarthandler);

    return () => {
      router.events.off('routeChangeStart', routeChangeStarthandler);
    };
  }, [router.events]);

  return { openPopup, remainTime, handleReplaceRouter };
}
