import { memo, useCallback, useEffect } from 'react';

import { Panel } from '@/components/atoms';

import { useRouter } from '@/hooks/utils';

import Routes from '@/router/routes';

import MyDeregister from '@/components/domains/my/MyDeregister';

import useMyDergister from '@/components/domains/my/deregister/hooks/useMyDergister';

interface Props {
  depth: number;
  panelWidth?: string;
}

function DeregisterPc({ depth, panelWidth }: Props) {
  const {
    deregisterReasons,
    extraReasons,
    setDeregisterReasons,
    setExtraReasons,
    handleChangeDeregisterReasons,
    handleChangeExtraReasons,
  } = useMyDergister();

  const router = useRouter(depth);

  const handleClickBackButton = useCallback(() => {
    router.replace(Routes.MyDetail);
  }, [router]);

  const handleClickNext = useCallback(() => {
    router.replace(Routes.DeregisterDisclaimer, {
      state: {
        deregisterReasons: deregisterReasons.join(','),
        extraReasons,
      },
    });
  }, [router, deregisterReasons, extraReasons]);

  useEffect(() => {
    if (router.query.deregisterReasons) {
      setDeregisterReasons((router.query.deregisterReasons as string).split(','));
    }
    if (router.query.extraReasons) {
      setExtraReasons(router.query.extraReasons as string);
    }
  }, [router.query.deregisterReasons, router.query.extraReasons, setDeregisterReasons, setExtraReasons]);

  return (
    <Panel width={panelWidth}>
      <MyDeregister
        extraReasons={extraReasons}
        deregisterReasons={deregisterReasons}
        onChangeExtraReasons={handleChangeExtraReasons}
        onChangeDeregisterReasons={handleChangeDeregisterReasons}
        onClickBackButton={handleClickBackButton}
        onClickNext={handleClickNext}
      />
    </Panel>
  );
}

export default memo(DeregisterPc);
