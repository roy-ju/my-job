import { useRouter as useNextRouter } from 'next/router';
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
  const nextRouter = useNextRouter();

  const handleSubmit = useCallback(
    (value: KakaoAddressAutocompleteResponseItem) => {
      router.replace(Routes.MyAddressDetail, {
        searchParams: router?.query?.redirect ? { redirect: router.query.redirect as string } : undefined,
        state: {
          addressData: JSON.stringify(value),
          ...(router.query.origin
            ? {
                origin: router.query.origin as string,
              }
            : {}),
        },
      });
    },
    [router],
  );

  const handleClickBack = useCallback(() => {
    if (nextRouter.query.origin) {
      nextRouter.replace(nextRouter.query.origin as string);
      return;
    }

    if (nextRouter.query.redirect) {
      nextRouter.replace(nextRouter.query.redirect as string);
    }
  }, [nextRouter]);

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
