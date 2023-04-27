import { AuthRequired, Panel } from '@/components/atoms';
import { ListingCreateAddress } from '@/components/templates';
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
      router.replace(Routes.ListingCreateAddressDetail, {
        state: {
          addressData: JSON.stringify(value),
        },
      });
    },
    [router],
  );

  return (
    <AuthRequired ciRequired depth={depth}>
      <Panel width={panelWidth}>
        <ListingCreateAddress onSubmit={handleSubmit} />
      </Panel>
    </AuthRequired>
  );
});
