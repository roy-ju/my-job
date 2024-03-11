import { memo } from 'react';

import { Panel } from '@/components/atoms';

// import { ContractTerms as ContractTermsTemplate } from '@/components/templates';

import { html as buyerContractTermsHTML } from '@/assets/terms/contract_agreement/buyer';

import { html as sellerContractTermsHTML } from '@/assets/terms/contract_agreement/seller';

import { useRouter } from '@/hooks/utils';

import Routes from '@/router/routes';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);

  const handleClickNavigateToListingDetail = () => {
    router.replace(Routes.ListingDetail, {
      searchParams: { listingID: router.query.listingID as string },
    });
  };

  const html = router.query.type === 'buyer' ? buyerContractTermsHTML : sellerContractTermsHTML;

  return (
    <Panel width={panelWidth}>
      {/* <ContractTermsTemplate
        type={router.query.type as string}
        html={html}
        onClickNavigateToListingDetail={handleClickNavigateToListingDetail}
      /> */}
    </Panel>
  );
});
