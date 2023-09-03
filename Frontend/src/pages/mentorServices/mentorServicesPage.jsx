/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 * Code resude from A1.
 */
import React, { useEffect, useState } from "react";
import PageHeaderComp from "../../Components/mentorServices/header/headerComp";
import "./mentorServicesPage.css";
import axios from "axios";
import { GET_SERVICE_DETAILS } from "../../utils/apiUrls";
import { useNavigate } from "react-router-dom";
import MentorServiceBodyComp from "../../Components/mentorServices/mentorServiceBody/mentorServiceBodyComp";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function MentorServicesPage(props) {
  const navigate = useNavigate();
  const [displayOption, updateDisplayOption] = useState("1:1");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [serviceDetails, setServiceDetails] = useState([]);

  // Function to fetch service details from database.
  const fetchData = async () => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    const mentorId = localUser.userName; // MentoId of the loggedin user
    try {
      const response = await axios.get(GET_SERVICE_DETAILS + "/" + mentorId);
      console.log("mentor body service data", response.data);
      setServiceDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch mentor service details", error);
    }
  };

  // Updated the display option
  const changeDisplayOption = (option) => {
    updateDisplayOption(option);
    fetchData(); // Calling fetch to update the data displayed on screen
  };

  // UserEffect to call fetchData() whenever display option in updated
  useEffect(() => {
    fetchData();
  }, [displayOption]);

  // UserEffect to call fetchData when page is loaded
  useEffect(() => {
    const fetchData = async () => {
      const localUser = JSON.parse(localStorage.getItem("user"));
      console.log("Printing local user from mentore service:", localUser);

      if (!localUser) {
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  // Function to handle Snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Function to show Snackbar
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    // <SnackbarProvider maxSnack={3}>
    <div className="queryPageBody">
      <div className="header">
        <PageHeaderComp
          pageTitle="Services"
          changeDisplayOption={changeDisplayOption}
          displayOption={displayOption}
          showSnackbar={showSnackbar}
        />
      </div>

      <div className="belowHeader container">
        <MentorServiceBodyComp
          displayOption={displayOption}
          changeDisplayOption={changeDisplayOption}
          showSnackbar={showSnackbar}
          serviceDetails={serviceDetails}
          setServiceDetails={setServiceDetails}
        />
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default MentorServicesPage;
