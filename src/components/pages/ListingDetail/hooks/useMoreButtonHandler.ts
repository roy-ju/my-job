import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { ListingDetailResponse } from '@/services/listing/types';

import Routes from '@/router/routes';

import { VisitUserType } from '@/constants/enums';

import useCheckPlatform from '@/hooks/useCheckPlatform';

export default function useMoreButtonHandler({ data }: { data?: ListingDetailResponse & ErrorResponse }) {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickMoreItemPc = useCallback(
    (_: number, buttonTitle: string) => {
      const depth1 = router.query.depth1;
      const depth2 = router.query.depth2;

      const query = router.query;

      if (buttonTitle === '매물관리') {
        router.push({ pathname: `/${Routes.ListingDetail}/${Routes.ListingManage}`, query: { ...query } });
      } else if (buttonTitle === '신고하기') {
        router.push({ pathname: `/${Routes.ListingDetail}/${Routes.ListingReport}`, query: { ...query } });
      } else if (buttonTitle === '중개약정확인') {
        delete query.depth1;
        delete query.depth2;

        const convertedQuery = {
          ...query,
          listingID: router.query.listingID as string,
          type: data?.visit_user_type === VisitUserType.SellerGeneral ? 'seller' : 'buyer',
        };

        if (depth1 && depth2) {
          if (depth1 === Routes.ListingDetail) {
            router.replace({
              pathname: `/${Routes.ContractTerms}/${depth2}`,
              query: convertedQuery,
            });
          } else {
            router.replace({
              pathname: `/${depth1}/${Routes.ContractTerms}`,
              query: convertedQuery,
            });
          }
        } else if (depth1 && !depth2) {
          router.replace({
            pathname: `/${Routes.ContractTerms}`,
            query: convertedQuery,
          });
        }
      }
    },
    [router, data?.visit_user_type],
  );

  const handleClickMoreItemMobile = useCallback(
    (_: number, buttonTitle: string) => {
      if (buttonTitle === '매물관리') {
        router.push(`/${Routes.EntryMobile}/${Routes.ListingManage}?listingID=${router.query.listingID}`);
      } else if (buttonTitle === '신고하기') {
        router.push(`/${Routes.EntryMobile}/${Routes.ListingReport}?listingID=${router.query.listingID}`);
      } else if (buttonTitle === '중개약정확인') {
        router.push(
          {
            pathname: `/${Routes.EntryMobile}/${Routes.ContractTerms}?listingID=${router.query.listingID}`,
            query: {
              listingID: router.query.listingID as string,
              type: data?.visit_user_type === VisitUserType.SellerGeneral ? 'seller' : 'buyer',
            },
          },
          `/${Routes.EntryMobile}/${Routes.ContractTerms}?listingID=${router.query.listingID}&type=${
            data?.visit_user_type === VisitUserType.SellerGeneral ? 'seller' : 'buyer'
          }`,
        );
      }
    },
    [data?.visit_user_type, router],
  );

  return { handleClickMoreItem: platform === 'pc' ? handleClickMoreItemPc : handleClickMoreItemMobile };
}
