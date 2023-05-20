import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";

const Logout = () => {
  // logout through auth0
  const { logout } = useAuth0();

  return (
    <>
      <Button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </Button>
    </>
  );
};

export default Logout;

const Button = styled.button`
  font-family: "Oswald", sans-serif;
  background-color: transparent;
  border: none;
  color: black;
  font-size: 0.9em;
  width: 5em;

  &:hover {
    cursor: pointer;
  }
`;
