import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import RoofingIcon from "@mui/icons-material/Roofing";
import { Link } from "react-router-dom";
import AvatarMenu from "./CustomAvatar";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <AppBar
      className="!bg-indigo-500"
      elevation={0}
      position="absolute"
      style={{ zIndex: 1 }}
    >
      <Container maxWidth="lg">
        <Toolbar className="flex justify-between">
          <Link to="/">
            <Typography variant="h4">
              <RoofingIcon className="!mr-2" fontSize="large" />
              Casa.
            </Typography>
          </Link>
          {isLoggedIn ? (
            <AvatarMenu />
          ) : (
            <Box className="block">
              <Link to="/signup">
                <Button className="!mx-2 !text-white">Sign Up</Button>
              </Link>
              <Link to="/login">
                <Button
                  className="!mx-2 !border-white !text-white"
                  variant="outlined"
                >
                  Sign In
                </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
