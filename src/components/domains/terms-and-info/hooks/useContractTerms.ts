import { useRouter } from 'next/router';

import Routes from '@/router/routes';

import { html as buyerContractTermsHTML } from '@/assets/terms/contract_agreement/buyer';

import { html as sellerContractTermsHTML } from '@/assets/terms/contract_agreement/seller';

export default function useContractTerms() {
  const router = useRouter();

  const type = router?.query?.type ?? '';

  const html = type === 'buyer' ? buyerContractTermsHTML : sellerContractTermsHTML;

  const handleClickNavigateToListingDetail = () => {
    const depth1 = router?.query?.depth1;
    const depth2 = router?.query?.depth2;

    const query = router.query;

    delete query.depth1;
    delete query.depth2;

    if (depth1 && depth2) {
      if (depth1 === Routes.ContractTerms) {
        router.replace({
          pathname: `/${Routes.ListingDetail}/${depth2}`,
          query: { ...query, listingID: `${router.query.listingID}` },
        });
      } else {
        router.replace({
          pathname: `/${depth1}/${Routes.ListingDetail}`,
          query: { ...query, listingID: `${router.query.listingID}` },
        });
      }
    } else if (depth1 && !depth2) {
      router.replace({
        pathname: `/${Routes.ListingDetail}`,
        query: { ...query, listingID: `${router.query.listingID}` },
      });
    }
  };

  return { html, type, handleClickNavigateToListingDetail };
}
