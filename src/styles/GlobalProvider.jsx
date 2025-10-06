import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from './theme.js';

const GlobalStyles = createGlobalStyle`

  *, *::before, *::after { 
    box-sizing: border-box;
    font-family: ${(props) => props.theme.font.urbanist}; 
  }

  html {
    -webkit-text-size-adjust: 100%;
    font-size: 16px;
    line-height: 1.4;
    font-family: ${(props) => props.theme.font.urbanist};
    color-scheme: light dark;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100dvh;
    background: ${( props ) => props.theme.color.black[100]};
    color: ${(props) => props.theme.color.black[500]};
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  img { height: auto; }

  input, button, textarea, select {
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    outline: none;
  }

  button { cursor: pointer; }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul, ol { margin: 0; padding: 0; list-style: none; }

  h1, h2, h3, h4, h5, h6,
  p, figure, blockquote {
    margin: 0;
    font-weight: inherit;
  }

  table { border-collapse: collapse; border-spacing: 0; }

  ::selection {
    background: transparent;
    color: #fff;
  }

  :focus-visible { outline: none; outline-offset: 0; }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default function GlobalProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
