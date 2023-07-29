import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import queryClient from "utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import Login from "components/Login";
import Signup from "components/Signup";
import AdminPanel from "./pages/AdminPanel";
import Home from "./pages/Home";
import ListingPage from "./pages/ListingPage";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Details from "./pages/Details";
import Testpage from "./pages/Test";
import MyAccount from "./pages/MyAccount";

const Main = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div className="h-screen w-screen">
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route element={<Details />} path="/listing/:id" />
              <Route element={<Form />} path="/add" />
              <Route element={<Login />} path="/login" />
              <Route element={<Signup />} path="/signup" />
              <Route element={<AdminPanel />} path="/admin" />
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
              <Route element={<MyAccount />} path="/myaccount" />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
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
