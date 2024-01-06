import React, { useEffect, useState } from "react";
import styled from "styled-components";
import cloud from "../assets/cloudy-day.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Weather = () => {
	const [current, setCurrent] = useState(null);

	// fetch weather API
	useEffect(() => {
		fetch("/api/weather")
			.then((res) => res.json())
			.then((resData) => {
				// set weather
				setCurrent(resData.data[0].current);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	if (!current) {
		return (
			<Icon>
				<AiOutlineLoading3Quarters />
			</Icon>
		);
	}

	return (
		// render weather
		<Main>
			{current ? (
				<div>
					<Title>{current.name} </Title>
					{window.innerWidth > 768 ? (
						<Container>
							<Degree>{current.main.feels_like}°C</Degree>
							<Details>{current.weather[0].description}</Details>
							<Details>Humidity {current.main.humidity}%</Details>
							<Details>H: {current.main.temp_max}°</Details>
							<Details>L: {current.main.temp_min}°</Details>
						</Container>
					) : null}
					<Img src={cloud} />
				</div>
			) : (
				<p>Loading weather</p>
			)}
		</Main>
	);
};

const Icon = styled.div`
	/* animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } */
`;

const Main = styled.div`
	/* backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.06);
  color: #020300;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 15px;
  background-size: cover;
  height: 4.5em;
  width: 20em;
  font-family: "Oswald", sans-serif;

  @media only screen and (max-width: 768px) {
    height: 4.5em;
    width: 10em;
  } */
`;

const Title = styled.h3`
	/* padding: 0.1em;
  font-size: 1.1em;
  position: relative;
  bottom: 0.3em;
  left: 0.6em;

  @media only screen and (max-width: 768px) {
    font-size: 0.8rem;
  } */
`;

const Container = styled.div`
	/* display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  bottom: 5px;
  left: 0;
  margin: 1em; */
`;

const Details = styled.p`
	/* font-size: 0.7rem;
  margin: 0;

  @media only screen and (max-width: 768px) {
    display: none;
  } */
`;

const Degree = styled.p`
	/* font-size: 0.8em;
  display: flex;
  position: absolute;
  bottom: 2.4em;
  left: 7em;

  @media only screen and (max-width: 768px) {
    font-size: 0.7rem;
    display: flex;
    position: absolute;
    top: 0.5em;
    left: 0;
  } */
`;

const Img = styled.img`
	/* height: 2em;
  display: flex;
  position: absolute;
  top: 10%;
  left: 85%;

  @media only screen and (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 10%;
    left: 65%;
  } */
`;

export default Weather;
