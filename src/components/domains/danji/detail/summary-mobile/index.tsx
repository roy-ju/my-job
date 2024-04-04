import { memo } from 'react';

import Name from './Name';

import Address from './Address';

import Details from './Details';

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
