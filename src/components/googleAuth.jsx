import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useLocation } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { createNewUserWithRole, fetchUserById } from "../apis/properties";
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from "../hooks/useLocalStorage";

export const GoogleAuth = props => {
  const location = useLocation();

  const invokeGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { user } = result;
        console.log(credential);
        console.log(token);
        console.log(user);
        const userDetails = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          role: "standard",
        };
        createNewUserWithRole(user.uid, userDetails);
        const isUserExists = await fetchUserById(user.uid);
        if(isUserExists)
          userDetails.role = isUserExists.data().role;
        setToLocalStorage("loggedInUser", JSON.stringify(userDetails));
        setToLocalStorage("isLoggedIn", true);
        const { state = {} } = location;
        let redirectPath = state?.from || "/";
        if (state?.queryParams) {
          redirectPath = `${redirectPath}?${state.queryParams}`;
        }
        window.location.href = redirectPath;
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      });
  };

  const invokeGoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        setToLocalStorage("isLoggedIn", false);
        removeFromLocalStorage("loggedInUser");
      })
      .catch(error => {
        console.log(`An error happened. Here's the error: ${error}`);
      });
  };

  return (
    <Button
      fullWidth
      startIcon={<GoogleIcon />}
      sx={{ mt: 8, mb: 2 }}
      variant="outlined"
      onClick={invokeGoogleSignIn}
    >
      Sign In with Google
    </Button>
  );
};
