import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Reservation = () => {
  const [confirmed, setConfirmed] = useState(null);
  const navigate = useNavigate();
  const { email } = useParams();

  // fetches reservations based on email
  useEffect(() => {
    fetch(`/api/reservations/${email}`)
      .then((res) => res.json())
      .then((resData) => {
        setConfirmed(resData.data.reservations);
        console.log(resData.data.reservations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email]);

  // if user has no reservations, the following renders
  if (confirmed && confirmed.length === 0) {
    return (
      <Default>
        <h2>YOUR BOOKINGS:</h2>
        <h3>You currently don't have any bookings.</h3>
      </Default>
    );
  }

  if (!confirmed) {
    return (
      <Icon>
        <AiOutlineLoading3Quarters />
      </Icon>
    );
  }

  return (
    <>
      <Div>
        <h2>YOUR BOOKINGS:</h2>
        <Main>
          {confirmed &&
            confirmed.map((item) => {
              let bookingInfo;
              if (item.restaurant) {
                bookingInfo = (
                  <p>
                    <span>AT:</span> {item.restaurant}
                  </p>
                );
              } else if (item.hotel) {
                bookingInfo = (
                  <p>
                    <span>AT:</span> {item.hotel}
                  </p>
                );
              } else if (item.attraction) {
                bookingInfo = (
                  <p>
                    <span>AT:</span> {item.attraction}
                  </p>
                );
              }
              return (
                <div key={item._id}>
                  <p>
                    <span>FOR:</span> {item.surName}, {item.givenName}
                  </p>
                  <p>
                    <span>EMAIL:</span> {item.email}
                  </p>
                  <p>
                    <span>#:</span> {item.number}
                  </p>
                  {bookingInfo}
                  <p>
                    <span>GUEST(S):</span> {item.people}
                  </p>
                  <p>
                    <span>CONFIRMATION #:</span> {item._id}
                  </p>
                  <Container>
                    {/* navigates to edit booking page and item is passed as state to be used in edit component */}
                    <button
                      onClick={() =>
                        navigate(`/edit/${item._id}`, { state: item })
                      }
                    >
                      edit
                    </button>
                    {/* navigates to delete booking page and item is passed as state to be used in delete component */}
                    <button
                      onClick={() => {
                        navigate(`/delete/${item._id}`, { state: item });
                      }}
                    >
                      delete
                    </button>
                  </Container>
                </div>
              );
            })}
        </Main>
      </Div>
    </>
  );
};

export default Reservation;

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

const Default = styled.div`
  font-size: 1em;
  margin-bottom: 2em;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  color: #020300;
  border: 0.05em solid #610f7f;
  padding: 1em;
  border-radius: 1em;
  position: relative;
  bottom: 90px;

  h2 {
    border-bottom: 0.05em solid #610f7f;
    margin-bottom: 2em;
  }
`;

const Div = styled.div`
  width: 25em;
  max-height: 500px;
  padding: 3em;
  overflow-y: auto;
  border-radius: 1em;
  transition: max-height 0.5s ease-in-out;

  &::-webkit-scrollbar {
    width: 0.4em;
  }

  &::-webkit-scrollbar-track {
    border-radius: 1em;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background-color: white;
    border-radius: 1em;
  }

  h2 {
    font-size: 1em;
    margin-bottom: 2em;
    text-align: center;
    font-family: "Montserrat", sans-serif;
    color: #020300;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.05em solid #610f7f;
  border-radius: 0.8em;

  div {
    background-color: #f0f0f0;
    padding: 0.5em;
    margin-bottom: 1em;
    border-radius: 0.7em;
    width: 90%;

    p {
      margin: 0.5em 0;
      padding: 2px 0;
      font-size: 0.7em;
      font-family: "Montserrat", sans-serif;
    }

    span {
      color: #020300;
      font-family: "Oswald", sans-serif;
      border-bottom: solid #610f7f 0.1em;
      padding-bottom: 0.3em;
      margin-right: 0.5em;
    }
  }
`;

const Container = styled.div`
  border: none;

  button {
    margin: 0.2em;
    width: 7em;
    border-radius: 0.5em;
    padding: 0.3em;
    background-color: #e3e3e3;
    color: #020300;
    cursor: pointer;
    border: none;

    &:hover {
      background-color: #610f7f;
      color: #e3e3e3;
    }
  }
`;
