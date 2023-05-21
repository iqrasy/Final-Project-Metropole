import React, { useState } from "react";
import styled from "styled-components";
import { BsGrid } from "react-icons/bs";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import Login from "./Login";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  // keep track of menu opening and closing
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const { isAuthenticated, user } = useAuth0();

  // handle menu rotation
  const handleClick = () => {
    setIsRotated(!isRotated);
  };

  // handle menu opening/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Div>
        <Title>
          <h1>Métropole</h1>
        </Title>
        <AccountIcon
          onClick={() => {
            toggleMenu();
            handleClick();
          }}
          className={isRotated ? "rotate" : ""}
        >
          {isMenuOpen ? <BsGrid /> : <BsGrid />}
        </AccountIcon>
        <Home isOpen={isMenuOpen}>
          <Link to="/home">
            <p>Home</p>
          </Link>
          <Link to="/about">
            <p>About</p>
          </Link>
          <Link to={`/account/${user}`}>
            <p>Account</p>
          </Link>
          {isAuthenticated && (
            <p>
              <Logout />
            </p>
          )}
        </Home>
      </Div>
    </>
  );
};

const Div = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 80px;
  font-family: "Oswald", sans-serif;
  z-index: 10;
`;

const Title = styled.div`
  color: #020300;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 1em;
  margin: auto;
  top: 0.6em;
  cursor: pointer;
  font-size: 0.8rem;

  @media (max-width: 768px) {
    position: static;
    display: block;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
`;

const Home = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: 3.5em;
  right: 1em;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
  padding: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 4.5em;

  p {
    color: #020300;
    z-index: 1;
    margin: 0.5em 0;
  }

  a {
    display: flex;
    justify-content: center;
    flex-direction: row;
    text-decoration: none;
    color: #020300;
    margin-bottom: 0.5em;
    font-size: 0.9em;
    align-items: center;
    width: 5em;
  }

  @media (min-width: 769px) {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 1.8em;
    left: 7em;
    background-color: transparent;
    box-shadow: none;
    padding: 0;

    a {
      margin-left: 1em;
      margin-bottom: 0;
    }
  }
`;

const AccountIcon = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 2em;
    right: 1em;
    z-index: 10;
    border: none;
    cursor: pointer;
    color: #020300;

    svg {
      font-size: 1.5rem;
      transition: transform 0.5s ease;
    }

    &.rotate svg {
      transform: rotate(180deg);
    }
  }
`;

// const AccountIcon = styled.button`
//   display: none;

//   @media (max-width: 768px) {
//     display: block;
//     position: absolute;
//     top: 2em;
//     right: 1em;
//     z-index: 10;
//     border: none;
//     cursor: pointer;
//     color: #020300;

//     svg {
//       font-size: 1.5rem;
//       transition: transform 0.5s ease;
//     }

//     &.rotate svg {
//       transform: rotate(180deg);
//     }
//   }

//   @media (max-width: 768px) {
//     ${Home} {
//       display: ${({ isOpen }) => (isOpen ? "block" : "none")};
//       background-color: ${({ isOpen }) => (isOpen ? "red" : "none")};
//     }
//   }
// `;

// const AccountIcon = styled.button`
//   display: none;

//   @media (max-width: 768px) {
//     display: block;
//     position: absolute;
//     top: 2em;
//     right: 1em;
//     z-index: 10;
//     border: none;
//     cursor: pointer;
//     color: #020300;

//     svg {
//       font-size: 1.5rem;
//       transition: transform 0.5s ease;
//     }

//     &.rotate svg {
//       transform: rotate(180deg);
//     }
//   }
// `;

export default Header;
