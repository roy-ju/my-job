import '../src/styles/globals.css';
import '../src/styles/normalize.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
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
};
