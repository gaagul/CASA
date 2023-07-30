import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "components/Login";
import Signup from "components/Signup";
import { useUser } from "hooks/useUser";
import AdminPanel from "./pages/AdminPanel";
import Home from "./pages/Home";
import ListingPage from "./pages/ListingPage";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Details from "./pages/Details";
import Testpage from "./pages/Test";
import MyAccount from "./pages/MyAccount";
import Members from "./components/AdminPanel/Members";
import Properties from "./components/AdminPanel/Properties";

const Main = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div className="h-screen w-screen">
      <React.StrictMode>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route element={<Details />} path="/listing/:id" />
            <Route element={<Form />} path="/add" />
            <Route element={<Login />} path="/login" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<AdminPanel />} path="/admin">
              <Route element={<Properties />} path="" />
              <Route element={<Members />} path="members" />
            </Route>
            {isLoggedIn ? (
              <>
                <Route element={<ListingPage />} path="/listing" />
                <Route exact element={<Details />} path="/details" />
              </>
            ) : (
              <>
                <Route
                  element={<LoginRedirect from="/listing" />}
                  path="/listing"
                />
                <Route
                  element={<LoginRedirect from="/details" />}
                  path="/details"
                />
              </>
            )}
            <Route element={<Home />} path="/" />
            <Route element={<Testpage />} path="/test" />
            <Route element={<MyAccount />} path="/account" />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
};

const LoginRedirect = ({ from }) => {
  const queryParams = new URLSearchParams(window.location.search).toString();
  const state = { from, queryParams };

  return <Navigate replace state={state} to="/login" />;
};

export default Main;
