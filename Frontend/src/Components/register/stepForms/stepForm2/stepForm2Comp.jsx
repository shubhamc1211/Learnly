/**
 * @author Amanjot Singh <am854663@dal.ca/B00942293>
 */
import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./stepForm2Comp.css";

const FormStep2 = ({ formData, setFormData, onStepComplete }) => {
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const handleOptionToggle = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const multiselectOptions = [
    "Cybersecurity",
    "Law",
    "Content & Branding",
    "Others",
    "HR",
    "Software",
    "Product",
    "Study Abroad",
    "Finance",
    "Design",
    "Data",
    "Astrology",
    "Mental Health & Wellbeing",
    "Marketing",
    // Add more options as needed
  ];

  React.useEffect(() => {
    // Check if at least one option is selected
    const isValid = selectedOptions.length > 0;
    onStepComplete(isValid);
  }, [selectedOptions, onStepComplete]);

  React.useEffect(() => {
    setFormData((prevData) => ({ ...prevData, expertise: selectedOptions }));
  }, [selectedOptions, setFormData]);

  return (
    <div>
      <br />
      <h1 className="stepForm2-form-header">
        Let's incorporate some
        <span style={{ marginLeft: "6px", color: "#5C469C" }}>
          services...
        </span>{" "}
      </h1>
      <h2 className="stepForm2-form-header-sub">
        We will help you set up a few areas of expertise
      </h2>
      <br />
      <div className="stepForm2-content-wrapper">
        <h2 className="stepForms2 header-label">Select your expertise</h2>

        <Box
          sx={{
            m: 1,
            display: "flex",
            flexWrap: "wrap",
            width: "350px", // Set the desired width of the Box
          }}
        >
          {multiselectOptions.map((option) => (
            <Button
              key={option}
              variant={
                selectedOptions.includes(option) ? "contained" : "outlined"
              }
              color="primary"
              onClick={() => handleOptionToggle(option)}
              className={`toggleButton${
                selectedOptions.includes(option) ? " selected" : ""
              }`}
              sx={{
                borderRadius: 1,
                padding: "0.6rem",
                margin: "0.25rem",
                textTransform: "none",
                color: "black",
                borderColor: selectedOptions.includes(option)
                  ? "rgba(12, 19, 79, 0.6)"
                  : "#ccc",
                backgroundColor: selectedOptions.includes(option)
                  ? "#0C134F"
                  : "transparent",
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

export default FormStep2;
