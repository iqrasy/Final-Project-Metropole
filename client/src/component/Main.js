import React from "react";
import Login from "./Login";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

// main page where user can login or sign up with auth0
// user must have an account to use the website
const Main = () => {
  return (
    <>
      <Div>
        <GlobalStyle />
        <Initial>
          <Title>WELCOME TO MÉTROPOLE</Title>
          <Button>
            <Login />
          </Button>
        </Initial>
      </Div>
      <ShapeOne></ShapeOne>
      <ShapeTwo></ShapeTwo>
    </>
  );
};

export default Main;

const Div = styled.div`
  background-color: #020300;
  height: 100vh;
  z-index: 1;
`;

const Initial = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  z-index: 10;
`;

const Title = styled.h1`
  color: #e3e3e3;
  font-family: "Montserrat", sans-serif;
  opacity: 0;
  animation: fadeIn 1s ease-out forwards;
  position: relative;
  z-index: 10;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 4;
    }
  }
`;

const Button = styled.div`
  z-index: 10;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 4;
    }
  }
`;

const ShapeOne = styled.div`
  height: 150px;
  width: 150px;
  position: absolute;
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  animation: move 10s infinite alternate;

  @keyframes move {
    0% {
      left: calc(25%);
      animation-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);
    }
    100% {
      left: calc(75%);
      animation-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);
    }
  }
`;

const ShapeTwo = styled.div`
  height: 150px;
  width: 150px;
  position: absolute;
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  border-radius: 50%;
  top: 50%;
  left: -50%;
  transform: translate(50%, -50%);
  z-index: 1;
  animation: move-reverse 10s infinite alternate;

  @keyframes move-reverse {
    0% {
      left: calc(64%);
      animation-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);
    }
    100% {
      left: calc(12%);
      animation-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
