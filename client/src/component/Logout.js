import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Logout = () => {
	const { logout } = useAuth0();

	return (
		<Div>
			<NavLink
				className="logout"
				onClick={() =>
					logout({ logoutParams: { returnTo: window.location.origin } })
				}
			>
				Log Out
			</NavLink>
		</Div>
	);
};

export default Logout;

const Div = styled.div`
	padding: 0.5rem;

	.logout {
		text-decoration: none;

		&:visited {
			color: black;
		}

		&:hover {
			cursor: pointer;
		}
	}
`;
