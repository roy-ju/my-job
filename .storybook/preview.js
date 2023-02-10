import globals from '@/styles/globals';
import createCache from '@emotion/cache';
import { CacheProvider, Global } from '@emotion/react';
import { GlobalStyles } from 'twin.macro';

const cache = createCache({ prepend: true, key: 'twin' });

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#fff',
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
      <GlobalStyles />
      <Global styles={globals} />
      <Story />
    </CacheProvider>
  ),
];
