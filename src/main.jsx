import React from "react";
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "components/Login";
import AdminPanel from "./pages/AdminPanel";
import ListingPage from "./pages/ListingPage";
import Nav from "./components/Nav";
import Form from "./components/Form";
import Details from "./pages/Details";
import MyAccount from "./pages/MyAccount";
import Members from "./components/AdminPanel/Members";
import Properties from "./components/AdminPanel/Properties";
import HomeTest from "./pages/HomeTest";

const Main = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div className="h-screen w-screen">
      <React.StrictMode>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route exact element={<ListingPage />} path="/listing" />
            {isLoggedIn ? (
              <>
                <Route element={<Details />} path="/listing/:id" />
                <Route element={<ListingPage />} path="/listing" />
                <Route element={<Form />} path="/add" />
                <Route element={<AdminPanel />} path="/admin">
                  <Route element={<Properties />} path="" />
                  <Route element={<Members />} path="members" />
                  <Route element={<Details />} path="details/:id" />
                </Route>
              </>
            ) : (
              <>
                <Route element={<LoginRedirect />} path="/listing/:id" />
                <Route element={<LoginRedirect />} path="/admin" />
              </>
            )}
            <Route element={<HomeTest />} path="/" />
            <Route element={<MyAccount />} path="/account" />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
};

const LoginRedirect = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(window.location.search).toString();
  const state = { from: location.pathname, queryParams };

  return <Navigate replace state={state} to="/login" />;
};

export default Main;
