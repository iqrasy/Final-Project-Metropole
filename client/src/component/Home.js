import { useState } from "react";
import styled from "styled-components";
import Travel from "./travel/Travel";
import Weather from "./Weather";
import NewMap from "./NewMap";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Home = () => {
  // states for coordinate, hotel, restaurant, & activity
  //passing them down to the map and their respective components
  const [coordinate, setCoordinate] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [resto, setResto] = useState([]);
  const [activities, setActivities] = useState([]);

  if (!hotels || !resto || !activities) {
    return (
      <Icon>
        <AiOutlineLoading3Quarters />
      </Icon>
    );
  }

  return (
    <>
      <Main>
        <TravelDiv>
          <Travel
            coordinate={coordinate}
            setCoordinate={setCoordinate}
            hotels={hotels}
            setHotels={setHotels}
            resto={resto}
            setResto={setResto}
            activities={activities}
            setActivities={setActivities}
          />
        </TravelDiv>
        <MapDiv>
          <NewMap
            coordinate={coordinate}
            hotels={hotels}
            resto={resto}
            activities={activities}
          />
        </MapDiv>
      </Main>
    </>
  );
};

export default Home;

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

const MapDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1em;
`;

const Main = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10%;
  left: 0;
`;

const TravelDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
