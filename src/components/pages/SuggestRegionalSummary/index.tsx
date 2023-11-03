import React, { memo } from 'react';

import { SuggestRegionalSummaryProvider } from './provider';

import { SuggestRegionalSummary } from './components/template';

export default memo(() => (
  <SuggestRegionalSummaryProvider>
    <SuggestRegionalSummary />
  </SuggestRegionalSummaryProvider>
));
