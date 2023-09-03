/**
 * This component provides a form for mentors to add new services to their profile.
 * It includes fields for selecting service type, title, duration, and price.
 * @param {function} changeDisplayOption - Callback to change the display option.
 * @param {function} showSnackbar - Callback to show a snackbar notification.
 * @returns The component for adding mentor services.
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// Import necessary dependencies
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { PUT_SERVICE_DETAILS, SAVE_QUERY } from "../../../utils/apiUrls";
import "./addMentorServicesComp.css";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

import { MenuItem, Select, TextField, Button, Typography } from "@mui/material";
import { InputAdornment } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 250,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Define the AddMentorServicesComp functional component
export default function AddMentorServicesComp({
  changeDisplayOption,
  showSnackbar,
}) {
  // State for modal open/close
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // State for form fields
  const [selectedService, setSelectedService] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  // Validation states and helper texts
  const [isValidTitle, setisValidTitle] = useState(true);
  const [isValidDuration, setisValidDuration] = useState(true);
  const [isValidPrice, setisValidPrice] = useState(true);

  const [titleHelperText, setTitleHelperText] = useState("");
  const [durationHelperText, setDurationHelperText] = useState("");
  const [priceHelperText, setPriceHelperText] = useState("");

  // Available service types
  const services = [
    { id: "1:1", name: "1:1" },
    { id: "Query", name: "Query" },
    { id: "Webniar", name: "Webniar" },
  ];

  // Handlers for form field changes
  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const checkTitle = () => {
    if (title.trim() === "") {
      setisValidTitle(false);
      setTitleHelperText("Can not be Empty");

      return false;
    }

    setisValidTitle(true);
    setTitleHelperText("");
    return true;
  };

  const checkDuration = () => {
    console.log("printing duration", duration, Number(duration));
    if (duration.trim() === "") {
      setisValidDuration(false);
      setDurationHelperText("Can not be Empty");

      return false;
    } else if (isNaN(Number(duration))) {
      setisValidDuration(false);
      setDurationHelperText("Must be a Number");

      return false;
    } else if (Number(duration) <= 10) {
      setisValidDuration(false);
      setDurationHelperText("Duration must be more that 10 minutes");

      return false;
    }

    setisValidDuration(true);
    setDurationHelperText("");
    return true;
  };

  const checkPrice = () => {
    if (price.trim() === "") {
      setisValidPrice(false);
      setPriceHelperText("Can not be Empty");

      return false;
    } else if (isNaN(Number(price))) {
      setisValidPrice(false);
      setPriceHelperText("Must be a Number");

      return false;
    } else if (Number(price) < 0) {
      setisValidPrice(false);
      setPriceHelperText("Price can not be less than 0");

      return false;
    }

    setisValidPrice(true);
    setPriceHelperText("");
    return true;
  };

  // Submit form handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("Submit clicked..");

    const isTitle = checkTitle();
    const isDuration = checkDuration();
    const isPrice = checkPrice();

    // Check if all fields are filled before saving
    if (selectedService && isTitle && isDuration && isPrice) {
      const localUser = JSON.parse(localStorage.getItem("user"));
      const mentorId = localUser.userName;
      // Here, you can save the data or perform any desired action
      console.log("Data saved:", { selectedService, title, duration, price });
      const apiUrl = PUT_SERVICE_DETAILS;

      const postData = {
        serviceName: title,
        time: duration,
        price: price,
        description: "",
        code: "",
        percentage: "",
        serviceType: selectedService,
        mentorId: mentorId,
      };
      try {
        const response = await axios.post(apiUrl, postData);
        console.log(response.data);
        showSnackbar("Service Created", "success");
        setDuration("");
        setTitle("");
        setPrice("");
        handleClose();
        changeDisplayOption(selectedService);
      } catch (error) {
        console.error("Error saving service:", error);
        showSnackbar("Error: Not able create Service", "error");
      }
    } else {
      console.log("Loging data", {
        isValidTitle,
        titleHelperText,
        isValidDuration,
        durationHelperText,
        isValidPrice,
        priceHelperText,
      });
      return;
    }
  };

  // Styled component for Save button
  const SaveButton = styled(Button)(({ theme }) => ({
    height: "100%",
    padding: "10px 30px",
    fontWeight: 600,
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: "#1D267D",
    "&:hover": {
      backgroundColor: "#0C134F",
    },
  }));

  // Styled component for Add Services button
  const AddServicesButton = styled(Button)(({ theme, showSelected }) => ({
    height: "100%",
    padding: "10px 30px",
    fontWeight: 600,
    border: "solid black 1px",
    borderRadius: "50px",
    pointerEvents: showSelected ? "none" : "auto",
    color: showSelected
      ? theme.palette.getContrastText(grey[900])
      : theme.palette.getContrastText(grey[50]),
    backgroundColor: showSelected ? "#1D267D" : grey[50],
    "&:hover": {
      backgroundColor: showSelected ? "none" : "#D4ADFC",
    },
  }));

  // Render the component
  return (
    <div className="sendQueryStudentDiv">
      <AddServicesButton color="primary" onClick={handleOpen}>
        <AddIcon /> Add Services
      </AddServicesButton>
      <Modal
        open={open}
        onClose={handleClose}
        className="sendQueryStudentModal"
      >
        <Box sx={style}>
          <div className="buttonUpperDiv">
            <Button
              variant="text"
              className="closeButton"
              onClick={(e) => handleClose(e)}
            >
              <CloseIcon />
            </Button>
          </div>
          <Typography
            variant="h6"
            component="div"
            textAlign="center"
            sx={{ marginBottom: "5px" }}
          >
            <span style={{ fontWeight: 600 }}>Create a new </span>
            <span style={{ color: "#5C469C", fontWeight: 600 }}>Service</span>
          </Typography>

          <form onSubmit={(event) => handleSubmit(event)}>
            <div style={{ marginBottom: "3px" }}>
              <label>
                Select service:
                <Select
                  value={selectedService}
                  onChange={handleServiceChange}
                  required
                >
                  {services.map((service) => (
                    <MenuItem key={service.id} value={service.id}>
                      {service.name}
                    </MenuItem>
                  ))}
                </Select>
              </label>
            </div>
            <TextField
              label="Title"
              value={title}
              onChange={handleTitleChange}
              fullWidth
              helperText={titleHelperText}
              error={!isValidTitle}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Duration"
              value={duration}
              onChange={handleDurationChange}
              fullWidth
              helperText={durationHelperText}
              error={!isValidDuration}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">minutes</InputAdornment>
                ),
              }}
            />
            <TextField
              label="Price"
              value={price}
              onChange={handlePriceChange}
              fullWidth
              helperText={priceHelperText}
              error={!isValidPrice}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
            <SaveButton type="submit" variant="contained" fullWidth>
              Save
            </SaveButton>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
