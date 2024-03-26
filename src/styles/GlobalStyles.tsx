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
    -webkit-tap-highlight-color: transparent; /* 탭 하이라이트 색상을 투명하게 설정 */
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

  .negocio-chat-room-scroll {
    ::-webkit-scrollbar-thumb {
      background: ${theme`colors.gray.400`};
      border-radius: 10px;
    }
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

  #negocio-trade-process-image {
    object-fit: cover;
  }

  @media (min-width: 486px) {
    #negocio-trade-process-image {
      object-fit: contain;
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

  input[type='file'] {
    -webkit-appearance: none; /* iOS의 기본 스타일링을 제거합니다 */
    appearance: none;
    border: none; /* 테두리를 제거합니다 */
    outline: none; /* 포커스시 외곽선을 제거합니다 */
    box-shadow: none; /* 그림자 효과를 제거합니다 */
  }

  @media (hover: none) {
    *:not(input, textarea) {
      //-webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }

  label {
    -webkit-tap-highlight-color: transparent; /* 탭 하이라이트 색상을 투명하게 설정 */
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
