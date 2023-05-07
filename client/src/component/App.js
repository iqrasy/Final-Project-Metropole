import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./Home";
import Confirmation from "./Reserve/Confirmation";
import Main from "./Main";
import About from "./FooterContent/About";
import GlobalStyle from "./GlobalStyle";
import Layout from "./Layout";
import Form from "./Reserve/Form";
import Account from "./Account";
import Edit from "./Reserve/Edit";
import Delete from "./Reserve/Delete";

const App = () => {
  //routes
  return (
    <div>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/map"
            element={
              <Layout>
                <Map />
              </Layout>
            }
          />
          <Route
            path="/reservation/:reservation"
            element={
              <Layout>
                <Confirmation />
              </Layout>
            }
          />
          <Route
            path="/form"
            element={
              <Layout>
                <Form />
              </Layout>
            }
          />
          <Route
            path="/account/:email"
            element={
              <Layout>
                <Account />
              </Layout>
            }
          />
          <Route
            path="/edit/:reservation"
            element={
              <Layout>
                <Edit />
              </Layout>
            }
          />
          <Route
            path="/delete/:reservation"
            element={
              <Layout>
                <Delete />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
