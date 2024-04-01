import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { mutate } from 'swr';

import { toast } from 'react-toastify';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import Keys from '@/constants/storage_keys';

import { apiService } from '@/services';

export default function useCtasHandler({ reasons, updateStep }: { reasons: string; updateStep: (v: number) => void }) {
  const [popup, setPopup] = useState<'' | 'success' | 'confirm'>('');

  const router = useRouter();

  const { platform } = useCheckPlatform();

  const stepOneCta = useCallback(() => {
    if (platform === 'pc') {
      updateStep(2);
    }

    if (platform === 'mobile') {
      updateStep(2);
    }
  }, [platform, updateStep]);

  const stepTwoCta = useCallback(async () => {
    setPopup('confirm');
  }, []);

  const handleConfirmPopup = useCallback(() => {
    setPopup('success');
  }, []);

  const handleClosePopup = useCallback(() => {
    setPopup('');
  }, []);

  const handleDeregister = useCallback(async () => {
    const fcmToken = localStorage.getItem(Keys.FCM_TOKEN);

    if (fcmToken) {
      await apiService.deleteFcmToken({ token: fcmToken });
    }

    const deregistered = await apiService.deregister(reasons);

    localStorage.removeItem(Keys.ACCESS_TOKEN);

    localStorage.removeItem(Keys.REFRESH_TOKEN);

    if (deregistered) {
      await mutate(() => true, undefined);
      await router.replace(platform === 'pc' ? `/` : `${Routes.EntryMobile}`);
    } else {
      toast.error('회원탈퇴에 실패했습니다.');
    }
  }, [platform, reasons, router]);

  return { popup, stepOneCta, stepTwoCta, handleDeregister, handleConfirmPopup, handleClosePopup };
}
