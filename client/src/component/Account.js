import React, { useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Reservation from "./Reserve/Reservation";
import { useDropzone } from "react-dropzone";
import { BsCamera } from "react-icons/bs";

const Account = () => {
	// rendering user email + name
	const { user, isAuthenticated, isLoading } = useAuth0();

	// manages picture dropzone
	const [picture, setPicture] = useState(null);

	// initializes a function onDrop using the useCallback hook
	// onDrop is called with acceptedFiles as an argument
	const onDrop = useCallback((acceptedFiles) => {
		setPicture(acceptedFiles[0]);
	}, []);

	// initializes 3 different variables with the useDropzone hook
	// getRootProps: returns a set of props that need to be added to the root element of the dropzone (ex.: <div>)
	// getInputProps: a function that returns a set of props that need to be added to an input element within the dropzone.
	// isDragActive: a boolean that is true when a user is currently dragging a file over the dropzone, and false otherwise
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	// loading
	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return (
		isAuthenticated && (
			<>
				<Wrapper>
					<Main>
						<Div {...getRootProps()}>
							<input {...getInputProps()} />
							{picture && isDragActive ? (
								<img src={URL.createObjectURL(picture)} alt="profile" />
							) : (
								<div style={{ position: "relative", display: "inline-block" }}>
									<img src={user.picture} alt={user.name} />
									<Icon>
										<BsCamera />
									</Icon>
								</div>
							)}
							<div>
								<h2>Hi, {user.nickname}</h2>
								<h3>{user.email}</h3>
							</div>
						</Div>
						<Reserve>
							<Reservation />
						</Reserve>
					</Main>
				</Wrapper>
			</>
		)
	);
};

export default Account;

const Wrapper = styled.div`
	/* width: 100%;
  display: flex;
  justify-content: center; */
`;

const Main = styled.div`
	/* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 90.7vh;
  width: 100%;
  color: #020300;
  margin: auto; */
`;

const Div = styled.div`
	/* display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  position: relative;
  bottom: 9em;
  left: 1em;
  color: black;

  h2 {
    font-family: "Oswald", sans-serif;
  }

  h3 {
    font-size: 1em;
    font-family: "Oswald", sans-serif;
  }

  img {
    border-radius: 15%;
    margin: 1em;
    cursor: pointer;
    width: 6em;
  } */
`;

const Reserve = styled.div`
	/* display: inline-block;
  align-items: center;
  position: relative;
  bottom: 1em;
  left: 5em; */
`;

const Icon = styled.div`
	/* display: flex;
  position: absolute;
  bottom: 2em;
  right: 2em;
  color: #e3e3e3; */
`;
