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
  font-size: 1.1rem;
  background-color: #e3e3e3;
  border: none;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #dedede;
    border-radius: 25px;
  }
`;
