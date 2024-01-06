import React, { useState } from "react";
import styled from "styled-components";
import { BsGrid } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isRotated, setIsRotated] = useState(false);
	const { isAuthenticated } = useAuth0();
	const email = localStorage.getItem("email");

	const handleClick = () => {
		setIsRotated(!isRotated);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<>
			<Div>
				<div className="title">
					<NavLink to="/home" className="nav-link">
						<h1>Métropole</h1>
					</NavLink>
				</div>
				<AccountIcon
					onClick={() => {
						toggleMenu();
						handleClick();
					}}
					className={isRotated ? "rotate" : ""}
				>
					{isMenuOpen ? <BsGrid /> : <BsGrid />}
				</AccountIcon>
				<Menu isOpen={isMenuOpen}>
					<NavLink to="/about" className="nav-link">
						About
					</NavLink>
					<NavLink to={`/account/${email}`} className="nav-link">
						Account
					</NavLink>
					{isAuthenticated && <Logout />}
				</Menu>
			</Div>
		</>
	);
};

const Div = styled.div`
	background-color: transparent;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem;

	.title {
		color: #020300;
		font-size: 1.2rem;
		margin: 0;
		cursor: pointer;
	}

	.nav-link {
		text-decoration: none;
		padding: 0.5rem;
		&:visited {
			color: black;
		}
	}

	@media only screen and (max-width: 781px) {
		.title {
			font-size: 1.2rem;
			margin: 0;
			display: block;
			text-align: center;
			justify-content: center;
			align-items: center;
		}
	}
`;

const Menu = styled.div`
	display: flex;
	@media only screen and (max-width: 780px) {
		display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
		flex-direction: column;
		position: absolute;
		background-color: white;
		border-radius: 0.5rem;
		font-size: 1rem;
		top: 3.5em;
		right: 1em;
		padding: 1em;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 10;
	}
`;

const AccountIcon = styled.button`
	@media only screen and (min-width: 781px) {
		display: none;
	}

	@media only screen and (max-width: 780px) {
		display: block;
		position: absolute;
		top: 2em;
		right: 1em;
		z-index: 10;
		border: none;
		cursor: pointer;
		color: #020300;
		background-color: transparent;

		svg {
			font-size: 1.5rem;
			transition: transform 0.5s ease;
		}

		&.rotate svg {
			transform: rotate(180deg);
		}
	}
`;

export default Header;
