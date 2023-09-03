/**
 * This is the Payments Page.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */

// Import necessary CSS, components, and libraries
import "./paymentsPage.css";
import React, { useEffect } from "react";
import PaymentsComp from "../../Components/payments/paymentsComp";
import { useNavigate } from "react-router-dom";
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

// PaymentsPage function component
function PaymentsPage() {
  const navigate = useNavigate();

  // useEffect hook to check user login status when component mounts
  useEffect(() => {
    const checkLogin = async () => {
      // Retrieve user data from local storage
      const localUser = JSON.parse(localStorage.getItem("user"));
      console.log("Printing local user:", localUser);

      // If user is not logged in, navigate to the login page
      if (!localUser) {
        navigate("/login");
      }
    };

    // Call the checkLogin function when the component mounts
    checkLogin();
  }, []);

  // Return the PaymentsComp component wrapped in the MUI theme provider
  return (
    <ThemeProvider theme={theme}>
      <PaymentsComp />
    </ThemeProvider>
  );
}

// Export the PaymentsPage component
export default PaymentsPage;
