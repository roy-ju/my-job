import React from 'react';

import { Global } from '@emotion/react';

import { css } from 'twin.macro';

const customStyles = css`
  overflow-y: hidden;
`;

export default function MobileGlobalStyles() {
  return <Global styles={customStyles} />;
}
