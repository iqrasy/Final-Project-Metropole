import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Hotel from "./Hotel";
import Restaurant from "./Restaurant";
import Activities from "./Activities";
import { CiSearch } from "react-icons/ci";

const Travel = ({
  coordinate,
  setCoordinate,
  hotels,
  setHotels,
  resto,
  setResto,
  activities,
  setActivities,
}) => {
  const [selected, setSelected] = useState("");
  const [search, setSearch] = useState("");

  // conditional function that renders a specific component based on the value of the selected state
  const handleSwitch = () => {
    switch (selected) {
      case "hotel":
        return (
          <Hotel
            search={search}
            coordinate={coordinate}
            setCoordinate={setCoordinate}
            hotels={hotels}
            setHotels={setHotels}
          />
        );
      case "restaurant":
        return (
          <Restaurant
            search={search}
            coordinate={coordinate}
            setCoordinate={setCoordinate}
            resto={resto}
            setResto={setResto}
          />
        );
      case "activities":
        return (
          <Activities
            search={search}
            coordinate={coordinate}
            setCoordinate={setCoordinate}
            activities={activities}
            setActivities={setActivities}
          />
        );
      default:
        return <Default>PLEASE CHOOSE ONE</Default>;
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // sets the search state to the value of the input field, which is passed as an argument to the function.
  useEffect(() => {
    setSearch("");
  }, [selected]);

  return (
    <Div>
      <Option>
        <Button
          active={selected === "hotel" && <Hotel search={search} />}
          onClick={() => setSelected("hotel")}
        >
          HOTEL
        </Button>
        <Button
          active={selected === "restaurant" && <Restaurant search={search} />}
          onClick={() => setSelected("restaurant")}
        >
          RESTAURANT
        </Button>
        <Button
          active={selected === "activities" && <Activities search={search} />}
          onClick={() => setSelected("activities")}
        >
          ACTIVITIES
        </Button>
      </Option>
      <SearchDiv>
        {search.length === 0 && (
          <Icon>
            <CiSearch />
          </Icon>
        )}
        <SearchBar
          type="text"
          placeholder={"    search"}
          onChange={handleSearch}
          value={search}
        />
      </SearchDiv>
      {handleSwitch()}
    </Div>
  );
};

export default Travel;

const Div = styled.div`
  color: #e3e3e3;
  background-color: #e3e3e3;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 1em;
  background-size: cover;
  width: 33em;
  height: 77vh;
  overflow: hidden;
`;

const Option = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 14em;
  margin-bottom: 1em;
`;

const Button = styled.button`
  font-family: "Oswald", sans-serif;
  font-size: 0.8em;
  background-color: ${(props) => (props.active ? "#610F7F" : "transparent")};
  color: ${(props) => (props.active ? "#e3e3e3" : "#020300")};
  padding: 0.5em 0.7em;
  border: none;
  border-radius: 1.5em;
  margin: 1em;
  cursor: pointer;
  position: relative;
  left: 12em;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const SearchBar = styled.input`
  font-family: "Montserrat", sans-serif;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
  border-radius: 0.6em;
  border: none;
  width: 90%;
  padding: 0.5em;
  margin-bottom: 0.7em;

  &:focus {
    outline: none;
  }
`;

const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.span`
  position: absolute;
  left: 9em;
  color: grey;
  width: 1.5rem;
`;

const Default = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  color: #020300;
`;
