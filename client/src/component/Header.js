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
					<NavLink to="/home" className="header-nav-link">
						<h1>MÉTROPOLE </h1>
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

	.header-nav-link {
		color: #020300;
		font-size: 1.2rem;
		margin: 0;
		cursor: pointer;
		text-decoration: none;
	}

	@media only screen and (max-width: 480px) {
		.header-nav-link {
			font-size: 1rem;
			margin: 0 auto;
			display: flex;
			text-align: center;
			justify-content: center;
			align-items: center;
		}
	}
`;

const Menu = styled.div`
	display: flex;

	.nav-link {
		text-decoration: none;
		padding: 0.5rem;

		&:visited {
			color: black;
		}
	}
	@media only screen and (max-width: 480px) {
		display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
		position: absolute;
		background-color: white;
		width: 100%;
		border-radius: 0.5rem;
		font-size: 1rem;
		top: 3.8rem;
		right: 0rem;
		justify-content: center;
		padding: 1rem;
		margin: 0 auto;
		-webkit-box-shadow: 9px 9px 22px -15px rgba(97, 97, 97, 1);
		-moz-box-shadow: 9px 9px 22px -15px rgba(97, 97, 97, 1);
		box-shadow: 9px 9px 22px -15px rgba(97, 97, 97, 1);
		z-index: 10;
	}
`;

const AccountIcon = styled.button`
	display: none;
	@media only screen and (max-width: 480px) {
		display: block;
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
