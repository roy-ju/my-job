import React from 'react';
import { Global } from '@emotion/react';
import { css, theme } from 'twin.macro';

const customStyles = css`
  ::-webkit-scrollbar {
    width: 4px;
    height: 5.2px;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme`colors.gray.600`};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-left: none;
    border-right: none;
  }
`;

export default function PcGlobalStyles() {
  return <Global styles={customStyles} />;
}
