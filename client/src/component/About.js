import React from "react";
import styled from "styled-components";

const About = () => {
  return (
    <Div>
      <h4>
        Welcome to our website! We are a team of passionate Montrealers who love
        our city and want to share all the amazing things it has to offer with
        you. Our goal is to provide you with the best recommendations and
        insider tips so you can experience Montreal like a local. Whether you're
        a tourist visiting for the first time or a long-time resident looking
        for something new, we've got you covered. From food and drink to culture
        and entertainment, we'll help you discover the very best of Montreal.
      </h4>
    </Div>
  );
};

export default About;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 90.7vh;
  width: 100%;
  color: #020300;

  h4 {
    font-family: "Montserrat", sans-serif;
    text-align: center;
  }
`;
