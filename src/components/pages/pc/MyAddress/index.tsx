import { AuthRequired, Panel } from '@/components/atoms';
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
      router.replace(Routes.MyAddressDetail, {
        searchParams: {
          ...(router?.query?.redirect ? { redirect: router.query.redirect as string } : {}),
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
    if (router?.query?.origin && typeof router.query.origin === 'string') {
      router.replace(router.query.origin, {
        searchParams: router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {},
        state: { origin: router.query.origin },
      });
      return;
    }

    if (router?.query?.redirect && typeof router.query.redirect === 'string') {
      router.replace(router.query.redirect, {
        searchParams: router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {},
        state: { redirect: router.query.redirect },
      });
    }
  }, [router]);

  return (
    <AuthRequired ciRequired depth={depth}>
      <Panel width={panelWidth}>
        <MyAddress
          onSubmit={handleSubmit}
          onClickBack={router.query.origin ? handleClickBack : router.query.redirect ? handleClickBack : undefined}
        />
      </Panel>
    </AuthRequired>
  );
});
