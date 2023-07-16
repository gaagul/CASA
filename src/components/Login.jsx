import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { GoogleAuth } from "./googleAuth";

import { setToLocalStorage } from "../hooks/useLocalStorage";

const Copyright = props => (
  <Typography align="center" color="text.secondary" variant="body2" {...props}>
    {"Copyright © "}
    Casa {new Date().getFullYear()}
  </Typography>
);

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Login = () => {
  const location = useLocation();

  const handleSubmit = event => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    setToLocalStorage("isLoggedIn", true);
    const { state = {} } = location;
    let redirectPath = state?.from || "/";

    if (state?.queryParams) {
      redirectPath = `${redirectPath}?${state.queryParams}`;
    }
    window.location.href = redirectPath;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          md={7}
          sm={4}
          xs={false}
          sx={{
            backgroundImage:
              "url(https://ik.imagekit.io/gaagultest/CASA/home-bg_YN9qVyIcci.jpg?updatedAt=1685880520112)",
            backgroundRepeat: "no-repeat",
            backgroundColor: t =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item square component={Paper} elevation={6} md={5} sm={8} xs={12}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              noValidate
              className="!max-w-[60%]"
              component="form"
              sx={{ mt: 1 }}
              onSubmit={handleSubmit}
            >
              <TextField
                autoFocus
                fullWidth
                required
                autoComplete="email"
                id="email"
                label="Email Address"
                margin="normal"
                name="email"
              />
              <TextField
                fullWidth
                required
                autoComplete="current-password"
                id="password"
                label="Password"
                margin="normal"
                name="password"
                type="password"
              />
              <FormControlLabel
                control={<Checkbox color="primary" value="remember" />}
                label="Remember me"
              />
              <Button
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                variant="contained"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <GoogleAuth redirectPath="/listing" />
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
