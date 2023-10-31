import React, { memo } from 'react';

import { Container } from '@/components/container';

import PlatformProvider from '@/providers/PlatformProvider';

import { SuggestRegionalSummaryProvider } from './provider';

import { SuggestRegionalSummary } from './components/template';

type Props = { panelWidth?: string; depth?: number };

export default memo(({ panelWidth, depth }: Props) => (
  <PlatformProvider depth={depth}>
    <Container panelWidth={panelWidth} auth ciRequired>
      <SuggestRegionalSummaryProvider>
        <SuggestRegionalSummary />
      </SuggestRegionalSummaryProvider>
    </Container>
  </PlatformProvider>
));
