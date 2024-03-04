import { useEffect } from 'react';

import router from 'next/router';

import Routes from '@/router/routes';

import { toast } from 'react-toastify';

import STATUS_CODES from '@/constants/statusCodes';

import useCheckPlatform from './useCheckPlatform';

export default function useCheckNotResource({
  error,
  message,
  asPath,
}: {
  error: any;
  message: string;
  asPath?: string;
}) {
  const { platform } = useCheckPlatform();

  useEffect(() => {
    if (error && error?.response?.status === STATUS_CODES.NOT_RESOURCE) {
      if (platform === 'pc') {
        if (asPath) {
          router.replace(`/${asPath}`);
        } else {
          router.replace('/');
        }
      }

      if (platform === 'mobile') {
        if (asPath) {
          router.replace(`/${Routes.EntryMobile}`);
        } else {
          router.replace(`/${Routes.EntryMobile}/${asPath}`);
        }
      }

      toast.error(message);
    }
  }, [asPath, error, message, platform]);
}
