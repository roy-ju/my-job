import { memo } from 'react';

import tw from 'twin.macro';

import Name from './Name';

import Address from './Address';

import Details from './Details';

import RecentlyTradePrice from './RecentlyTradePrice';

import { Container, PaddingInlineWrraper } from './widget/SummaryWidget';

import { CommonDanjiDetailProps } from '../types';

interface SummaryProps extends CommonDanjiDetailProps {
  isListingDetailPage?: boolean;
}

function Summary({ danji, isListingDetailPage = false }: SummaryProps) {
  return (
    <Container css={[isListingDetailPage && tw`pb-0`]}>
      <PaddingInlineWrraper>
        <Name danji={danji} />
        <Address danji={danji} />
        <Details danji={danji} />
        <RecentlyTradePrice danji={danji} />
      </PaddingInlineWrraper>
    </Container>
  );
}

export default memo(Summary);
