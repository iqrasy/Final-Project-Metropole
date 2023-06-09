import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = () => {
  // states that manage the form, selected option, navigate, and query for hotel, restaurant, activity
  const [form, setForm] = useState({});
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleForm = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    //calls the setForm function to update the state of the form
    setForm({
      ...form,
      //[key]: value syntax is used to update the value of the property with the key variable to the value variable
      [key]: value,
    });
  };

  const handleSubmit = (e, form) => {
    // prevents form from submitting
    e.preventDefault();

    const params = [];
    // loops through each entry in the query and adds it to the params array
    for (let entry of query.entries()) {
      params.push(entry);
    }

    let endpoint;
    let body = {
      givenName: form.givenName,
      surName: form.surName,
      email: form.email,
      number: form.number,
      people: form.people,
    };

    // checks if first parameter in params array is equal to "hotel", "restaurant", or "activity"
    // if it is, it sets the "endpoint" to the appropriate endpoint
    // body object is updated to include hotel, restaurant, or activity based on the parameter from the params array
    if (params[0][1] === "hotel") {
      endpoint = "/api/hotelres";
      body.hotel = params[1][1];
    }

    if (params[0][1] === "restaurant") {
      endpoint = "/api/restores";
      body.restaurant = params[1][1];
    }

    if (params[0][1] === "activity") {
      endpoint = "/api/attractionres";
      body.attraction = params[1][1];
    }

    // POST request to "endpoint" URL with the body object
    fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((resSelect) => {
        setSelected(resSelect);
        localStorage.setItem("reservationId", resSelect.data.reservationId);
        localStorage.setItem("email", resSelect.data.email);
        const userEmail = localStorage.getItem("email");
        if (userEmail !== resSelect.data.email) {
          setErrorMessage("Email does not match the one we have on file");
          throw new Error("Email does not match");
        }
        navigate(`/reservation/${resSelect.data.reservationId}`);
      })
      .catch((error) => {
        console.log("there has been an error", error);
        setErrorMessage("Email does not match the one we have on file");
      });
  };

  // form for creating a reservation
  return (
    <>
      <FormWrapper>
        <Forms onSubmit={(e) => handleSubmit(e, form)}>
          <div>
            <div>
              <Input
                type="text"
                placeholder="First Name"
                value={form.givenName}
                name={"givenName"}
                required={true}
                onChange={handleForm}
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Last Name"
                value={form.surName}
                name={"surName"}
                required={true}
                onChange={handleForm}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={form.email}
                name={"email"}
                required={true}
                onChange={handleForm}
              />
              {/* <Error>{errorMessage && <p>{errorMessage}</p>}</Error> */}
            </div>
            <div>
              <Input
                type="number"
                placeholder="Phone Number"
                value={form.number}
                name={"number"}
                required={true}
                onChange={handleForm}
              />
            </div>
            <StyledDatePicker
              selected={selectedDate}
              value={form.date}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
            />
            <div>
              <Select
                name={"people"}
                value={form.people}
                required={true}
                onChange={handleForm}
              >
                <option value="" disabled selected>
                  Guests
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Select>
            </div>
            <Submit type="submit">Submit</Submit>
          </div>
        </Forms>
      </FormWrapper>
    </>
  );
};

export default Form;

const StyledDatePicker = styled(DatePicker)`
  padding: 0.7em;
  margin-bottom: 0.7em;
  border: none;
  border-radius: 0.5em;
  box-shadow: inset 0 0 5px #ddd;
  font-size: 14px;

  &:focus {
    outline: none;
    border: none;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90.7vh;
  margin: auto 0px auto;
`;

const Forms = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2em;
  border: 0.1em solid #ccc;
  border-radius: 1em;
`;

const Input = styled.input`
  padding: 0.7em;
  margin-bottom: 0.7em;
  border: none;
  border-radius: 0.5em;
  box-shadow: inset 0 0 5px #ddd;
  font-size: 14px;

  &:focus {
    outline: none;
    border: none;
  }
`;

const Submit = styled.button`
  width: 11em;
  border-radius: 0.5em;
  padding: 0.3em;
  cursor: pointer;
  border: 0.01rem solid lightgrey;
  background-color: #610f7f;
  color: #e3e3e3;
`;

const Select = styled.select`
  padding: 0.7em;
  margin-bottom: 0.7em;
  border: none;
  border-radius: 0.5em;
  box-shadow: inset 0 0 5px #ddd;
  font-size: 14px;
  width: 19.2vh;

  &:focus {
    outline: none;
    border: none;
  }
`;

const Error = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: #d62828;
  width: 9em;

  p {
    font-family: "Montserrat", sans-serif;
    font-size: 0.7em;
  }
`;
