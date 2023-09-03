/**
 * This is the Contact Page.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */

// Import necessary CSS and components
import "./contactPage.css";
import React from "react";
import ContactFormComp from "../../Components/contact/form/contactFormComp";
import ContactInfoComp from "../../Components/contact/info/contactInfoComp";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Define breakpoints for responsive design using MUI's theme
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 330,
      sm: 380,
      md: 430,
      lg: 1100,
      xl: 1450,
    },
  },
});

// ContactPage function component
function ContactPage() {
  return (
    <div className="Contact">
      {/* Container for the contact elements */}
      <div className="contact-container">
        {/* Left side containing contact form */}
        <div className="left-form">
          <div className="contact-form">
            {/* Header for the contact form */}
            <h1 className="contact-form-header">
              GET IN
              <span style={{ marginLeft: "6px", color: "#5C469C" }}>
                TOUCH
              </span>{" "}
            </h1>
            {/* Apply the MUI theme to the contact form component */}
            <ThemeProvider theme={theme}>
              <ContactFormComp />
            </ThemeProvider>
          </div>
        </div>
        {/* Right side containing contact information */}
        <div className="right-info">
          <div className="info">
            {/* Header for the contact information */}
            <h1 className="info-header">
              CONTACT
              <span style={{ marginLeft: "6px", color: "#aba7b8" }}>
                US
              </span>{" "}
            </h1>
            {/* Apply the MUI theme to the contact information component */}
            <ThemeProvider theme={theme}>
              <ContactInfoComp />
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the ContactPage component
export default ContactPage;
