/**
 * @author Shivam Lakhanpal <sh475218@dal.ca/B00932887>
 */

import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import "./EditBookingComp.css";
import {
  CANCEL_MENTOR_BOOKING,
  RESCHEDULE_MENTOR_BOOKING,
} from "../../../utils/apiUrls";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";

function EditBookingComp({ booking, onReschedule, onCancel }) {
  // Local component state for managing snackbar, dialogs, and selected times.
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(dayjs());
  const today = dayjs().startOf("day");

  const handleDialogOpen = (type) => {
    setActionType(type);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setActionType(null);
  };

  const handleReschedule = async () => {
    if (selectedDate && selectedTime) {
      // Combine date and time
      const combinedDateTime = selectedDate
        .hour(selectedTime.hour())
        .minute(selectedTime.minute());

      try {
        await axios.post(RESCHEDULE_MENTOR_BOOKING, {
          bookingId: booking.bookingId,
          newTime: combinedDateTime.format(),
        });
        setSnackbarMessage(
          `Rescheduled to ${combinedDateTime.format("YYYY-MM-DD HH:mm")}`
        );
        setSnackbarOpen(true);
        onReschedule();
      } catch (error) {
        setSnackbarMessage("Error rescheduling. Please try again.");
        setSnackbarOpen(true);
      }
      handleDialogClose();
    }
  };

  // Handle booking cancellation
  const handleCancel = async () => {
    try {
      console.log(booking);
      await axios.post(CANCEL_MENTOR_BOOKING, { bookingId: booking.bookingId });
      setSnackbarMessage("Booking canceled.");
      setSnackbarOpen(true);
      onCancel();
    } catch (error) {
      setSnackbarMessage("Error canceling. Please try again.");
      setSnackbarOpen(true);
    }
    handleDialogClose();
  };

  return (
    <div className="edit-booking">
      <Button
        className="cancel-booking-button"
        variant="contained"
        color="secondary"
        onClick={() => handleDialogOpen("cancel")}
      >
        Cancel Booking
      </Button>

      <Button
        className="reschedule-booking-button"
        variant="contained"
        color="primary"
        onClick={() => handleDialogOpen("reschedule")}
      >
        Reschedule Booking
      </Button>

      {/* Dialog for confirmations */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        {actionType === "reschedule" ? (
          <>
            <DialogTitle>Reschedule Booking</DialogTitle>
            <DialogContent>
              <DialogContentText>Suggest a new time:</DialogContentText>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(dayjs(date))}
                  minDate={today}
                />
                <TimePicker
                  value={selectedTime}
                  onChange={(time) => setSelectedTime(dayjs(time))}
                  label="Basic time picker"
                />
              </LocalizationProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleReschedule} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>Confirm Cancellation</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to cancel this booking?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                No
              </Button>
              <Button onClick={handleCancel} color="secondary">
                Yes
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <Button
            color="secondary"
            size="small"
            onClick={() => setSnackbarOpen(false)}
          >
            Close
          </Button>
        }
      />
    </div>
  );
}

export default EditBookingComp;
