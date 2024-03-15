import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function useCtasHandler({
  type,
}: {
  type: '' | 'findAddressOverTen' | 'notFoundAddress' | 'serviceError';
}) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleSearchOtherAddress = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';

      const query = router.query;

      delete query.depth1;
      delete query.depth2;
      delete query.addressData;
      delete query.dong;
      delete query.ho;

      if (depth1 && depth2) {
        if (depth1 === Routes.RealestateDocumentAddressVerifyResult) {
          router.replace({
            pathname: `/${Routes.RealestateDocumentSearchAddress}/${depth2}`,
            query: {
              ...query,
            },
          });
        } else {
          router.replace({
            pathname: `/${depth1}/${Routes.RealestateDocumentSearchAddress}`,
            query: {
              ...query,
            },
          });
        }
      } else if (depth1 && !depth2) {
        router.replace({
          pathname: `/${Routes.RealestateDocumentSearchAddress}`,
          query: {
            ...query,
          },
        });
      }
    }

    if (platform === 'mobile') {
      router.replace({
        pathname: `/${Routes.EntryMobile}/${Routes.RealestateDocumentSearchAddress}`,
      });
    }
  }, [router, platform]);

  const handleClickCtasIfServiceErrorOrNotFoundAddress = useCallback(() => {
    if (type === 'serviceError') {
      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';

        const query = router.query;

        delete query.depth1;
        delete query.depth2;
        delete query.addressData;
        delete query.dong;
        delete query.ho;

        if (depth1 && depth2) {
          if (depth1 === Routes.RealestateDocumentAddressVerifyResult) {
            router.replace({
              pathname: `/${Routes.RealestateDocumentList}/${depth2}`,
              query: {
                ...query,
              },
            });
          } else {
            router.replace({
              pathname: `/${depth1}/${Routes.RealestateDocumentList}`,
              query: {
                ...query,
              },
            });
          }
        } else if (depth1 && !depth2) {
          router.replace({
            pathname: `/${Routes.RealestateDocumentList}`,
            query: {
              ...query,
            },
          });
        }
      }

      if (platform === 'mobile') {
        router.replace({
          pathname: `/${Routes.EntryMobile}/${Routes.RealestateDocumentList}`,
        });
      }
    }

    if (type === 'notFoundAddress') {
      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';

        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        if (depth1 && depth2) {
          if (depth1 === Routes.RealestateDocumentAddressVerifyResult) {
            router.replace({
              pathname: `/${Routes.RealestateDocumentAddressDetail}/${depth2}`,
              query: {
                ...query,
              },
            });
          } else {
            router.replace({
              pathname: `/${depth1}/${Routes.RealestateDocumentAddressDetail}`,
              query: {
                ...query,
              },
            });
          }
        } else if (depth1 && !depth2) {
          router.replace({
            pathname: `/${Routes.RealestateDocumentAddressDetail}`,
            query: {
              ...query,
            },
          });
        }
      }

      if (platform === 'mobile') {
        router.replace({
          pathname: `/${Routes.EntryMobile}/${Routes.RealestateDocumentAddressDetail}`,
          query: { ...router.query },
        });
      }
    }
  }, [platform, router, type]);

  return { handleSearchOtherAddress, handleClickCtasIfServiceErrorOrNotFoundAddress };
}
