import { Panel } from '@/components/atoms';
import { Deregister as DeregisterTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const [deregisterReasons, setDeregisterReasons] = useState<string[]>([]);
  const [extraReasons, setExtraReasons] = useState('');

  useEffect(() => {
    if (router.query.deregisterReasons) {
      setDeregisterReasons((router.query.deregisterReasons as string).split(','));
    }
    if (router.query.extraReasons) {
      setExtraReasons(router.query.extraReasons as string);
    }
  }, [router.query.deregisterReasons, router.query.extraReasons]);

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

  const handleChangeExtraReasons = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setExtraReasons(e.target.value);
  }, []);

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

  return (
    <Panel width={panelWidth}>
      <DeregisterTemplate
        extraReasons={extraReasons}
        deregisterReasons={deregisterReasons}
        onChangeExtraReasons={handleChangeExtraReasons}
        onChangeDeregisterReasons={handleChangeDeregisterReasons}
        onClickBackButton={handleClickBackButton}
        onClickNext={handleClickNext}
      />
    </Panel>
  );
});
