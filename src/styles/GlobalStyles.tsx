import React from 'react';
import { Global } from '@emotion/react';
import tw, { css, GlobalStyles as BaseStyles } from 'twin.macro';

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
    background: #adb5bd;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: #ffffff;
    border-left: none;
    border-right: none;
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
