import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

const Delete = () => {
  const email = localStorage.getItem("email");
  const location = useLocation();
  //useState hook used to set deleteRes initially to location.state.
  const [deleteRes, setDeleteRes] = useState(location.state);
  const [message, setMessage] = useState(null);
  const { reservation } = useParams();
  const navigate = useNavigate();

  // async function that sends a PUT request to deleted a reservation which is stored in the newReserdeleteResvation state
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/delete-reservation/${reservation}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteRes),
      });
      const data = await response.json();
      setDeleteRes(data.deleteRes);
      setMessage(data.message);

      // after 3sec, user is redirected
      setTimeout(() => {
        navigate(`/account/${email}`);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  // if user cancels then they're relocated to their account page
  const handleCancel = () => {
    navigate(`/account/${email}`);
  };

  return (
    <Div>
      {deleteRes && <p>Are you sure you want to delete this reservation?</p>}
      {deleteRes && (
        <>
          <button onClick={handleDelete}>delete</button>
          <button type="cancel" onClick={handleCancel}>
            cancel
          </button>
        </>
      )}
      {message && <p>{message}...</p>}
    </Div>
  );
};

export default Delete;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10em auto;
  font-family: "Oswald", sans-serif;
  font-size: 1.1em;
  width: 20em;
  padding: 3em;

  button {
    font-family: "Montserrat", sans-serif;
    margin: 0.2em;
    width: 7em;
    border-radius: 0.5em;
    padding: 0.3em;
    background-color: #e3e3e3;
    color: #610f7f;
    cursor: pointer;
    border: 0.01rem solid lightgrey;

    &:hover {
      background-color: #610f7f;
      color: #e3e3e3;
    }
  }
`;
