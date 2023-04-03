import React from 'react';
import { Global } from '@emotion/react';
import tw, { css, GlobalStyles as BaseStyles, theme } from 'twin.macro';

const customStyles = css`
  body {
    ${tw`antialiased text-gray-1000`}
  }

  * {
    outline: none;
  }

  html,
  body,
  #__next,
  #root {
    height: 100%;
  }

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

  @media screen and (max-width: 374px) {
    html {
      // font-size: clamp(1px, 2.65vw, 10px);
    }
  }

  @media screen and (min-width: 375px) and (max-width: 428px) {
    html {
      // font-size: clamp(10px, 2.65vw, 11.3px);
    }
  }
`;

export default function GlobalStyles() {
  return (
    <>
      <BaseStyles />
      <Global styles={customStyles} />
    </>
  );
}
