import React, { memo } from 'react';

import { SuggestRegionalFormProvider } from './provider';

import { SuggestRegionalFormTemplate } from './components/template';

export default memo(() => (
  <SuggestRegionalFormProvider>
    <SuggestRegionalFormTemplate />
  </SuggestRegionalFormProvider>
));
