import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

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
    background: rgb(231, 230, 247);
	  background: linear-gradient(
		0deg,
		rgba(231, 230, 247, 1) 0%,
		rgba(227, 227, 227, 0) 100%
	);
  }

`;

export default GlobalStyle;
