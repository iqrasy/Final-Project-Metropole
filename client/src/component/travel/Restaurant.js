import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { AppContext } from "../Context";
import "./travel.css";

const Restaurant = ({ search }) => {
	const [restoSelected, setRestoSelected] = useState(null);
	const [isRestoSelected, setIsRestoSelected] = useState(false);
	const navigate = useNavigate();
	const { setZoomIn, setCoordinate, resto, setResto } = useContext(AppContext);

	useEffect(() => {
		fetch("/api/resto")
			.then((res) => res.json())
			.then((resData) => {
				if (search === "") {
					setResto(resData.data);
				} else {
					const filteredResto = resData.data.filter((restaurant) => {
						const name = restaurant?.name?.toLowerCase();
						return name && name.includes(search?.toLowerCase() || "");
					});
					setResto(filteredResto);
				}
			})
			.catch((error) => console.log(error));
	}, [search]);

	const handleResto = (restaurant) => {
		setRestoSelected(restaurant);
		setIsRestoSelected(true);

		if (restaurant && restaurant.latitude && restaurant.longitude) {
			const { latitude, longitude } = restaurant;
			setCoordinate([latitude, longitude]);
			setZoomIn(15);
		}
	};

	return (
		<div className="container">
			{isRestoSelected ? (
				<>
					<Link to="#" onClick={() => setIsRestoSelected(false)}>
						<BiLeftArrowAlt />
					</Link>
					<div>
						{restoSelected.photo && restoSelected.photo.images && (
							<div>
								<img
									className="image-container"
									src={restoSelected.photo.images.medium.url}
								/>
							</div>
						)}
						<div className="resto-info">
							<h2 className="h-two">{restoSelected.name}</h2>
							<p className="infor">{restoSelected.address}</p>
							<p className="infor">{restoSelected.phone}</p>
							<p className="infor">{restoSelected.email}</p>
							<a href={restoSelected.website} target="_blank" className="a-tag">
								{restoSelected.website}
							</a>
						</div>
						<p className="description">{restoSelected.description}</p>
						<button
							className="book-button"
							onClick={() => {
								navigate(`/form?type=restaurant&name=${restoSelected.name}`);
							}}
						>
							Book now
						</button>
					</div>
				</>
			) : (
				resto &&
				resto.map((item, id) => {
					return (
						<div key={id}>
							<div onClick={() => handleResto(item)} className="item-button">
								<div className="container-div">
									<h2 className="name">{item.name}</h2>
									{item.dietary_restrictions && (
										<div className="diet">
											{item.dietary_restrictions.map((diet) => {
												return (
													<div key={diet.key}>
														<p>• {diet.name}</p>
													</div>
												);
											})}
										</div>
									)}
									<p>{item.price_level}</p>
									<p>{item.rating}</p>
								</div>
								{item.photo && item.photo.images && (
									<img
										className="display-img"
										src={item.photo.images.small.url}
									/>
								)}
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};

export default Restaurant;
