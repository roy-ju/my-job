import React, { memo } from 'react';

import { MySuggestDetailProvider } from './provider';

import { MySuggestDetail } from './components/template';

export default memo(() => (
  <MySuggestDetailProvider>
    <MySuggestDetail />
  </MySuggestDetailProvider>
));
