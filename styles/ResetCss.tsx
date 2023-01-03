import React from 'react';
import { Global, css } from '@emotion/react';
import { ThemeProps } from './Theme';

interface Props {
  theme: ThemeProps;
}

const ResetCss: React.FC<Props> = ({ theme }) => {
  return (
    <Global
      styles={css`
        html,
        body,
        div,
        span,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        abbr,
        address,
        cite,
        code,
        del,
        dfn,
        img,
        ins,
        kbd,
        q,
        samp,
        small,
        sub,
        sup,
        var,
        b,
        i,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        caption,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        canvas,
        details,
        figcaption,
        figure,
        footer,
        header,
        hgroup,
        menu,
        nav,
        section,
        summary,
        time,
        mark,
        audio,
        video {
          margin: 0;
          padding: 0;
          border: 0;
          outline: 0;
          font-size: 16px;
          font-weight: 400;
          color: ${theme.textBasicColor1};
          font-style: normal;
          vertical-align: baseline;
          word-break: break-all;
          font-family: ${theme.defaultFontFamily} Arial, sans-serif;
        }

        body,
        html {
          width: 100%;
          min-height: 100%;
          background-color: ${theme.backgroundColor};
          font-family: ${theme.defaultFontFamily} Arial, sans-serif;
          --webkit-overflow-scrolling: touch;
          -webkit-text-size-adjust: 100%;
        }
        body {
          font-size: 16px;
          color: ${theme.textBasicColor1};
          line-height: 1;
          &::-webkit-scrollbar {
            width: 6px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: ${theme.textBasicColor2};
            border-radius: 5px;
          }
          &::-webkit-scrollbar-track {
            background-color: #282958;
          }
          &::-webkit-scrollbar-thumb:hover {
            background-color: #fff;
          }
        }
        article,
        aside,
        details,
        figcaption,
        figure,
        footer,
        header,
        hgroup,
        menu,
        nav,
        section {
          display: block;
        }
        nav ul,
        ul li {
          list-style: none;
        }
        blockquote,
        q {
          quotes: none;
        }
        blockquote:before,
        blockquote:after {
          content: '';
          content: none;
        }
        q:before,
        q:after {
          content: '';
          content: none;
        }
        a {
          margin: 0;
          padding: 0;
          font-size: 100%;
          vertical-align: baseline;
          background-color: transparent;
        }
        /* change colours to suit your needs */
        ins {
          background-color: #ff9;
          color: #000;
          text-decoration: none;
        }
        /* change colours to suit your needs */
        mark {
          background-color: #ff9;
          color: #000;
          font-style: italic;
          font-weight: bold;
        }
        del {
          text-decoration: line-through;
        }
        abbr[title],
        dfn[title] {
          border-bottom: 1px dotted;
          cursor: help;
        }
        table {
          border-collapse: collapse;
          border-spacing: 0;
        }
        hr {
          display: block;
          height: 1px;
          border: 0;
          border-top: 1px solid #ccc;
          margin: 1em 0;
          padding: 0;
        }
        input,
        select {
          vertical-align: middle;
          font-family: ${theme.defaultFontFamily} Arial, sans-serif;
        }
        a:link,
        a:visited {
          text-decoration: none;
        }
        button:focus,
        a:active,
        a:focus,
        a:hover {
          outline: none !important;
          text-decoration: none;
        }

        // option {
        //   background-color: #222 !important;
        //   color: #fff !important;
        // }
        /* button/input/option/select/textarea disabled 공통 css */
        button:disabled,
        input:disabled,
        option:disabled,
        select:disabled,
        textarea:disabled {
          cursor: not-allowed;
        }

        #__next {
          width: 100%;
          height: 100%;
        }
        button {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 16px;
          font-weight: 400;
          color: #fff;
          font-style: normal;
          vertical-align: baseline;
          background-color: transparent;
          font-family: ${theme.defaultFontFamily} Arial, sans-serif;
          cursor: pointer;
          border-radius: 0;
        }
        body.__iframe {
          background-color: #000;
        }

        input[type='password']::-ms-reveal,
        input[type='password']::-ms-clear {
          display: none;
        }
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          input[type='color'],
          input[type='date'],
          input[type='datetime'],
          input[type='datetime-local'],
          input[type='email'],
          input[type='month'],
          input[type='number'],
          input[type='password'],
          input[type='search'],
          input[type='tel'],
          input[type='text'],
          input[type='time'],
          input[type='url'],
          input[type='week'],
          select:focus,
          textarea {
            font-size: 16px;
            -webkit-appearance: none;
            border-radius: 5px;
            -webkit-border-radius: 5px;
          }
        }
        @media (max-width: ${theme.TABLET_MAX}px) {
          input {
            font-size: 16px !important;
          }
        }
        input::placeholder {
          color: ${theme.textBasicColor2};
        }
        // 브라우저 자동완성 css 제거
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          background-color: rgba(0, 0, 0, 0) !important;
          -webkit-box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0) inset !important;
          color: ${theme.textBasicColor2};
          transition: background-color 600000s 0s, color 600000s 0s;
        }
        textarea::placeholder {
          color: ${theme.textBasicColor2};
        }
      `}
    />
  );
};

export default ResetCss;