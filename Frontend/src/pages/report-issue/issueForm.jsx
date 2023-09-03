// Author: Aadith Shameel - B00929852
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { CREATE_ISSUE } from "../../utils/apiUrls";

const IssueForm = ({ onNewIssue }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const localUser = JSON.parse(localStorage.getItem("user"));
  const userName = localUser.userName;

  //Checking if the user is logged in
  useEffect(() => {
    const checkLogin = async () => {
      
      console.log("Printing local user:", localUser);

      if (!localUser) {
        navigate("/login");
      }
    };

    checkLogin();
  }, []);

  //Closing the alert
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
    navigate("/issues");
  };

  //Function to create an issue
  const handleSubmit = async (e) => {
    e.preventDefault();

    const issueData = { title, description, userName };

    const response = await fetch(CREATE_ISSUE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issueData),
    });

    if (response.ok) {
      setSnackbarOpen(true);
    }
  };
  
  //Customizing submit button
  const SubmitIssueButton = styled(Button)(({ theme }) => ({
    height: "100%",
    padding: "10px 30px",
    fontWeight: 600,
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: "#1D267D",
    "&:hover": {
      backgroundColor: "#0C134F",
    },
  }));

  return (
    <Container
      style={{ paddingTop: "10%", minHeight: "100vh", textAlign: "centre" }}
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Issue created successfully!
        </Alert>
      </Snackbar>
      {/* Form to get issue details */}
      <form onSubmit={handleSubmit}>
        <Typography variant="h3" style={{ marginBottom: "5%" }}>
          Report Issue
        </Typography>
        <Typography variant="h5" align="left">
          Issue Title
        </Typography>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "2%" }}
        />
        <Typography variant="h5" align="left">
          Issue Description
        </Typography>
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          multiline
          rows={3}
          style={{ width: "100%", marginBottom: "5%" }}
        />
        <SubmitIssueButton type="submit" variant="contained">
          Submit
        </SubmitIssueButton>
      </form>
    </Container>
  );
};

export default IssueForm;
