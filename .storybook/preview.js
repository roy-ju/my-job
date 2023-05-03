import React from 'react';
import { CacheProvider } from '@emotion/react';
import GlobalStyles from '../src/styles/GlobalStyles';
import PcGlobalStyles from '../src/styles/PcGlobalStyles';
import createCache from '@emotion/cache';
import { RecoilRoot } from 'recoil';

const cache = createCache({ prepend: true, key: 'twin' });

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'white',
        value: '#FFFFFF',
      },
      {
        name: 'light',
        value: '#F4F6FA',
      },
      {
        name: 'dark',
        value: '#444',
      },
    ],
  },
  controls: { expanded: true },
};

export const decorators = [
  (Story) => (
    <CacheProvider value={cache}>
      <RecoilRoot>
        <Story />
      </RecoilRoot>
      <GlobalStyles />
      <PcGlobalStyles />
    </CacheProvider>
  ),
];
