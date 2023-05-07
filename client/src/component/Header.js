import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { BsGrid } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  // keep track of menu opening and closing
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  //
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // handle menu rotation
  const handleClick = () => {
    setIsRotated(!isRotated);
  };

  // handle menu opening/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const handleDocumentClick = (event) => {
  //   if (menuRef.current && !menuRef.current.contains(event.target)) {
  //     setIsMenuOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleDocumentClick);

  //   return () => {
  //     document.removeEventListener("click", handleDocumentClick);
  //   };
  // }, []);

  return (
    <>
      <Div>
        <AccountIcon
          onClick={() => {
            toggleMenu();
            handleClick();
          }}
          className={isRotated ? "rotate" : ""}
        >
          {isMenuOpen ? <BsGrid /> : <BsGrid />}
        </AccountIcon>
        {/* title that navigates to page about montreal */}
        <Title>
          <Button>
            <h1>Métropole</h1>
          </Button>
        </Title>
        {/* link to home and about */}
        <Home>
          <Link to="/home">
            <p>Home</p>
          </Link>
          <Link to="/about">
            <p>About</p>
          </Link>
        </Home>
        {isMenuOpen && (
          <Menu>
            {/* if theres a user, it navigates to users account + 
            reservations*/}
            {isAuthenticated && (
              <Link to={`/account/${user.email}`}>
                <MenuItem>Account</MenuItem>
              </Link>
            )}
            <MenuItem>Settings</MenuItem>
            <MenuItem>{isAuthenticated ? <Logout /> : null}</MenuItem>
          </Menu>
        )}
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
`;

const Button = styled.button`
  font-size: 0.8rem;
  background-color: transparent;
  border: none;
  font-family: "Oswald", sans-serif;
  color: #020300;
`;

const Home = styled.div`
  display: flex;
  flex-direction: row;

  p {
    color: #020300;
    z-index: 1;
  }

  a {
    display: flex;
    flex-direction: row;
    text-decoration: none;
    color: #020300;
    position: relative;
    top: 0.9em;
    left: 12em;
    font-size: 0.9em;
    width: 5em;
  }
`;

const AccountIcon = styled.button`
  position: absolute;
  top: 3em;
  right: 1em;
  z-index: 10;
  border: none;
  cursor: pointer;
  color: #020300;

  svg {
    font-size: 1rem;
    transition: transform 0.5s ease;
  }

  &.rotate svg {
    transform: rotate(180deg);
  }

  @media (min-width: 768px) {
    svg {
      font-size: 1.5rem;
    }
  }
`;

const Menu = styled.div`
  transition: transform 0.7s ease;
  position: absolute;
  top: 100%;
  left: 77%;
  width: 20%;
  padding: 0.7em;
  border-radius: 1em;
  background: #e3e3e3;
  font-family: "Oswald", sans-serif;

  z-index: 1;
`;

const MenuItem = styled.p`
  text-decoration: none;
  display: block;
  color: black;
  padding: 10px 0;
  text-align: center;
  text-decoration: none;
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    background: #dedede;
    border-radius: 25px;
  }
`;

export default Header;
