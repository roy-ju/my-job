import React, { memo } from 'react';

import { Container, FormContainer } from './components';

import { PlatfromProvider, SuggestRegionalFormProvider } from './provider';

type Props = { panelWidth?: string; depth?: number };

export default memo(({ panelWidth, depth }: Props) => (
  <PlatfromProvider depth={depth}>
    <SuggestRegionalFormProvider>
      <Container panelWidth={panelWidth}>
        <FormContainer />
      </Container>
    </SuggestRegionalFormProvider>
  </PlatfromProvider>
));
