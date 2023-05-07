import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiLeftArrowAlt } from "react-icons/bi";

const Restaurant = ({ search, setCoordinate, resto, setResto }) => {
  const [restoSelected, setRestoSelected] = useState(null);
  const [isRestoSelected, setIsRestoSelected] = useState(false);
  const navigate = useNavigate();

  // POST request for restaurant api
  useEffect(() => {
    fetch("/api/resto")
      .then((res) => res.json())
      .then((resData) => {
        if (search === "") {
          // if user doesnt search, setResto is set to the original data
          setResto(resData.data);
        } else {
          // able to search restaurants
          const filteredResto = resData.data.filter((restaurant) => {
            const name = restaurant?.name?.toLowerCase();
            return name && name.includes(search?.toLowerCase() || "");
          });
          // setResto to the filtered data if user searches
          setResto(filteredResto);
        }
      })
      .catch((error) => console.log(error));
  }, [search]);

  const handleResto = (restaurant) => {
    setRestoSelected(restaurant);
    setIsRestoSelected(true);

    // setting the coordinates to setCoordinate
    if (restaurant && restaurant.latitude && restaurant.longitude) {
      const { latitude, longitude } = restaurant;
      setCoordinate([latitude, longitude]);
    }
  };

  return (
    <Container>
      {/* if user clicks on a button, this part of the code renders */}
      {isRestoSelected ? (
        <>
          {/* link on icon that takes you back to list of all activites instead of clicking on something else to see the list again */}
          <Link to="#" onClick={() => setIsRestoSelected(false)}>
            <BiLeftArrowAlt />
          </Link>
          <Div>
            <Info>
              <Title>
                <p>{restoSelected.address}</p>
                <p>{restoSelected.phone}</p>
                <p>{restoSelected.email}</p>
                <a href={restoSelected.website} target="_blank">
                  {restoSelected.website}
                </a>
              </Title>
              {restoSelected.photo && restoSelected.photo.images && (
                <Main>
                  <img src={restoSelected.photo.images.medium.url} />
                  <p>{restoSelected.description}</p>
                  <h2>{restoSelected.name}</h2>
                </Main>
              )}
            </Info>
            <button
              // navigates to form based on params and restaurant name
              onClick={() => {
                navigate(`/form?type=restaurant&name=${restoSelected.name}`);
              }}
            >
              Book now
            </button>
          </Div>
        </>
      ) : (
        resto &&
        resto.map((item, id) => {
          {
            /* if user doesnt click on a button, this part of the code renders */
          }
          return (
            <div key={id}>
              <Button onClick={() => handleResto(item)}>
                <Text>
                  <Name>{item.name}</Name>
                  {item.dietary_restrictions && (
                    <Diet>
                      {item.dietary_restrictions.map((diet) => {
                        return (
                          <div key={diet.key}>
                            <p>• {diet.name}</p>
                          </div>
                        );
                      })}
                    </Diet>
                  )}
                  <p>{item.price_level}</p>
                  <p>{item.rating}</p>
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

export default Restaurant;

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
`;

const Name = styled.p`
  text-align: left;
  max-width: 45%;
  margin: 0.1em;
  font-size: 1.3em;
  font-family: "Oswald", sans-serif;
`;

const Diet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  line-height: 0.2;
  margin: 1em 0em;
  font-family: "Montserrat", sans-serif;
`;

const Div = styled.div`
  margin: 1em;
  width: 30em;
  position: relative;
  bottom: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  p {
    font-size: 0.9em;
    float: right;
    color: black;
    font-family: "Quicksand", sans-serif;
    line-height: 1.5;
  }

  button {
    position: absolute;
    bottom: 40%;
    right: 5em;
    bottom: 16em;
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

const Title = styled.div`
  margin-left: 2em;
  display: flex;
  position: absolute;
  top: 3em;
  left: 20em;
  flex-direction: column;
  width: 50%;
  font-size: 0.7em;
  color: grey;
  line-height: 0.1em;

  p {
    font-family: "Montserrat", sans-serif;
    margin: 0;
    margin-bottom: 0.3em;
    margin-top: 1em;
  }

  a {
    color: grey;

    &:visited {
      color: grey;
    }
  }
`;

const Info = styled.div`
  width: 100%;

  img {
    width: 13em;
    height: 13em;
    border-radius: 0.7em;
    object-fit: cover;
    margin: 2em 1em;
  }
`;

const Main = styled.div`
  display: flex;
  position: relative;
  height: 60vh;

  p {
    position: absolute;
    top: 18em;
    width: 30em;
    margin-left: 0.5em;
    font-size: 0.8em;
    margin-top: 2.5em;
    font-family: "Montserrat", sans-serif;
  }

  h2 {
    margin-bottom: 5em;
    position: absolute;
    top: 0;
    left: 14em;
    color: #020300;
    float: right;
    line-height: 0.9;
    font-size: 1.1em;
    font-family: "Oswald", sans-serif;
  }
`;