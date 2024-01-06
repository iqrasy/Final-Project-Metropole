import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/home");
		}
	}, [isAuthenticated, navigate]);

	return (
		<>
			{isAuthenticated ? null : (
				<Button onClick={() => loginWithRedirect()}>Sign In</Button>
			)}
		</>
	);
};

export default Login;

const Button = styled.button`
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 350px;
	height: 50px;
	border-radius: 10px;
	cursor: pointer;
	backdrop-filter: blur(15px);
	background-color: rgba(255, 255, 255, 0.06);
	border: 1.5px solid grey;
	color: #e3e3e3;
`;
