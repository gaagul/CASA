import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LockOutlined } from "@mui/icons-material";
import { GoogleAuth } from "./googleAuth";

const Copyright = props => (
  <Typography align="center" color="text.secondary" variant="body2" {...props}>
    {"Copyright © "}
    
      Casa
    {" "}
    {new Date().getFullYear()}.
  </Typography>
);

const defaultTheme = createTheme();

const SignUp = () => {
  const handleSubmit = event => {
    event.preventDefault();
    // TODO: replace with real signup logic
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            noValidate
            component="form"
            sx={{ mt: 3 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  required
                  autoComplete="given-name"
                  id="firstName"
                  label="First Name"
                  name="firstName"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  required
                  autoComplete="family-name"
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  autoComplete="email"
                  id="email"
                  label="Email Address"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  autoComplete="new-password"
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  label="I want to receive inspiration, marketing promotions and updates via email."
                  control={
                    <Checkbox color="primary" value="allowExtraEmails" />
                  }
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              type="submit"
              variant="contained"
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <GoogleAuth redirectPath="/" />
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
