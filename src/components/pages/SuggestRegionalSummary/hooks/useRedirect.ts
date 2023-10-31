import { useEffect } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import { usePlatform } from '@/providers/PlatformProvider';

import { useRouter } from '@/hooks/utils';

import Routes from '@/router/routes';

import useSummaryForm from './useSummaryForm';

export default function useRedirect() {
  const platform = usePlatform();

  const form = useSummaryForm();

  const router = useRouter(platform?.depth);

  const nextRouter = useNextRouter();

  useEffect(() => {
    if (platform?.platform === 'pc' && !form) {
      router.pop();
    } else if (platform?.platform === 'mobile' && !form) {
      nextRouter.replace(`/${Routes.EntryMobile}/${Routes.My}`);
    }
  }, [form, nextRouter, platform?.platform, router]);
}
