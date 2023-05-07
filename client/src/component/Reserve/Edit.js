import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const Edit = () => {
  // grabs selected reservation through params
  const { reservation } = useParams();
  const location = useLocation();
  //useState hook used to set newReservation initially to location.state.
  const [newReservation, setNewReservation] = useState(location.state);
  const [message, setMessage] = useState(null);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  // async function that sends a PATCH request to update specific areas of the reservation which is stored in the newReservation state
  const handleSubmit = async (e) => {
    // prevents form from submitting
    e.preventDefault();

    try {
      const response = await fetch(`/api/update/${reservation}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReservation),
      });
      if (response.ok) {
        const data = await response.json();
        setNewReservation(data.newReservation);
        setMessage(data.message);

        // after 3sec, user is redirected
        setTimeout(() => {
          navigate(`/account/${email}`);
        }, 3000);
      } else {
        const error = await response.json();
        console.log(error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!location.state) {
    navigate(`/account/${email}`);
    return null;
  }

  const handleForm = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setNewReservation({
      ...newReservation,
      [key]: value,
    });
  };

  // if user cancels then they're relocated to their account page
  const handleCancel = () => {
    navigate(`/account/${email}`);
  };

  return (
    <>
      <FormWrapper>
        {newReservation && (
          <Forms onSubmit={(e) => handleSubmit(e, newReservation)}>
            <p>Select a field to edit previous reservation</p>
            <InputContainer>
              <label htmlFor="name">First Name:</label>
              <input
                type="text"
                placeholder="First Name"
                name={"givenName"}
                value={newReservation?.givenName || ""}
                onChange={handleForm}
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor="Last Name">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                name={"surName"}
                value={newReservation?.surName || ""}
                onChange={handleForm}
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                placeholder="Email"
                name={"email"}
                value={newReservation?.email || ""}
                onChange={handleForm}
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor="Phone Number">Phone Number</label>
              <input
                type="number"
                placeholder="Phone Number"
                name={"number"}
                value={newReservation?.number || ""}
                onChange={handleForm}
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor="guests">Number of guests:</label>
              <Select
                name={"people"}
                value={newReservation?.people || ""}
                required={true}
                onChange={handleForm}
              >
                <option value="" disabled>
                  Guests
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Select>
            </InputContainer>
            <Submit type="submit">Save changes</Submit>
            <Submit type="cancel" onClick={handleCancel}>
              Cancel
            </Submit>
          </Forms>
        )}
        <Message> {message && <p>{message}...</p>}</Message>
      </FormWrapper>
    </>
  );
};

export default Edit;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  margin: auto 0px auto;

  /* @media only screen and (max-width: 768px) {
    height: 80vh;
  } */
`;

const Forms = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1em 5em;
  border: 0.1em solid #ccc;
  border-radius: 1em;

  p {
    font-family: "Oswald", sans-serif;
    width: 10em;
    text-align: center;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  input {
    padding: 0.7em;
    margin-bottom: 0.7em;
    border: none;
    border-radius: 0.5em;
    box-shadow: inset 0 0 5px #ddd;
    font-size: 14px;
    align-items: flex-end;

    &:focus {
      outline: none;
      border: none;
    }
  }

  label {
    font-size: 1rem;
    margin: 0.5rem;
    font-family: "Oswald", sans-serif;
  }
`;

const Submit = styled.button`
  width: 11em;
  border-radius: 0.5em;
  padding: 0.3em;
  margin: 0.2em;
  background: #e3e3e3;
  color: #020300;
  cursor: pointer;
  border: 0.01rem solid lightgrey;

  &:hover {
    background-color: #610f7f;
    color: #e3e3e3;
  }
`;

const Select = styled.select`
  padding: 0.3em;
  margin-bottom: 0.7em;
  border: none;
  border-radius: 0.5em;
  box-shadow: inset 0 0 5px #ddd;
  font-size: 14px;
  width: 19.2vh;

  &:focus {
    outline: none;
  }
`;

const Message = styled.div`
  font-family: "Oswald", sans-serif;
  font-size: 1.2em;
`;
