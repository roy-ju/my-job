import { Panel } from '@/components/atoms';
import { RegisterSuccess } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useRouter as useNextRouter } from 'next/router';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const nextRouter = useNextRouter();

  const handleLeave = useCallback(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const redirect = urlSearchParams.get('redirect');

    if (redirect) {
      nextRouter.replace(redirect);
    } else {
      router.pop();
    }
  }, [nextRouter, router]);

  const navigateToVerifyCi = useCallback(() => {
    router.replace(Routes.VerifyCi, {
      persistParams: true,
      searchParams: { redirect: (router.query.redirect as string) ?? '' },
    });
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <RegisterSuccess onClickLeave={handleLeave} onClickVerifyCi={navigateToVerifyCi} />
    </Panel>
  );
});
