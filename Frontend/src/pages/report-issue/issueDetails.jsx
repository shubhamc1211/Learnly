// Author: Aadith Shameel - B00929852
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { DELETE_ISSUE, GET_ISSUE, UPDATE_ISSUE } from "../../utils/apiUrls";

const IssueDetails = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  //Checking if user is logged in
  useEffect(() => {
    const checkLogin = async () => {
      const localUser = JSON.parse(localStorage.getItem("user"));
      console.log("Printing local user:", localUser);

      if (!localUser) {
        navigate("/login");
      }
    };

    checkLogin();
  }, []);

  //Getting all the detials of the issue made by the user
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await fetch(GET_ISSUE + `/${id}`);
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {
        console.error(error);
      }
    };
    fetchIssue();
  }, [id]);

  //Function to update the issue
  const updateIssue = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(UPDATE_ISSUE + `/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbarMessage("Issue updated successfully");
        setSnackbarOpen(true);
        //Making the alert message stay for 2 seconds
        setTimeout(() => navigate("/issues"), 2000);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Function to delete the issue
  const deleteIssue = async () => {
    try {
      const response = await fetch(DELETE_ISSUE + `/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbarMessage("Issue deleted successfully");
        setSnackbarOpen(true);
        //Keeping alert message on screen for 2 seconds
        setTimeout(() => navigate("/issues"), 2000);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //Closing the alert
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  //Customizing update button
  const UpdateIssueButton = styled(Button)(({ theme }) => ({
    height: "100%",
    padding: "10px 30px",
    fontWeight: 600,
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: "#1D267D",
    "&:hover": {
      backgroundColor: "#0C134F",
    },
  }));

  //Customizing delete button
  const DeleteIssueButton = styled(Button)(({ theme }) => ({
    height: "100%",
    padding: "10px 30px",
    fontWeight: 600,
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: "##f44336",
    "&:hover": {
      backgroundColor: "#ba000d",
    },
  }));

  return (
    <Container
      style={{ paddingTop: "10%", minHeight: "100vh", textAlign: "centre" }}
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Typography variant="h3" align="left" style={{ marginBottom: "5%" }}>
        Details of the Issue
      </Typography>
      <Typography variant="h5" align="left">
        Title
      </Typography>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ width: "100%", marginBottom: "2%" }}
      />
      <Typography variant="h5" align="left">
        Description
      </Typography>
      <TextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        multiline
        rows={3}
        style={{ width: "100%", marginBottom: "2%" }}
      />
      <Box display="flex" justifyContent="space-between">
        <UpdateIssueButton
          type="submit"
          onClick={updateIssue}
          variant="contained"
          color="primary"
        >
          Update
        </UpdateIssueButton>
        <DeleteIssueButton
          type="button"
          onClick={deleteIssue}
          variant="contained"
          color="secondary"
        >
          Delete
        </DeleteIssueButton>
      </Box>
    </Container>
  );
};

export default IssueDetails;
