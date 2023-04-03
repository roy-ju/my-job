import { Panel } from '@/components/atoms';
import { MyAddressVerifying } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback, useEffect } from 'react';

interface Props {
  depth: number;
  panelWidth: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const handleGoBack = useCallback(() => {
    router.replace(Routes.MyAddressDetail, {
      state: {
        addressData: router.query.addressData as string,
      },
    });
  }, [router]);

  useEffect(() => {
    const { addressData: inAddressData, dong, ho } = router.query;
    if (!inAddressData || !dong || !ho) {
      router.replace(Routes.MyAddress);
    }
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <MyAddressVerifying onClickBack={handleGoBack} />
    </Panel>
  );
});
