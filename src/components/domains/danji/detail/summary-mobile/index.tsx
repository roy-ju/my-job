import { memo } from 'react';

import Name from './widget/Name';

import Address from './widget/Address';

import Details from './widget/Details';

import { Container, PaddingInlineWrraper } from './widget/SummaryWidget';

import { CommonDanjiDetailProps } from '../types';

function Summary({ danji }: CommonDanjiDetailProps) {
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
