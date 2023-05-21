import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiLeftArrowAlt } from "react-icons/bi";
import { AppContext } from "../Context";

const Activities = ({ search }) => {
  const [activitySelected, setActivitySelected] = useState(null);
  const [isActivitySelected, setIsActivitySelected] = useState(false);
  const navigate = useNavigate();
  const { setZoomIn, setCoordinate, activities, setActivities } =
    useContext(AppContext);

  // POST request for attractions api
  useEffect(() => {
    fetch("/api/attractions")
      .then((res) => res.json())
      .then((resData) => {
        setActivities(resData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleActivity = (attraction) => {
    setActivitySelected(attraction);
    setIsActivitySelected(true);
    // setting the coordinates to setCoordinate
    if (attraction && attraction) {
      const { latitude, longitude } = attraction;
      setCoordinate([latitude, longitude]);
      setZoomIn(15);
    }
  };

  // able to search attractions
  const filteredActivities = activities.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      {isActivitySelected ? (
        <>
          <Link to="#" onClick={() => setIsActivitySelected(false)}>
            <BiLeftArrowAlt />
          </Link>
          <Div>
            <Info>
              <Title>
                <h2>{activitySelected.name}</h2>
                <p>{activitySelected.address}</p>
              </Title>
              {activitySelected.photo && activitySelected.photo.images && (
                <img src={activitySelected.photo.images.small.url} />
              )}
            </Info>
            <button
              onClick={() => {
                // navigates to form based on params and activity name
                navigate(`/form?type=activity&name=${activitySelected.name}`);
              }}
            >
              Book now
            </button>
          </Div>
        </>
      ) : (
        filteredActivities.map((item, id) => {
          return (
            <div key={id}>
              <Button onClick={() => handleActivity(item)}>
                <Text>
                  <p>{item.name}</p>
                </Text>
                {item.photo && item.photo.images && (
                  <div>
                    <Img src={item.photo.images.small.url} />
                  </div>
                )}
              </Button>
            </div>
          );
        })
      )}
    </Container>
  );
};

export default Activities;

const Container = styled.div`
  max-height: 510px;
  overflow-y: auto;
  border-radius: 1em;
  transition: max-height 0.5s ease-in-out;

  &::-webkit-scrollbar {
    width: 0.4em;
  }

  &::-webkit-scrollbar-track {
    border-radius: 1em;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background-color: white;
    border-radius: 1em;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  padding: 0;
  margin: 1em;
  border-radius: 0.6em;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 10em;
  height: 9em;
  border-radius: 0.7em;
  margin: 0.3em;
  float: right;
  object-fit: cover;
`;

const Text = styled.div`
  font-size: 0.8em;
  display: flex;
  margin: 0.5em;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;

  p {
    text-align: left;
    max-width: 65%;
    margin: 0.1em;
    font-size: 1.3em;
    font-family: "Oswald", sans-serif;
  }
`;

const Info = styled.div`
  img {
    width: 23vh;
    height: 23vh;
    border-radius: 0.7em;
    object-fit: cover;
    margin: 2em 1em;
  }
`;

const Title = styled.div`
  display: flex;
  float: right;
  flex-direction: column;
  width: 35%;
  margin: 7% 4% 0 0;

  p {
    font-size: 0.7em;
    float: right;
    color: grey;
    font-family: "Montserrat", sans-serif;
    line-height: 1;
  }

  h2 {
    color: #020300;
    width: 10em;
    float: right;
    line-height: 0.9;
    font-size: 1em;
    font-family: "Oswald", sans-serif;
  }
`;

const Div = styled.div`
  margin: 0.5em 1em;
  width: 28em;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  button {
    position: absolute;
    bottom: 14%;
    right: 10%;
    float: right;
    border: none;
    background-color: #610f7f;
    color: #e3e3e3;
    padding: 1.5em 4em;
    border-radius: 1.3em;
    cursor: pointer;

    &:disabled {
      background-color: white;
      color: black;
      cursor: not-allowed;
    }
  }
`;
