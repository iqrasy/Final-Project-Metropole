import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Hotel from "./Hotel";
import Restaurant from "./Restaurant";
import Activities from "./Activities";

const Travel = () => {
	const [selected, setSelected] = useState("");
	const [search, setSearch] = useState("");

	const handleSwitch = () => {
		switch (selected) {
			case "hotel":
				return <Hotel search={search} />;
			case "restaurant":
				return <Restaurant search={search} />;
			case "activities":
				return <Activities search={search} />;
			default:
				return <Default>PLEASE CHOOSE ONE</Default>;
		}
	};

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

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
				{search.length === 0}
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
	background-color: var(--bg-100);
	height: 85vh;
	width: 45vh;
	border-radius: 0.5rem;
	overflow: hidden;
	color: var(--text-200);
	box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
`;

const Option = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 45vh;
	margin-bottom: 1rem;
`;

const Button = styled.button`
	font-size: 0.8rem;
	background-color: ${(props) =>
		props.active ? "var(--primary-200)" : "transparent"};
	color: ${(props) => (props.active ? "#e3e3e3" : "#020300")};
	padding: 0.5rem 0.7rem;
	border: none;
	border-radius: 1.5em;
	margin: 1rem;
	cursor: pointer;
	transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const SearchBar = styled.input`
	box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
	border-radius: 0.6em;
	border: none;
	width: 37vh;
	padding: 0.7em;

	&:focus {
		outline: none;
	}
`;

const SearchDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Default = styled.h3`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 2rem;
	color: var(--text-100);
`;
