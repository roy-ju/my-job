import { useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import { MobileContainer } from '@/components/atoms';

import Routes from '@/router/routes';

import MyDeregister from '@/components/domains/my/MyDeregister';

import useMyDergister from '@/components/domains/my/deregister/hooks/useMyDergister';

export default function DeregisterMobile() {
  const {
    deregisterReasons,
    extraReasons,
    setDeregisterReasons,
    setExtraReasons,
    handleChangeDeregisterReasons,
    handleChangeExtraReasons,
  } = useMyDergister();

  const router = useRouter();

  const handleClickBackButton = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.MyDetail}`);
  }, [router]);

  const handleClickNext = useCallback(() => {
    router.replace({
      pathname: `/${Routes.EntryMobile}/${Routes.DeregisterDisclaimer}`,
      query: { deregisterReasons: deregisterReasons.join(','), extraReasons },
    });
  }, [deregisterReasons, extraReasons, router]);

  useEffect(() => {
    if (router.query.deregisterReasons) {
      setDeregisterReasons((router.query.deregisterReasons as string).split(','));
    }
    if (router.query.extraReasons) {
      setExtraReasons(router.query.extraReasons as string);
    }
  }, [router.query.deregisterReasons, router.query.extraReasons, setDeregisterReasons, setExtraReasons]);

  return (
    <MobileContainer>
      <MyDeregister
        extraReasons={extraReasons}
        deregisterReasons={deregisterReasons}
        onChangeExtraReasons={handleChangeExtraReasons}
        onChangeDeregisterReasons={handleChangeDeregisterReasons}
        onClickBackButton={handleClickBackButton}
        onClickNext={handleClickNext}
      />
    </MobileContainer>
  );
}
