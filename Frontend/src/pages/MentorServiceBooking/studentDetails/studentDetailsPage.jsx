/**
 * Author: Shivam Lakhanpal <sh475218@dal.ca/B00932887>
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */

import React, { useState } from "react";
import { Paper, Typography, Box, Snackbar, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import FormInput from "../../../Components/MentorServiceBooking/studentDetails/formInput";
import FormButton from "../../../Components/MentorServiceBooking/studentDetails/formButton";
import { SAVE_STUDENT_BOOKING } from "../../../utils/apiUrls";
import { v4 as uuidv4 } from "uuid";
import "./studentDetailsForm.css";

const StudentDetailsForm = () => {
  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [callAbout, setCallAbout] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Get selected time, date, mentorId, service details from location state
  const selectedTime = location.state.selectedTime;
  const selectedDate = location.state.selectedDate;
  const mentorId = location.state.mentorId;
  const serviceName = location.state.serviceName;
  const serviceDuration = location.state.serviceDuration;
  const servicePrice = location.state.servicePrice;
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  // Handles name change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Handles email change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Handles call about change
  const handleCallAboutChange = (event) => {
    setCallAbout(event.target.value);
  };

  // Handles snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Handles email validation
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate form fields
    if (!name.trim() || !email.trim() || !callAbout.trim()) {
      setSnackbarMessage("All fields must be filled out");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (!validateEmail(email)) {
      setSnackbarMessage("Please enter a valid email");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    setLoading(true);
    // Create booking details
    const bookingId = uuidv4();
    const details = {
      serviceName: serviceName,
      serviceDuration: serviceDuration,
      selectedDate,
      selectedTime,
      isPaid: false,
      mentorId: mentorId,
      studentName: name,
      studentEmail: email,
      callAbout,
      price: "",
      bookingId: bookingId,
      isCancelled: false,
    };

    // Send details to server, then navigate
    fetch(SAVE_STUDENT_BOOKING, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle API response
        setLoading(false);
        if (data.error) {
          setSnackbarMessage(data.error);
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage(
            "Student details saved successfully. Redirecting to payments page"
          );
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setTimeout(() => {
            navigate("/paymentDetails", {
              state: {
                servicePrice: servicePrice,
                mentorId: mentorId,
                bookingId: bookingId,
              },
            });
          }, 4000);
        }
      })
      .catch((error) => {
        // Handle fetch error
        console.error("Error:", error);
        setLoading(false);
        setSnackbarMessage("An error occurred while saving the booking.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  return (
    <Paper elevation={3} className="paper-container">
      <Typography variant="h3" gutterBottom className="heading">
        Enter <span className="highlight">student's</span> details
      </Typography>
      <Box className="detail-box">
        <Typography variant="body1" className="detail-text">
          Service Price: ${servicePrice}
        </Typography>
        <Typography variant="body1" className="detail-text">
          Meeting Time: {serviceDuration} minutes
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Your Name"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
        />
        <FormInput
          label="Email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />
        <FormInput
          label="What's this call about"
          value={callAbout}
          onChange={handleCallAboutChange}
          placeholder="Enter the call details"
        />
        <FormButton buttonText="Confirm and Pay" handleSubmit={handleSubmit} />
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default StudentDetailsForm;
