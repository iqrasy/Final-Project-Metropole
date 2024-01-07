import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

:root {
    --primary-100:#FFB6C1;
    --primary-200:#df99a4;
    --primary-300:#985863;
    --accent-100:#87CEEB;
    --accent-200:#1a6f89;
    --text-100:#333333;
    --text-200:#5c5c5c;
    --bg-100:#F9F6FF;
    --bg-200:#efecf5;
    --bg-300:#c6c3cc;
      
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    height: 100vh;
    background-color: var(--bg-100);
    color: var(--text-200);
  }

`;

export default GlobalStyle;
