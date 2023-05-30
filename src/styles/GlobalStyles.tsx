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

  .undermaintenance-wrraper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    max-width: 960px;
    height: 100%;
    margin: 0 auto;
    background: #f3f0ff;

    @media (max-width: 480px) {
      max-width: 480px;
    }
  }

  .undermaintenance-logo {
    background: #7048e8;
    padding: 16px 20px;
    border-radius: 12px;

    @media (max-width: 480px) {
      display: none;
    }
  }

  .undermaintenance-logo-small {
    display: none;
    background: #7048e8;
    padding: 8px 12px;
    border-radius: 8px;

    @media (max-width: 480px) {
      display: block;
      padding: 8px 12px;
    }
  }

  .undermaintenance-title-wrraper {
    padding-top: 20px;

    @media (max-width: 480px) {
      padding-top: 12px;
    }
  }

  .undermaintenance-title {
    white-space: nowrap;
    letter-spacing: -0.25px;
    font-weight: 600;
    color: #5f3dc4;
    font-size: 32px;
    line-height: 46px;

    @media (max-width: 480px) {
      font-size: 24px;
      line-height: 34px;
    }
  }

  .undermaintenance-subTitle-wrraper {
    padding-top: 32px;

    @media (max-width: 480px) {
      padding-top: 20px;
    }
  }

  #undermaintenance-subTitle {
    font-size: 20px;
    font-weight: 300;
    line-height: 28px;
    color: #343a40;
    text-align: center;
    white-space: pre-wrap;
    letter-spacing: -0.4px;

    @media (max-width: 480px) {
      font-size: 14px;
      line-height: 22px;
    }
  }

  .undermaintenance-subTitle-2-wrraper {
    padding-top: 16px;

    @media (max-width: 480px) {
      padding-top: 12px;
    }
  }

  #undermaintenance-subTitle-2 {
    font-size: 20px;
    font-weight: 300;
    line-height: 28px;
    color: #343a40;
    text-align: center;
    white-space: pre-wrap;
    letter-spacing: -0.4px;

    @media (max-width: 414px) {
      font-size: 14px;
      line-height: 22px;
    }
  }

  .tg {
    border-collapse: collapse;
    border-spacing: 0;
    margin-top: 40px;

    @media (max-width: 480px) {
      margin-top: 28px;
    }
  }

  .tg th {
    min-width: 289.5px;
    width: 289.5px;
    max-width: 289.5px;
    background: #d0bfff;
    border: 1px solid #e9ecef;
    color: #5f3dc4;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    overflow: hidden;
    letter-spacing: -0.25px;
    padding: 12px 5px;
    word-break: normal;

    @media (max-width: 480px) {
      min-width: 169.5px;
      width: 169.5px;
      min-width: 169.5px;
      font-size: 14px;
      line-height: 22px;
    }
  }

  .tg td {
    min-width: 289.5px;
    width: 289.5px;
    max-width: 289.5px;
    background: white;
    border: 1px solid #e9ecef;
    color: #343a40;
    font-size: 20px;
    font-weight: 300;
    line-height: 28px;
    overflow: hidden;
    letter-spacing: -0.4px;
    padding: 12px 43px;
    word-break: normal;

    @media (max-width: 480px) {
      min-width: 169.5px;
      width: 169.5px;
      min-width: 169.5px;
      font-size: 14px;
      line-height: 22px;
      padding: 12px 20px;
    }
  }

  .tg .tg-0pky {
    border-color: #e9ecef;
    vertical-align: middle;
  }

  #right-table-head {
    border-top-right-radius: 8px;
    text-align: center;
  }

  #left-table-head {
    border-top-left-radius: 8px;
    text-align: center;
  }

  #right-table-body {
    border-bottom-right-radius: 8px;
    text-align: center;
    white-space: pre-wrap;
  }

  #left-table-body {
    border-bottom-left-radius: 8px;
    text-align: center;
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
