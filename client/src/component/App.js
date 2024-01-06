import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./Home";
import Confirmation from "./Reserve/Confirmation";
import Main from "./Main";
import About from "./About";
import GlobalStyle from "./GlobalStyle";
import Form from "./Reserve/Form";
import Account from "./Account";
import Edit from "./Reserve/Edit";
import Delete from "./Reserve/Delete";
import { AppProvider } from "./Context";
import Header from "./Header";
import Footer from "./Footer";

const App = () => {
	return (
		<div>
			<AppProvider>
				<BrowserRouter>
					<GlobalStyle />
					<Header />
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/home" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/map" element={<Map />} />
						<Route
							path="/reservation/:reservation"
							element={<Confirmation />}
						/>
						<Route path="/form" element={<Form />} />
						<Route path="/account/:email" element={<Account />} />
						<Route path="/edit/:reservation" element={<Edit />} />
						<Route path="/delete/:reservation" element={<Delete />} />
					</Routes>
					<Footer />
				</BrowserRouter>
			</AppProvider>
		</div>
	);
};

export default App;
