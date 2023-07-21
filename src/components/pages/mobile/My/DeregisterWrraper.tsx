import { MobileContainer } from '@/components/atoms';
import { Deregister } from '@/components/templates';

import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

export default function DeregisterWrraper() {
  const router = useRouter();

  const [deregisterReasons, setDeregisterReasons] = useState<string[]>([]);
  const [extraReasons, setExtraReasons] = useState('');

  const handleChangeExtraReasons = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setExtraReasons(e.target.value);
  }, []);

  const handleChangeDeregisterReasons = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target;
      if (deregisterReasons.includes(name)) {
        setDeregisterReasons(deregisterReasons.filter((reason) => reason !== name));
      } else {
        setDeregisterReasons([...deregisterReasons, name]);
      }
    },
    [deregisterReasons],
  );

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
  }, [router.query.deregisterReasons, router.query.extraReasons]);

  return (
    <MobileContainer>
      <Deregister
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