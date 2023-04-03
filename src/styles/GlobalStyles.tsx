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

    --toastify-font-family: Noto Sans KR, sans-serif;
    --toastify-toast-min-height: 2rem !important;
    --toastify-toast-max-height: 25rem !important;

    .Toastify__toast-container {
      width: 100%;
      font-size: 0.75rem !important;
      min-height: 2rem;

      letter-spacing: -0.2px;
      line-height: 1.5;
      padding: 0;
      width: 100%;
      padding-left: calc(100vw - 100%);
    }

    .Toastify__toast {
      width: 20.9375rem;
      padding: 0.625rem 1.25rem 0.625rem 1.5rem;
      background: rgba(80, 80, 80, 0.9);
      border-radius: 24px;
      margin: 0 auto;
      margin-top: 0.5rem;
    }

    .Toastify__toast-icon {
      margin-inline-end: 1rem;
    }

    .Toastify__toast:nth-of-type(1) {
      margin: 0 auto;
      margin-top: 1em;
    }

    .Toastify__toast-body {
      color: #ffffff;
      font-weight: 500;
      padding: 0;
      white-space: pre-wrap;
      margin: 0.25rem auto;
    }

    .Toastify__toast--success {
      background: rgba(80, 80, 80, 0.9);
    }

    .Toastify__toast--error--black {
      background: rgba(80, 80, 80, 0.9);
    }

    .Toastify__toast--error--red {
      background: rgba(255, 66, 22, 0.9);
    }

    #new_notification {
      padding: 0.625rem 1.25rem 0.625rem 1.5rem;
      background: rgba(82, 42, 255, 0.9);
    }

    #new_chat_message {
      padding: 0.625rem 1.25rem 0.625rem 1.5rem;
      background: rgba(17, 17, 17, 0.9);
    }
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

  .Toastify__toast {
    background: rgba(0, 0, 0, 0.85);
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
