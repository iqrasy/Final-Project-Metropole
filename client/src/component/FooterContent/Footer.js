import styled from "styled-components";
import {
  SlSocialInstagram,
  SlSocialLinkedin,
  SlSocialFacebook,
  SlSocialTwitter,
} from "react-icons/sl";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    window.alert("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Main>
      <Div>
        <div>
          <Title>Support</Title>
          <Link to="/about">About us</Link>
          <p>Privacy Policy</p>
          <a>Cancelation</a>
          <p>Payment Options</p>
          <p>Help & FAQ</p>
        </div>
      </Div>
      <Icons>
        <SlSocialLinkedin />
        <SlSocialInstagram />
        <SlSocialFacebook />
        <SlSocialTwitter />
      </Icons>
      <Newsletter>
        <h4>Sign up for our weekly newsletter.</h4>
        <form onSubmit={handleNewsletterSubmit}>
          <Input
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <Arrow>
            <button type="submit">
              <BsArrowRightShort />
            </button>
          </Arrow>
        </form>
      </Newsletter>
    </Main>
  );
};

export default Footer;

const Main = styled.div`
  background-color: #e7e6f7;
  font-family: "Montserrat", sans-serif;
  position: relative;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 100%;
  padding: 20px;
  font-size: 13px;
  position: relative;
  left: 5%;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10%;
  padding: 15px;
  justify-content: space-between;
  font-size: 20px;
  height: 70%;
  cursor: pointer;
`;

const Title = styled.h4`
  font-size: 1.5em;
  font-weight: bolder;
`;

const Newsletter = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 70%;
  top: 50%;
`;

const Input = styled.input`
  position: absolute;
  top: 70%;
  width: 90%;
  height: 45%;
  border: none;
  border-bottom: solid black 1px;
  background-color: #e7e6f7;

  &:focus {
    outline: none;
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: 70%;
  left: 90%;
  align-items: center;
  margin-left: 10px;
  font-size: 2em;

  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
`;
