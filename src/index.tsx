import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { reportWebVitals } from './reportWebVitals';
import { App } from './components/App';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    @media screen and (prefers-reduced-motion: reduce) {
      transition: none;
      animation: none;
    }
  }
  :root {
    font-size: 10px;
    font-family: 'Open Sans', sans-serif;

    --bg: #f3f7fa;
    --blue: #2196f3;
    --light-blue: #f1fcff;
    --text-color: #4a4a4a;
    --text-color-primary: #a0b0b9;

    @media (max-width: 500px) {
      font-size: 9px;
    }
    @media (max-width: 400px) {
      font-size: 8.5px;
    }
  }
  #root {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 50px 20px;
    align-items: flex-start;
    max-width: 780px;
    margin: 0 auto;
    padding: 50px 10px;

    @media (max-width: 800px) {
      grid-template-columns: minmax(250px, 550px);
      justify-content: center;
    }
  }
  body {
    color: var(--text-color);
    background-color: var(--bg);
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.querySelector('#root')
);

// eslint-disable-next-line no-console
reportWebVitals(console.log);
