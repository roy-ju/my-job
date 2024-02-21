import { memo, useCallback, useEffect } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import { Panel } from '@/components/atoms';

import Routes from '@/router/routes';

import MyDeregister from '@/components/domains/my/MyDeregister';

import useMyDergister from '@/components/domains/my/deregister/hooks/useMyDergister';

interface Props {
  panelWidth?: string;
}

function DeregisterPc({ panelWidth }: Props) {
  const {
    deregisterReasons,
    extraReasons,
    setDeregisterReasons,
    setExtraReasons,
    handleChangeDeregisterReasons,
    handleChangeExtraReasons,
  } = useMyDergister();

  const nextRouter = useNextRouter();

  const handleClickBackButton = useCallback(() => {
    nextRouter.replace(`/${Routes.My}/${Routes.MyDetail}`);
  }, [nextRouter]);

  const handleClickNext = useCallback(() => {
    const depth1 = nextRouter.query.depth1;

    const query = nextRouter.query;

    delete query.depth1;
    delete query.depth2;

    nextRouter.replace({
      pathname: `/${depth1}/${Routes.DeregisterDisclaimer}`,
      query: { ...query, deregisterReasons: deregisterReasons.join(','), extraReasons },
    });
  }, [nextRouter, deregisterReasons, extraReasons]);

  useEffect(() => {
    if (nextRouter.query.deregisterReasons) {
      setDeregisterReasons((nextRouter.query.deregisterReasons as string).split(','));
    }
    if (nextRouter.query.extraReasons) {
      setExtraReasons(nextRouter.query.extraReasons as string);
    }
  }, [nextRouter.query.deregisterReasons, nextRouter.query.extraReasons, setDeregisterReasons, setExtraReasons]);

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
