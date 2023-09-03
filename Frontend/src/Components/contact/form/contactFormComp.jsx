/**
 * This is the Contact Form Component.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */

// Import necessary components, libraries, and styles
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./contactFormComp.css"; // Import local CSS styles for the contact form
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify"; // Toast notifications library
import "react-toastify/dist/ReactToastify.css"; // Import the toastify CSS
import { useNavigate } from "react-router-dom";
import UseMediaQuery from "@mui/material/useMediaQuery";

// ContactForm functional component
export default function ContactForm() {
  // State variables for form fields and validation
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSubjectValid, setIsSubjectValid] = useState(true);
  const [isMessageValid, setIsMessageValid] = useState(true);

  const isLargeScreen = UseMediaQuery((theme) => theme.breakpoints.down("lg"));
  const isMediumScreen = UseMediaQuery((theme) => theme.breakpoints.down("md"));
  const isExtraSmallScreen = UseMediaQuery((theme) => theme.breakpoints.down("xs"));

  // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate form fields
    setIsNameValid(!!name);
    setIsEmailValid(!!email);
    setIsSubjectValid(!!subject);
    setIsMessageValid(!!message);

    // Display error toast if any field is blank
    if (!name || !email || !subject || !message) {
      toast.error("Field(s) cannot remain blank");
      return;
    }

    // Check email format using isValidEmail function
    if (!isValidEmail(email)) {
      setIsEmailValid(false);
      toast.error("Email Format Invalid");
      return;
    }

    // Form submission successful
    console.log("Form submitted:", { name, email, subject, message });
    // Show success notification
    toast.success("Form submitted successfully!");
    // Reset form fields and validation states
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setIsNameValid(true);
    setIsEmailValid(true);
    setIsSubjectValid(true);
    setIsMessageValid(true);
    // Redirect to landing page after a delay
    setTimeout(() => {
      navigate("/");
    }, 2000); // Adjust the delay as needed
  };

  // Function to validate email format using a regular expression
  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  // Return the component JSX
  return (
    <Box
      component="form"
      // Styles for the form layout
      sx={{
        "& .MuiTextField-root": {
          m: 1,
          width: {
            xs: "25ch",
            sm: "35ch",
            md: "40ch",
            lg: "50ch",
          },
        },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className="contact-form"> {/* Apply local CSS styles for the contact form */}
        {/* Name input field */}
        <TextField
          required
          id="outlined-required"
          placeholder="Name"
          label="Name"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={!isNameValid}
          helperText={!isNameValid && "Name cannot be blank"}
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "1rem",
            },
          }}
        />
        {/* Email input field */}
        <TextField 
          required
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
          helperText={!isEmailValid && "Invalid Email format"}
        />
        {/* Subject input field */}
        <TextField
          required
          id="text-subject"
          placeholder="Subject"
          label="Subject"
          type="text"
          multiline={isLargeScreen}
          rows={isLargeScreen ? 3 : 1}
          InputLabelProps={{
            shrink: true,
          }}
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          error={!isSubjectValid}
          helperText={!isSubjectValid && "Subject cannot be blank"}
        />
        {/* Message input field */}
        <TextField
          required
          id="text-message"
          placeholder="Message"
          label="Message"
          multiline
          rows={isLargeScreen ? 3 : 5}
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          error={!isMessageValid}
          helperText={!isMessageValid && "Message cannot be blank"}
        />
      </div>
      <br/><br/>
      {/* Submit button */}
      <Button
        variant="contained"
        type="submit"
        // Styles for the submit button
        sx={{
          bgcolor: "#1D267D",
          color: "white",
          padding: {
            xs: "8px 75px",
            md: "8px 220px",
          },
          fontSize: "1rem",
          width: "50%",
          marginTop: "3px",
          letterSpacing: "3px",
          "&:hover": {
            bgcolor: "#0C134F", // Set your desired hover color here
          },
        }}
      >
        Submit
      </Button>
      {/* Toast container for displaying notifications */}
      <ToastContainer position="top-center" />
    </Box>
  );
}
