import globals from '@/styles/globals';
import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import { GlobalStyles } from 'twin.macro';

const cache = createCache({ prepend: true, key: 'twin' });

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'white',
        value: '#fffff',
      },
      {
        name: 'dark',
        value: '#1e293b',
      },
    ],
  },
  controls: { expanded: true },
};

export const decorators = [
  (Story) => (
    <CacheProvider value={cache}>
      <GlobalStyles />
      <Global styles={globals} />
      <Story />
    </CacheProvider>
  ),
];
