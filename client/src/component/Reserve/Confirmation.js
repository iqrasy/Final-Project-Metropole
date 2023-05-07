import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Confirmation = () => {
  const [confirmed, setConfirmed] = useState(null);

  // grabs reservationId from localstorage
  const reservationId = localStorage.getItem("reservationId");

  // fetches the reservation that was just made through the reservationId
  useEffect(() => {
    fetch(`/api/reservation/${reservationId}`)
      .then((res) => res.json())
      .then((resData) => {
        setConfirmed(resData.data);
        // console.log(resData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reservationId]);

  if (!confirmed) {
    return (
      <Icon>
        <AiOutlineLoading3Quarters />
      </Icon>
    );
  }

  // checks bookingInfo based on the confirmed object(info about reservation)
  // if statements check what type of booking it is an based on that renders the appropriate information
  let bookingInfo;
  if (confirmed.restaurant) {
    bookingInfo = (
      <p>
        <span>AT:</span> {confirmed.restaurant}
      </p>
    );
  } else if (confirmed.hotel) {
    bookingInfo = (
      <p>
        <span>AT:</span> {confirmed.hotel}
      </p>
    );
  } else if (confirmed.attraction) {
    bookingInfo = (
      <p>
        <span>AT:</span> {confirmed.attraction}
      </p>
    );
  }

  // booking information
  return (
    <>
      <Div>
        <h2>
          BOOKING CONFIRMED! YOU WILL RECEIVE AN EMAIL CONFIRMATION SHORTLY.
        </h2>
        <Main>
          <p>
            <span>FOR:</span> {confirmed.surName}, {confirmed.givenName}
          </p>
          <p>
            <span>#:</span> {confirmed.number}
          </p>
          {bookingInfo}
          <p>
            <span>GUEST(S):</span> {confirmed.people}
          </p>
          <p>
            <span>EMAIL:</span> {confirmed.email}
          </p>
          <p>
            <span>CONFIRMATION #:</span> {confirmed._id}
          </p>
        </Main>
      </Div>
    </>
  );
};

export default Confirmation;

const Icon = styled.div`
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90.7vh;
  background-size: cover;
  margin: 0 auto;
  color: #020300;

  h2 {
    width: 20em;
    align-items: center;
    font-size: 1.1em;
    justify-content: start;
    margin: 3em;
    font-family: "Montserrat", sans-serif;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  font-size: 0.8em;
  padding: 1em;
  margin: 0;
  border: 0.05em solid #610f7f;
  border-radius: 0.8em;

  p {
    font-family: "Montserrat", sans-serif;
    margin: 0.6em;
    padding: 2px 0;
  }

  span {
    font-family: "Oswald", sans-serif;
    color: black;
    font-weight: bolder;
    border-bottom: solid #610f7f 0.1em;
  }
`;
