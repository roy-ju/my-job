import { Panel } from '@/components/atoms';
import { MyAddressDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const handleBack = useCallback(() => {
    router.replace(Routes.MyAddress);
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <MyAddressDetail
        addressLine1="경기도 성남시 분당구 동판교로 156"
        addressLine2="삼평동, 봇들마을9단지 금호어울림 아파트"
        onSearchAnotherAddress={handleBack}
      />
    </Panel>
  );
});
