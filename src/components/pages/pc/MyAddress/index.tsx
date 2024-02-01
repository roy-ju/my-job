import { memo, useCallback } from 'react';

import { AuthRequired, Panel } from '@/components/atoms';

import { MyAddress } from '@/components/templates';

import { useRouter } from '@/hooks/utils';

import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

import Routes from '@/router/routes';

interface Props {
  depth: number;
  panelWidth: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const handleSubmit = useCallback(
    (value: KakaoAddressAutocompleteResponseItem) => {
      router.replace(Routes.MyAddressDetail, {
        searchParams: {
          ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
          ...(router?.query?.suggestID ? { suggestID: router.query.suggestID as string } : {}),
        },
        state: {
          addressData: JSON.stringify(value),
          ...(router.query.origin
            ? {
                origin: router.query.origin as string,
              }
            : {}),
        },
        persistParams: true,
      });
    },
    [router],
  );

  const handleClickBack = useCallback(() => {
    if (router?.query?.redirect && typeof router.query.redirect === 'string') {
      router.replace(router.query.redirect, {
        searchParams: {
          ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
          ...(router?.query?.suggestID ? { suggestID: router.query.suggestID as string } : {}),
        },
      });
    }
  }, [router]);

  return (
    <AuthRequired ciRequired depth={depth}>
      <Panel width={panelWidth}>
        <MyAddress onSubmit={handleSubmit} onClickBack={router.query.redirect ? handleClickBack : undefined} />
      </Panel>
    </AuthRequired>
  );
});
