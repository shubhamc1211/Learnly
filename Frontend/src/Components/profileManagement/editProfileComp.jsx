import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import getAllUsernames from "../../utils/getAllUsers"; // Import the function to get usernames
import { GET_MENTOR_DETAILS } from "../../utils/apiUrls";
import { PUT_USER_DATA } from "../../utils/apiUrls";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [disPlayName, setdisPlayName] = React.useState("");
  const [aboutYou, setAboutYou] = React.useState("");
  const [isIdUnique, setIsIdUnique] = React.useState(true);
  const [userName, setUsername] = React.useState(true);
  const [isGoogle, setIsGoogle] = React.useState(true);
  const [usernames, setUsernames] = React.useState([]); // State variable to store the usernames
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const wordLimit = 1000;
  const navigate = useNavigate();

  const handleTextFieldChange = (event) => {
    const user = event.target.value.trim();

    // Check if the entered ID is unique
    setIsIdUnique(!usernames.includes(user.toLowerCase()));

    // Set the username state
    setUsername(user);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    // Fetch the usernames from the API using the function

    const fetchUsernames = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user")); // Adjust this line according to how your user object is structured
        console.log("In edit profile", user, user === null);
        if (user === null) {
          console.log("In edit profile in if", user, user === null);

          navigate("/login");
          console.log("In edit profile end if", user, user === null);
        } else {
          console.log("In edit profile 1", user, user === null);

          const currentUsername = user.userName;
          console.log("In edit profile 2...", user, user === null);

          const allUsernames = await getAllUsernames();
          const usernames = allUsernames.filter(
            (username) => username != currentUsername
          );
          setUsernames(usernames);
        }
      } catch (error) {
        console.error("Error fetching usernames:", error);
        setUsernames([]); // Return an empty array in case of an error
      }
    };
    fetchUsernames();
  }, []);

  const handleTextareaChange = (event) => {
    const inputText = event.target.value;
    const words = inputText;

    if (words.length <= wordLimit) {
      setAboutYou(inputText);
    } else {
      handleSnackbarOpen(
        "Failed: Maximum word count (1000 characters) exceeded!"
      );
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user")); // Adjust this line according to how your user object is structured
    const currentUsername = user.userName;

    console.log("here");
    // Your data to send to the API
    const dataToSend = {
      newUserName: userName,
      currentUsername: currentUsername,
      firstName,
      lastName,
      email,
      displayName: disPlayName,
      aboutYou,
    };

    axios
      .put(PUT_USER_DATA, dataToSend)
      .then((response) => {
        handleSnackbarOpen("Information Saved...");

        const newUser = {
          email: email,
          firstName: firstName,
          userName: userName,
          isGoogle: isGoogle,
        };
        localStorage.setItem("user", JSON.stringify(newUser));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  React.useEffect(() => {
    // Get the username from the user object in local storage
    const user = JSON.parse(localStorage.getItem("user")); // Adjust this line according to how your user object is structured
    if (user === null) {
      console.log("In edit profile part2 in if", user, user === null);

      navigate("/login");
      console.log("In edit profile part2 end if", user, user === null);
    } else {
      const username = user.userName;

      // Send a GET request to the API with the username
      axios
        .get(`${GET_MENTOR_DETAILS}/${username}`)
        .then((response) => {
          const data = response.data.user;

          // Set the states with the received data
          setIsGoogle(response.data.user.isGoogle);
          console.log(isGoogle);
          setUsername(data.username);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
          setdisPlayName(data.displayName);
          setAboutYou(data.aboutYou);
        })
        .catch((error) => console.error(error));
    }
  }, []); // An empty dependencies array means this useEffect will run once after the component mounts
  // An empty dependencies array means this useEffect will run once after the component mounts

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Account" {...a11yProps(0)} />
          <Tab label="Profile" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <form onSubmit={handleSubmit}>
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12} xl={6}>
              <TextField
                required
                label="Should be unique"
                id="outlined-start-adornment"
                sx={{ width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      learnly.io/
                    </InputAdornment>
                  ),
                }}
                onChange={handleTextFieldChange}
                error={!isIdUnique}
                value={userName}
                helperText={!isIdUnique ? "Username already exists!" : ""}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={6}>
              {isGoogle ? (
                <TextField
                  disabled
                  id="outlined-required"
                  placeholder="xyz@gmail.com"
                  label="Email"
                  type="email"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: "100%" }}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              ) : (
                <TextField
                  required
                  id="outlined-required"
                  placeholder="xyz@gmail.com"
                  label="Email"
                  type="email"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: "100%" }}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              )}
            </Grid>
            <br />
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  bgcolor: "#1D267D",
                  color: "white",
                  width: "100%",
                  letterSpacing: "3px",
                  "&:hover": {
                    bgcolor: "#0C134F",
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="form">
            <Grid container spacing={2}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <TextField
                  // sx={{ paddingRight: 3, paddingBottom: 2 }}
                  required
                  id="outlined-required"
                  placeholder="First Name"
                  label="First Name"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: "100%" }}
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <TextField
                  required
                  id="outlined-required"
                  placeholder="Last Name"
                  label="Last Name"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: "100%" }}
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={612} xl={12}>
                <TextField
                  required
                  id="disPlayName"
                  placeholder="Your Display Name"
                  label="Display Name"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: "100%" }}
                  // sx={{ marginBottom: "1em", width: "49ch" }}
                  value={disPlayName}
                  onChange={(event) => setdisPlayName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <TextField
                  id="filled-multiline-static"
                  label="About You"
                  multiline
                  rows={4}
                  sx={{ width: "100%" }}
                  value={aboutYou}
                  onChange={handleTextareaChange}
                  variant="filled"
                />
              </Grid>
              <br />
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    bgcolor: "#1D267D",
                    width: "100%",
                    color: "white",

                    letterSpacing: "3px",
                    "&:hover": {
                      bgcolor: "#0C134F",
                    },
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
        </CustomTabPanel>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={
            snackbarMessage === "Information Saved..." ? "success" : "error"
          }
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
