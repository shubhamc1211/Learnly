/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { DELETE_SERVICE_DETAILS } from "../../../utils/apiUrls";
import "./deleteConfirmComp.css";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

import { Button, Grid, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 250,
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DeleteConfirmComp({ handleDeleteQuery }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleDelete = async (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();

  //   console.log("Delete clicked..");

  //   // Check if all fields are filled before saving
  //   const localUser = JSON.parse(localStorage.getItem("user"));
  //   const mentorId = localUser.userName;
  //   // Here, you can save the data or perform any desired action
  //   const apiUrl = DELETE_SERVICE_DETAILS;

  //   try {
  //     const response = await axios.post(apiUrl, { _id: service._id });
  //     console.log(response.data);
  //     changeDisplayOption(service.serviceType);
  //     handleClose();
  //     //   changeDisplayOption(selectedService);
  //   } catch (error) {
  //     console.error("Error DEleteing Service:", error);
  //   }

  //   return;
  // };

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

  return (
    <div className="sendQueryStudentDiv">
      <Button
        variant="text"
        className="deleteButton"
        onClick={() => handleOpen()}
        color="error"
        // startIcon={}
      >
        <DeleteIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
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
          <Typography variant="h6" sx={{ marginRight: "3px" }}>
            Are you sure you want to delete the Query?
          </Typography>
          <Grid container spacing={1} marginTop={"5px"}>
            <Grid item sm={6}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item sm={6}>
              <Button
                color="error"
                variant="contained"
                fullWidth
                onClick={(e) => handleDeleteQuery(e)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
