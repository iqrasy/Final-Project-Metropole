import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { BiLeftArrowAlt } from "react-icons/bi";
import { AppContext } from "../Context";

const Hotel = ({ search }) => {
	const [selectedHotel, setSelectedHotel] = useState(null);
	const [isHotelSelected, setIsHotelSelected] = useState(false);
	const navigate = useNavigate();
	const { setZoomIn, hotels, setHotels, setCoordinate } =
		useContext(AppContext);

	const handleHotel = (hotel) => {
		setSelectedHotel(hotel);
		setIsHotelSelected(true);

		if (hotel && hotel.map && hotel.map.latLong) {
			const { latitude, longitude } = hotel.map.latLong;
			setCoordinate([latitude, longitude]);
			setZoomIn(15);
		}
	};

	const minRoomsLeft =
		isHotelSelected && selectedHotel.availability.minRoomsLeft;
	const isAvailable = minRoomsLeft !== null;

	useEffect(() => {
		fetch("/api/hotels")
			.then((res) => res.json())
			.then((resData) => {
				if (search === "") {
					setHotels(resData.data);
				} else {
					const filteredHotels = resData.data.filter((hotel) =>
						hotel.name.toLowerCase().includes(search.toLowerCase())
					);
					setHotels(filteredHotels);
				}
			})
			.catch((error) => console.log(error));
	}, [search]);

	return (
		<div className="container">
			{isHotelSelected ? (
				<>
					<Link to="#" onClick={() => setIsHotelSelected(false)}>
						<BiLeftArrowAlt />
					</Link>
					<div>
						<div>
							<img
								className="image-container"
								src={selectedHotel.propertyImage.image.url}
							/>
						</div>
						<div className="info">
							<h2>{selectedHotel.name}</h2>
							{isAvailable && <p>Room available: {minRoomsLeft}</p>}
							<p>{selectedHotel.price.lead.formatted}/night</p>
						</div>
						<div>
							<button
								className="book-button"
								disabled={!isAvailable}
								onClick={() => {
									navigate(`/form?type=hotel&name=${selectedHotel.name}`);
								}}
							>
								{isAvailable ? "Book now" : "Not Available"}
							</button>
						</div>
					</div>
				</>
			) : (
				hotels.map((item, id) => {
					return (
						<div key={id}>
							<div onClick={() => handleHotel(item)} className="item-button">
								<div className="container-div">
									<h2 className="name">{item.name}</h2>
									<p>
										{item.price.lead.formatted} <span>/night</span>
									</p>
									<p>rating: {item.reviews.score}</p>
								</div>
								<img
									className="display-img"
									src={item.propertyImage.image.url}
								/>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};

export default Hotel;

const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 95%;
	margin: 1rem;
	border-radius: 0.8rem;
	background-color: var(--bg-200);
	border: none;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
	cursor: pointer;

	img {
		width: 10rem;
		height: 9rem;
		border-radius: 0.4rem;
		margin: 0.3em;
		object-fit: cover;
	}
`;

const Text = styled.div`
	display: flex;
	margin: 0.4rem;
	flex-direction: column;
	justify-content: start;
	align-items: flex-start;

	p {
		font-size: 0.7rem;
	}

	h2 {
		text-align: left;
		max-width: 70%;
		margin: 0.1rem;
		font-size: 0.9rem;
	}

	span {
		font-size: 0.8em;
	}
`;

const Div = styled.div`
	display: flex;
	flex-direction: column;
	width: 40vh;
	position: relative;
	justify-content: flex-start;
	align-items: center;

	button {
		border: none;
		background-color: var(--primary-200);
		color: #e3e3e3;
		padding: 1.5rem 4rem;
		border-radius: 1.3rem;
		width: 35vh;
		cursor: pointer;
		transition: background-color 0.3s ease, transform 0.3s ease;

		&:disabled {
			background-color: white;
			color: black;
			cursor: not-allowed;
		}

		&:hover {
			background-color: var(--primary-300);
			transform: scale(1);
		}
	}
`;

const Title = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 0 auto;

	p {
		font-size: 0.8em;
		color: grey;
		line-height: 1;
	}

	width: 12vh;

	h2 {
		color: #020300;
		font-size: 1.3em;
	}
`;
