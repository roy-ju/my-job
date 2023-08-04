import React from 'react';
import { Global } from '@emotion/react';
import tw, { css, GlobalStyles as BaseStyles, theme } from 'twin.macro';
import toastifyStyles from '@/lib/react-toastify/styles';
import datepickerStyles from '@/lib/react-datepicker/styles';
import nprogressStyles from '@/lib/nprogress/styles';

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
    overflow: hidden;
  }

  body {
    overscroll-behavior: contain;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
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

  #lawQnaAnswer {
    color: #7048e8;
    font-weight: 700;
    display: inline-block;
  }

  .negocioChatWrraper {
    img {
      width: 100%;
      height: 100%;
      max-width: 112px;
      min-height: 134.4px;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  .lawQnaWrraper {
    ol {
      list-style: decimal;
      padding-left: 30px;
    }
    ul {
      list-style: disc;
      padding-left: 30px;
    }
  }
`;

export default function GlobalStyles() {
  return (
    <>
      <BaseStyles />
      <Global styles={[customStyles, toastifyStyles, datepickerStyles, nprogressStyles]} />
    </>
  );
}
