import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Events, { NegocioLoginResponseEventPayload } from '@/constants/events';

interface LoginCustomEventDetail extends NegocioLoginResponseEventPayload {
  error_code: number;
  error_message: string;
  fields: {
    email: string;
    inactive_time: Date;
    social_login_type: number;
  };
}

export default function useLoginCtas({ ipAddress }: { ipAddress?: string }) {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const handleClickKakaoLogin = useCallback(() => {
    if (platform === 'pc') {
      // To do Logic
    }

    if (platform === 'mobile') {
      // To do Logic
    }
  }, [platform]);

  const handleClickAppleLogin = useCallback(() => {
    if (platform === 'pc') {
      // To do Logic
    }

    if (platform === 'mobile') {
      // To do Logic
    }
  }, [platform]);

  return { handleClickKakaoLogin, handleClickAppleLogin };
}
