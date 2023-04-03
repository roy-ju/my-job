import { Panel } from '@/components/atoms';
import { MyAddress } from '@/components/templates';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const handleSubmit = useCallback(
    (value: KakaoAddressAutocompleteResponseItem) => {
      console.log(value);
      router.replace(Routes.MyAddressDetail);
    },
    [router],
  );

  return (
    <Panel width={panelWidth}>
      <MyAddress onSubmit={handleSubmit} />
    </Panel>
  );
});
