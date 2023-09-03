/**
 * @author Amanjot Singh <am854663@dal.ca/B00942293>
 */
import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./stepForm1Comp.css";
import InfoIcon from "@mui/icons-material/Info";
import getAllUsernames from "../../../../utils/getAllUsers"; // Import the function to get usernames
// const ids = ["aman82", "jj98"];
import { Tooltip } from "@mui/material";
const FormStep1 = ({ formData, setFormData, onStepComplete }) => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [isTextFieldFilled, setIsTextFieldFilled] = React.useState(false);
  const [isIdUnique, setIsIdUnique] = React.useState(true); // State variable to track if the entered ID is unique
  const [usernames, setUsernames] = React.useState([]); // State variable to store the usernames
  const handleOptionToggle = (option) => {
    setSelectedOption((prevSelected) =>
      prevSelected === option ? null : option
    );
  };

  const multiselectOptions = [
    "I am eager to share my expertise with my Followers.",
    "I am interested in monetizing my audience.",
    "I'm just browsing.",
    // Add more options as needed
  ];

  const handleTextFieldChange = (event) => {
    const pageLink = event.target.value.trim();
    setIsTextFieldFilled(pageLink.length > 0);
    setFormData((prevFormData) => ({
      ...prevFormData,
      pageLink,
    }));

    // Check if the entered ID is unique
    setIsIdUnique(!usernames.includes(pageLink.toLowerCase()));
  };

  const handleStep1Complete = () => {
    const isValid = isTextFieldFilled && selectedOption !== null;
    onStepComplete(isValid);
  };
  React.useEffect(() => {
    // Fetch the usernames from the API using the function

    const fetchUsernames = async () => {
      try {
        const usernames = await getAllUsernames();
        setUsernames(usernames);
      } catch (error) {
        console.error("Error fetching usernames:", error);
        setUsernames([]); // Return an empty array in case of an error
      }
    };
    fetchUsernames();
  }, []);
  React.useEffect(() => {
    handleStep1Complete();
  }, [isTextFieldFilled, selectedOption, onStepComplete]);

  React.useEffect(() => {
    setSelectedOption(formData.plan);
  }, [formData.plan]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setFormData((prevFormData) => ({
      ...prevFormData,
      plan: option,
    }));
  };

  return (
    <div>
      <br />
      <h1 className="stepForm-form-header">
        Hello
        <span style={{ marginLeft: "6px", color: "#5C469C" }}>there!</span>{" "}
      </h1>
      <h2 className="stepForm-form-header-sub">
        Are you prepared to share your expertise? Let's get started!
      </h2>
      <br />
      <div className="content-wrapper">
        <h2 className="stepForms header-label">
          Your learnly page{" "}
          <span style={{ marginLeft: "2px", color: "#5C469C" }}>Link</span>{" "}
        </h2>

        <TextField
          label="Should be unique"
          id="outlined-start-adornment"
          sx={{
            width: "38.8ch",
            "@media (max-width: 600px)": {
              width: "100%",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">learnly.io/</InputAdornment>
            ),
          }}
          onChange={handleTextFieldChange}
          value={formData.pageLink}
          error={!isIdUnique} // Apply error style when isIdUnique is false
          helperText={!isIdUnique ? "Username Already exists!" : ""}
        />
        <Tooltip arrow title="User have to create services first" sx={{}}>
          <InfoIcon />
        </Tooltip>
        <br />
        <br />

        <h2 className="stepForms header-label">
          How do you plan to use{" "}
          <span style={{ marginLeft: "2px", color: "#5C469C" }}>Learnly</span> ?
        </h2>

        <Box sx={{ m: 1 }}>
          {multiselectOptions.map((option) => (
            <Button
              key={option}
              variant={selectedOption === option ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleOptionChange(option)}
              className={`toggleButton${
                selectedOption === option ? " selected" : ""
              }`}
              sx={{
                borderRadius: 1,
                padding: "0.6rem",
                margin: "0.25rem",
                width: "76%",
                textTransform: "none",
                justifyContent: "flex-start",
                color: "black",
                borderColor:
                  selectedOption === option ? "rgba(12, 19, 79, 0.6)" : "#ccc",
                backgroundColor:
                  selectedOption === option ? "#0C134F" : "transparent",
              }}
            >
              {option}
            </Button>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default FormStep1;
