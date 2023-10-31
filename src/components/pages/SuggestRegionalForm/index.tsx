import React, { memo } from 'react';

import { Container } from '@/components/container';

import PlatformProvider from '@/providers/PlatformProvider';

import { SuggestRegionalFormProvider } from './provider';

import { SuggestRegionalFormTemplate } from './components/template';

type Props = { panelWidth?: string; depth?: number };

export default memo(({ panelWidth, depth }: Props) => (
  <PlatformProvider depth={depth}>
    <Container panelWidth={panelWidth}>
      <SuggestRegionalFormProvider>
        <SuggestRegionalFormTemplate />
      </SuggestRegionalFormProvider>
    </Container>
  </PlatformProvider>
));
