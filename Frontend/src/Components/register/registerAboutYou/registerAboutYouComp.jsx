/**
 * @author Amanjot Singh <am854663@dal.ca/B00942293>
 */
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormStep1 from "../stepForms/stepForm1/stepForm1Comp";
import FormStep2 from "../stepForms/stepForm2/stepForm2Comp";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import LoadingProgressComp from "../loadingProgress/loadingProgressComp";
import { useNavigate, useLocation } from "react-router-dom";
import { REGISTER_USER, USER_DATA_UPDATE } from "../../../utils/apiUrls";
const steps = ["Basic Information", "Your Expertise"];

const RegisterAboutYouComp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isStep1Valid, setIsStep1Valid] = React.useState(false);
  const [isStep2Valid, setIsStep2Valid] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [formData, setFormData] = React.useState({
    pageLink: "",
    plan: "",
    expertise: [],
  });
  const [loadingFinished, setLoadingFinished] = React.useState(false);

  const formDataRef = React.useRef({
    pageLink: "",
    plan: "",
    expertise: [],
  });

  const handleNext = () => {
    // Re-validate step 1
    if (activeStep === 0 && formData.pageLink === "" && formData.plan === "") {
      handleSnackbarOpen("Select an option");
      return;
    }

    // Re-validate step 2
    if (activeStep === 1 && formData.expertise.length === 0) {
      handleSnackbarOpen("Select an option");
      return;
    }

    if (activeStep === steps.length - 1) {
      formDataRef.current = { ...formData };

      // If the last step is completed, save the form data and set loadingFinished to true
      handleFormSubmit(); // Call handleFormSubmit function to submit the form data
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsStep1Valid(false);
    setIsStep2Valid(false);
    setLoadingFinished(false); // Reset loadingFinished state
    setFormData({
      pageLink: "",
      plan: "",
      expertise: [],
    });
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleStep1Complete = (isValid) => {
    setIsStep1Valid(isValid);
  };

  const handleStep2Complete = (isValid) => {
    setIsStep2Valid(isValid);
  };

  // Function to submit the form data to the API
  const handleFormSubmit = () => {
    const user = {
      firstName: location.state.firstName,
      lastName: location.state.lastName,
      email: location.state.email,
      password: location.state.password,
      expertise: formData.expertise,
      userName: formData.pageLink.toLowerCase(),
      reason: formData.plan,
      isGoogle: location.state.isGoogle,
      isDefaultSchedule: true,
    };
    console.log(user);
    try {
      axios.post(USER_DATA_UPDATE, {
        body: `User Registered: ${user.userName}`,
        title: "New User",
      });
    } catch {
      console.log("Not able to send mail");
    }
    axios
      .post(REGISTER_USER, user)
      .then((response) => {
        if (response.status === 200) {
          // Save data to localStorage
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setLoadingFinished(true);
        } else {
          handleSnackbarOpen("Registration failed. Email Already Exist!");
        }
      })
      .catch((error) => {
        handleSnackbarOpen("Registration failed. Email Already Exist!");
      });
  };

  // Redirect to "/dashboard" when loadingFinished is true
  React.useEffect(() => {
    if (loadingFinished) {
      // Delay the redirect for demonstration purposes
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [loadingFinished, navigate]);

  // Render the appropriate form for the active step
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormStep1
            formData={formData}
            setFormData={setFormData}
            onStepComplete={handleStep1Complete}
          />
        );
      case 1:
        return (
          <FormStep2
            formData={formData}
            setFormData={setFormData}
            onStepComplete={handleStep2Complete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {renderStepContent(activeStep)}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              variant="outlined"
              sx={{ color: "#1D267D" }}
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Set anchorOrigin to top center
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {loadingFinished && <LoadingProgressComp />}{" "}
      {/* Show the loading spinner when loadingFinished is true */}
    </Box>
  );
};

export default RegisterAboutYouComp;
