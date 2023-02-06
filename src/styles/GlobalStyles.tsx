import React from 'react';

import { Global } from '@emotion/react';
import tw, { css, GlobalStyles as BaseStyles } from 'twin.macro';

const customStyles = css({
  body: {
    ...tw`antialiased`,
  },
  '*': {
    outline: 'none',
  },
  'html,body,#__next,#root': {
    height: '100%',
  },
});

const GlobalStyles: React.FunctionComponent = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
