import React from "react";
import Footer from "./FooterContent/Footer";
import Header from "./Header";
import styled from "styled-components";

// all components can have same background style without repeating styles
const Layout = ({ children }) => {
  return (
    <>
      <Container>
        <Header />
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;

const Container = styled.div`
  background: rgb(231, 230, 247);
  background: linear-gradient(
    0deg,
    rgba(231, 230, 247, 1) 0%,
    rgba(227, 227, 227, 0) 100%
  );
  height: 90.7vh;
  background-color: #eff2f1;
  height: 100vh;
  overflow: auto;
  scroll-behavior: smooth;
`;
