import React from 'react';

import { Global } from '@emotion/react';

import { css } from 'twin.macro';

const customStyles = css``;

export default function PcGlobalStyles() {
  return <Global styles={customStyles} />;
}
