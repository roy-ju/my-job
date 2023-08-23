import { Panel } from '@/components/atoms';
import { ListingCreateAddress } from '@/components/templates';
import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback, useEffect } from 'react';

interface Props {
  depth: number;
  panelWidth: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const listingID = Number(router.query.listingID) ?? 0;

  const handleSubmit = useCallback(
    (value: KakaoAddressAutocompleteResponseItem) => {
      router.replace(Routes.ListingCreateUpdateAddressDetail, {
        searchParams: {
          listingID: `${listingID}`,
        },
        state: {
          addressData: JSON.stringify(value),
        },
      });
    },
    [router, listingID],
  );

  const onClickBack = useCallback(() => {
    router.replaceCurrent(Routes.ListingCreateResult, {
      persistParams: true,
    });
  }, [router]);

  useEffect(() => {
    if (!listingID) router.pop();
  }, [router, listingID]);

  return (
    <Panel width={panelWidth}>
      <ListingCreateAddress update onClickBack={onClickBack} onSubmit={handleSubmit} />
    </Panel>
  );
});
