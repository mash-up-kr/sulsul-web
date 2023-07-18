'use client';
import { Global, css } from '@emotion/react';

export const GlobalCSS = () => (
  <Global
    styles={css`
      @charset "utf-8";
      @font-face {
        font-family: 'Pretendard';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
          format('woff');
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: 'Pretendard';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff')
          format('woff');
        font-weight: 700;
        font-style: normal;
      }

      *,
      ::before,
      ::after {
        box-sizing: border-box;
      }
      ::before,
      ::after {
        text-decoration: inherit;
        vertical-align: inherit;
      }
      .cf:after {
        display: block;
        content: '';
        clear: both;
      }
      html {
        width: 100%;
        height: 100%;
        cursor: default;
        -moz-tab-size: 4;
        tab-size: 4;
        -webkit-tap-highlight-color: transparent;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        word-break: break-word;
      }
      body,
      button,
      dd,
      dl,
      dt,
      fieldset,
      form,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      input,
      legend,
      li,
      ol,
      p,
      select,
      table,
      td,
      textarea,
      th,
      ul {
        margin: 0;
        padding: 0;
      }
      body,
      button,
      input,
      select,
      table,
      textarea {
        font-size: 13px;
        line-height: 1.5;
        color: #101010;
        font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
          'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR',
          'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
          sans-serif;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: inherit;
        line-height: inherit;
      }
      hr {
        height: 0;
        overflow: visible;
      }
      main,
      details {
        display: block;
      }
      dl,
      ol,
      ul,
      menu {
        list-style: none;
      }
      pre,
      code,
      kbd,
      samp {
        font-family: monospace, monospace;
        font-size: 1em;
      }
      address,
      em,
      i {
        font-style: normal;
      }
      a {
        background-color: transparent;
        text-decoration: none;
        color: inherit;
      }
      a:hover {
        text-decoration: none;
      }
      abbr[title] {
        text-decoration: underline;
        text-decoration: underline dotted;
      }
      b,
      strong {
        font-weight: bolder;
      }
      small {
        font-size: 80%;
      }
      sub,
      sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
      }
      sub {
        bottom: -0.25em;
      }
      sup {
        top: -0.5em;
      }
      audio,
      canvas,
      iframe,
      img,
      svg,
      video {
        vertical-align: middle;
      }
      audio,
      video {
        display: inline-block;
      }
      img {
        vertical-align: top;
      }
      iframe,
      img,
      fieldset {
        border-style: none;
      }
      img,
      video {
        max-width: 100%;
      }
      svg:not([fill]) {
        fill: currentColor;
      }
      svg:not(:root) {
        overflow: hidden;
      }
      img[src$='.gif'],
      img[src$='.png'] {
        image-rendering: -moz-crisp-edges;
        image-rendering: -o-crisp-edges;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        -ms-interpolation-mode: nearest-neighbor;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }
      button {
        background-color: transparent;
      }
      button,
      select {
        text-transform: none;
      }
      button,
      input {
        border: 0;
        border-radius: 0;
        overflow: visible;
      }
      input:focus {
        outline: none;
      }
      button,
      [type='button'],
      [type='reset'],
      [type='submit'] {
        -webkit-appearance: button;
      }
      figure {
        margin: 0;
      }
      fieldset {
        border: 1px solid #a0a0a0;
        padding: 0.35em 0.75em 0.625em;
      }
      input {
        overflow: visible;
      }
      legend {
        color: inherit;
        display: table;
        max-width: 100%;
        white-space: normal;
      }
      progress {
        display: inline-block;
        vertical-align: baseline;
      }
      select {
        text-transform: none;
      }
      textarea {
        overflow: auto;
        resize: vertical;
      }
      [type='checkbox'],
      [type='radio'] {
        padding: 0;
      }
      [type='search'] {
        -webkit-appearance: textfield;
        outline-offset: -2px;
      }
      ::-webkit-inner-spin-button,
      ::-webkit-outer-spin-button {
        height: auto;
      }
      ::-webkit-input-placeholder {
        color: inherit;
        opacity: 0.54;
      }
      ::-webkit-search-decoration {
        -webkit-appearance: none;
      }
      ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
      }
      ::-moz-focus-inner {
        border-style: none;
        padding: 0;
      }
      :-moz-focusring {
        outline: 1px dotted ButtonText;
      }
      :-moz-ui-invalid {
        box-shadow: none;
      }
      dialog {
        background-color: #fff;
        border: solid;
        color: #000;
        display: block;
        height: -moz-fit-content;
        height: -webkit-fit-content;
        height: fit-content;
        left: 0;
        margin: auto;
        padding: 1em;
        position: absolute;
        right: 0;
        width: -moz-fit-content;
        width: -webkit-fit-content;
        width: fit-content;
      }
      dialog:not([open]) {
        display: none;
      }
      summary {
        display: list-item;
      }
      a,
      area,
      button,
      input,
      label,
      select,
      summary,
      textarea,
      [tabindex] {
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }
      [hidden] {
        display: none;
      }
      [aria-busy='true'] {
        cursor: progress;
      }
      [aria-controls] {
        cursor: pointer;
      }
      [aria-disabled='true'],
      [disabled] {
        cursor: not-allowed;
      }
      [aria-hidden='false'][hidden] {
        display: initial;
      }
      [aria-hidden='false'][hidden]:not(:focus) {
        clip: rect(0, 0, 0, 0);
        position: absolute;
      }
    `}
  />
);
