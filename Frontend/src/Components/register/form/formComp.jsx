/**
 * @author Amanjot Singh <am854663@dal.ca/B00942293>
 */
import "./formComp.css";
import axios from "axios";
import GoogleIcon from "@mui/icons-material/Google";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { FormHelperText } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SiGoogle } from "react-icons/si";
import Grid from "@mui/material/Grid";
import { CHECK_EMAIL_EXIST } from "../../../utils/apiUrls";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../utils/fireBase";
const providerGoogle = new GoogleAuthProvider();
export default function FormComp() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.

        let email = result.user.email;
        let name = result.user.displayName.split(" ");
        let firstName = name[0];
        let lastName = name[1];

        const user = { email: email, isGoogle: true };
        axios
          .post(CHECK_EMAIL_EXIST, { user })
          .then((response) => {
            console.log("here");
            localStorage.setItem("user", JSON.stringify(response.data.user));
            handleSnackbarOpen(
              "Successfully Signed in with Google. Redirecting..."
            );
            setTimeout(() => {
              navigate("/", { state: response.data.user });
            }, 2000);
          })
          .catch((err) => {
            // Redirect to the next form after 1.5 seconds

            handleSnackbarOpen(
              "Data has been successfully saved. Redirecting..."
            );

            setTimeout(() => {
              navigate("/about-you", {
                state: {
                  email,
                  firstName,
                  lastName,
                  password: email,
                  isGoogle: true,
                },
              });
            }, 1500);
          });

        // Check if the email already exists in your backend using Axios
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsFirstNameValid(!!firstName);
    setIsLastNameValid(!!lastName);
    setIsEmailValid(!!email);
    setIsPasswordValid(!!password);

    if (!firstName || !lastName || !email || !password) {
      return;
    }

    if (!isValidEmail(email)) {
      setIsEmailValid(false);
      return;
    }

    if (!isValidPassword(password)) {
      setIsPasswordValid(false);
      return;
    }

    // Form submission successful
    console.log("Form submitted:", { firstName, lastName, email, password });
    // Reset form fields
    const user = { email: email, isGoogle: false };
    axios
      .post(CHECK_EMAIL_EXIST, { user })
      .then((response) => {
        handleSnackbarOpen("Registration failed. Email Already Exist!");
      })
      .catch((err) => {
        // Redirect to the next form after 1.5 seconds
        handleSnackbarOpen("Data has been successfully saved. Redirecting...");

        setTimeout(() => {
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setIsFirstNameValid(true);
          setIsLastNameValid(true);
          setIsEmailValid(true);
          setIsPasswordValid(true);

          navigate("/about-you", {
            state: { email, firstName, lastName, password, isGoogle: false },
          });
        }, 1500);
      });
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isValidPassword = (value) => {
    return value.length >= 8;
  };

  return (
    <Box
      className="register-box"
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Set anchorOrigin to top center
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={
            snackbarMessage.toLowerCase().includes("successful")
              ? "success"
              : "error"
          }
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Grid container spacing={0}>
        {/* <div className="form"> */}

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <TextField
            required
            sx={{ width: "90%" }}
            id="outlined-required"
            placeholder="First Name"
            label="First Name"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            error={!isFirstNameValid}
            helperText={!isFirstNameValid && "Please enter your first name"}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <TextField
            required
            sx={{ width: "90%" }}
            id="outlined-required"
            placeholder="Last Name"
            label="Last Name"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            error={!isLastNameValid}
            helperText={!isLastNameValid && "Please enter your last name"}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <TextField
            required
            sx={{ width: "90%" }}
            id="outlined-required"
            placeholder="xyz@gmail.com"
            label="Email"
            type="email"
            InputLabelProps={{
              shrink: true,
            }}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={!isEmailValid}
            helperText={
              !isEmailValid && email ? "Please enter a valid email address" : ""
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <FormControl
            error={!isPasswordValid}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              InputLabelProps={{
                shrink: true,
              }}
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <FormHelperText>
              {!isPasswordValid && password
                ? "Password should be more than 8 digits"
                : ""}
            </FormHelperText>
          </FormControl>
        </Grid>
        {/* </div> */}
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "90%",
              bgcolor: "#1D267D",
              color: "white",
              fontSize: "1rem",
              marginTop: "3px",
              letterSpacing: "3px",
              "&:hover": {
                bgcolor: "#0C134F", // Set your desired hover color here
              },
            }}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          {" "}
          <Button
            variant="contained"
            startIcon={<SiGoogle style={{ color: "#DB4437" }} />}
            onClick={handleGoogleLogin}
            sx={{
              width: "90%",
              bgcolor: "#ffff",
              borderColor: "#4285F4",
              color: "#000000",
              fontSize: "1rem",
              marginTop: "3px",
              // letterSpacing: "3px",
              "&:hover": {
                bgcolor: "#000000", // Reversing the button color on hover
                color: "#ffff", // Reversing the text color on hover
              },
            }}
          >
            Continue with Google
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
