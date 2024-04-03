import { memo } from 'react';

import { DanjiDetailResponse } from '@/services/danji/types';

import Name from './Name';

import Address from './Address';

import Details from './Details';

import { Container, PaddingInlineWrraper } from './SummaryWidget';

type SummaryProps = {
  danji: DanjiDetailResponse;
};

function Summary({ danji }: SummaryProps) {
  return (
    <Container>
      <PaddingInlineWrraper>
        <Name danji={danji} />
        <Address danji={danji} />
        <Details danji={danji} />
      </PaddingInlineWrraper>
    </Container>
  );
}

export default memo(Summary);
