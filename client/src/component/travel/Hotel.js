import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { BiLeftArrowAlt } from "react-icons/bi";

const Hotel = ({ search, setCoordinate, hotels, setHotels }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isHotelSelected, setIsHotelSelected] = useState(false);
  const navigate = useNavigate();

  const handleHotel = (hotel) => {
    setSelectedHotel(hotel);
    setIsHotelSelected(true);

    // setting the coordinates to setCoordinate
    if (hotel && hotel.map && hotel.map.latLong) {
      const { latitude, longitude } = hotel.map.latLong;
      setCoordinate([latitude, longitude]);
    }
  };

  // specifies the number of rooms still available at the selected hotel.
  const minRoomsLeft =
    isHotelSelected && selectedHotel.availability.minRoomsLeft;
  //  checks if minRoomsLeft is not null
  const isAvailable = minRoomsLeft !== null;

  // POST request for hotels api
  useEffect(() => {
    fetch("/api/hotels")
      .then((res) => res.json())
      .then((resData) => {
        if (search === "") {
          // if user doesnt search, setHotels is set to the original data
          setHotels(resData.data);
        } else {
          // able to search hotels
          const filteredHotels = resData.data.filter((hotel) =>
            hotel.name.toLowerCase().includes(search.toLowerCase())
          );
          // setHotel to the filtered data if user searches
          setHotels(filteredHotels);
        }
      })
      .catch((error) => console.log(error));
  }, [search]);

  return (
    <HotelContainer>
      {/* if user clicks on a button, this part of the code renders */}
      {isHotelSelected ? (
        <>
          {/* link on icon that takes you back to list of all activites instead of clicking on something else to see the list again */}
          <StyledLink to="#" onClick={() => setIsHotelSelected(false)}>
            <BiLeftArrowAlt />
          </StyledLink>
          <Div>
            <Info>
              <Title>
                <h2>{selectedHotel.name}</h2>
                {isAvailable && <p>Room available: {minRoomsLeft}</p>}
                <p>{selectedHotel.price.lead.formatted}/night</p>
              </Title>
              <img src={selectedHotel.propertyImage.image.url} />
            </Info>
            <button
              disabled={!isAvailable}
              // navigates to form based on params and hotel name
              onClick={() => {
                navigate(`/form?type=hotel&name=${selectedHotel.name}`);
              }}
            >
              {isAvailable ? "Book now" : "Not Available"}
            </button>
          </Div>
        </>
      ) : (
        hotels.map((item, id) => {
          {
            /* if user doesnt click on a button, this part of the code renders */
          }
          return (
            <div key={id}>
              <Button onClick={() => handleHotel(item)}>
                <Text>
                  <h2>{item.name}</h2>
                  <p>
                    {item.price.lead.formatted} <span>/night</span>
                  </p>
                  <p>rating: {item.reviews.score}</p>
                </Text>
                <img src={item.propertyImage.image.url} />
              </Button>
            </div>
          );
        })
      )}
    </HotelContainer>
  );
};

export default Hotel;

const HotelContainer = styled.div`
  max-height: 510px;
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
  border-radius: 0.8em;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
  cursor: pointer;

  img {
    width: 10em;
    height: 9em;
    border-radius: 0.7em;
    margin: 0.3em;
    float: right;
    object-fit: cover;
  }
`;

const Text = styled.div`
  font-size: 0.8em;
  display: flex;
  margin: 0.5em;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;

  p {
    font-family: "Montserrat", sans-serif;
    font-size: 1em;
  }

  h2 {
    font-family: "Oswald", sans-serif;
    text-align: left;
    max-width: 70%;
    margin: 0.1em;
    font-size: 1.2em;
  }

  span {
    font-size: 0.8em;
  }
`;

const Div = styled.div`
  margin: 4em 1em;
  width: 30em;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  button {
    position: absolute;
    bottom: 13%;
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

const Title = styled.div`
  display: flex;
  float: right;
  flex-direction: column;
  width: 40%;
  margin: 7% 4% 0 0;

  p {
    font-size: 0.8em;
    float: right;
    color: grey;
    font-family: "Montserrat", sans-serif;
    line-height: 0;
  }

  h2 {
    color: #020300;
    width: 10em;
    float: right;
    line-height: 0.9;
    font-size: 1.3em;
    font-family: "Oswald", sans-serif;
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

const StyledLink = styled(Link)`
  color: #610f7f;
  display: flex;
  position: absolute;
  left: 9em;

  &:visited {
    color: #610f7f;
  }
`;
