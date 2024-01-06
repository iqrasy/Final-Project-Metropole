import React from "react";
import Footer from "./FooterContent/Footer";
import Header from "./Header";
import styled from "styled-components";

// all components can have same background style without repeating styles
const Layout = ({ children }) => {
	return (
		<>
			<Container>
				<Header />
				{children}
			</Container>
			<Footer />
		</>
	);
};

export default Layout;

const Container = styled.div``;
