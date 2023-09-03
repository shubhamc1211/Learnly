/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */
import React, { useState } from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
// import { TextField, Typography, Divider } from "@mui/material";
import axios from "axios";
import { UPDATE_SERVICE_DETAILS } from "../../../utils/apiUrls";
import "./editMentorServicesComp";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";

import {
  MenuItem,
  Select,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  Typography,
  Tooltip,
} from "@mui/material";
import { InputAdornment } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 250,
  minHeight: "500px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditMentorServicesComp({
  service,
  changeDisplayOption,
  showSnackbar,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setPageTab("Basic");
    setOpen(false);
  };

  const [selectedService, setSelectedService] = useState(service.serviceType);
  const [title, setTitle] = useState(service.serviceName);
  const [duration, setDuration] = useState(service.time);
  const [price, setPrice] = useState(service.price);
  const [description, setDescription] = useState(service.description);
  const [code, setCode] = useState(service.code);
  const [percentage, setPercentage] = useState(service.percentage);

  const [isValidTitle, setisValidTitle] = useState(true);
  const [isValidDuration, setisValidDuration] = useState(true);
  const [isValidPrice, setisValidPrice] = useState(true);
  const [isValidCode, setisValidCode] = useState(true);
  const [isValidPercentage, setisValidPercentage] = useState(true);

  const [titleHelperText, setTitleHelperText] = useState("");
  const [durationHelperText, setDurationHelperText] = useState("");
  const [priceHelperText, setPriceHelperText] = useState("");
  const [codeHelperText, setCodeHelperText] = useState("");
  const [percentageHelperText, setPercentageHelperText] = useState("");

  const [pageTab, setPageTab] = useState("Basic");

  const handleTabChange = (event, newTab) => {
    setPageTab(newTab);
  };

  const services = [
    { id: "1:1", name: "1:1" },
    { id: "Query", name: "Query" },
    { id: "Webniar", name: "Webniar" },
  ];

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

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handlePercentageChange = (event) => {
    setPercentage(event.target.value);
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

  const checkCode = () => {
    if (code.trim() === "" && percentage.trim() !== "") {
      setisValidCode(false);
      setCodeHelperText("To set the discount %, Code is required");

      return false;
    }
    setisValidCode(true);
    setCodeHelperText("");
    return true;
  };

  const checkPercentage = () => {
    if (percentage.trim() === "" && code.trim() !== "") {
      setisValidPercentage(false);
      setPercentageHelperText("To set the discount Code, % is required");

      return false;
    } else if (isNaN(Number(percentage))) {
      setisValidPercentage(false);
      setPercentageHelperText("Must be a Number");

      return false;
    } else if (Number(percentage) < 0) {
      setisValidPercentage(false);
      setPercentageHelperText("Percentage can not be less than 0");

      return false;
    }

    setisValidPercentage(true);
    setPercentageHelperText("");
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("Submit clicked..");

    const isTitle = checkTitle();
    const isDuration = checkDuration();
    const isPrice = checkPrice();
    const isCode = checkCode();
    const isPercentage = checkPercentage();

    // Check if all fields are filled before saving
    if (
      selectedService &&
      isTitle &&
      isDuration &&
      isPrice &&
      isCode &&
      isPercentage
    ) {
      // Here, you can save the data or perform any desired action
      console.log("Data saved:", {
        selectedService,
        title,
        duration,
        description,
        price,
        code,
        percentage,
      });

      const apiUrl = UPDATE_SERVICE_DETAILS;
      // const mentorId = service.mentorId;

      const postData = {
        _id: service._id,
        serviceName: title,
        time: duration,
        price: price,
        description: description,
        code: code,
        percentage: percentage,
        serviceType: selectedService,
        mentorId: service.mentorId,
      };
      try {
        console.log("PostData", postData);
        const response = await axios.post(apiUrl, postData);
        console.log(response.data);
        // changeDisplayOption("Query");
        changeDisplayOption(selectedService);
        showSnackbar("Service updated Successfuly", "success");
        handleClose();
        // changeDisplayOption(selectedService);
      } catch (error) {
        console.error("Error Editing Serivce:", error);
        showSnackbar("Failed to update Service", "error");
      }
    } else {
      // alert("Please fill all the fields before saving.");
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

  const AddServicesButton = styled(Button)(({ theme, showSelected }) => ({
    height: "100%",
    padding: "10px 30px",
    fontWeight: 600,
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

  return (
    <div className="sendQueryStudentDiv">
      <Button
        variant="text"
        className="deleteButton"
        onClick={(e) => handleOpen(e)}
        color="inherit"
        // startIcon={}
      >
        <Tooltip title="Edit Service" placement="bottom">
          <EditIcon />
        </Tooltip>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
        className="sendQueryStudentModal"
        // sx={{ minHeight: "550px" }}
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
            <span style={{ fontWeight: 600 }}>Edit Service </span>
            <span style={{ color: "#5C469C", fontWeight: 600 }}>
              {service.serviceName}
            </span>
          </Typography>

          <ToggleButtonGroup
            value={pageTab}
            exclusive
            onChange={handleTabChange}
            aria-label="text alignment"
          >
            <ToggleButton value="Basic" aria-label="Basic">
              Basic
            </ToggleButton>
            <ToggleButton value="Price" aria-label="Price">
              Price
            </ToggleButton>
          </ToggleButtonGroup>
          <Divider variant="middle" flexItem sx={{ marginBottom: "10px" }} />

          <form onSubmit={(event) => handleSubmit(event)}>
            {pageTab === "Basic" ? (
              <>
                <div style={{ marginBottom: "3px" }}>
                  <label>
                    Select service:
                    <Select
                      value={selectedService}
                      onChange={handleServiceChange}
                      required
                    >
                      {services.map((serviceName) => (
                        <MenuItem key={serviceName.id} value={serviceName.id}>
                          {serviceName.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </label>
                </div>
                <TextField
                  label="Title"
                  value={title}
                  onChange={handleTitleChange}
                  // required
                  fullWidth
                  helperText={titleHelperText}
                  error={!isValidTitle}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Duration"
                  value={duration}
                  onChange={handleDurationChange}
                  // required
                  fullWidth
                  helperText={durationHelperText}
                  error={!isValidDuration}
                  // type="number"
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">minutes</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Description"
                  multiline
                  rows={4} // You can adjust the number of rows as needed
                  value={description}
                  onChange={handleDescriptionChange}
                  fullWidth
                  // helperText={descriptionHelperText}
                  // error={isValidDescription}
                  sx={{ mb: 2 }}
                />
              </>
            ) : (
              <>
                <TextField
                  label="Price"
                  value={price}
                  onChange={handlePriceChange}
                  // required
                  fullWidth
                  // type="number"
                  helperText={priceHelperText}
                  error={!isValidPrice}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Code"
                  value={code}
                  onChange={handleCodeChange}
                  // required
                  fullWidth
                  // type="number"
                  helperText={codeHelperText}
                  error={!isValidCode}
                  sx={{ mb: 2 }}
                />

                <TextField
                  label="Percentage"
                  value={percentage}
                  onChange={handlePercentageChange}
                  // required
                  fullWidth
                  // type="number"
                  helperText={percentageHelperText}
                  error={!isValidPercentage}
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                />
              </>
            )}
            <SaveButton type="submit" variant="contained" fullWidth>
              Update
            </SaveButton>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
