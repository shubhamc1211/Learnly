/**
* @author Taranjot Singh <tr548284@dal.ca/B00945917>
*/
import React, { useState, useEffect } from "react";
import "./blockdatesComp.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Calendar } from "react-multi-date-picker";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import axios from 'axios';
import { BLOCK_DATES, GET_UNAVAILABLE_DATES } from "../../../../utils/apiUrls";
import UseMediaQuery from "@mui/material/useMediaQuery";

export default function BlockDates() {
      // state variables
  const [showCalendarDialog, setShowCalendarDialog] = useState(false);
  const [selectedUnavailableDates, setSelectedUnavailableDates] = useState([]);
  const [fetchedUnavailableDates, setFetchedUnavailableDates] = useState([]);
  const [localUser, setLocalUser] = useState(null);

    // setting up media-queries
  const isLargeScreen = UseMediaQuery((theme) => theme.breakpoints.down("lg"));

  const today = new Date();

   // Creating a block dates button
  const BlockDatesButton = styled(Button)(({ theme }) => ({
    height: "28%",
    width: "100%",
    fontWeight: 600,
    marginTop: "10px",
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: "#1D267D",
    "&:hover": {
      backgroundColor: "#0C134F",
    },
  }));

  const handleCalendarDialogOpen = () => {
    setShowCalendarDialog(true);
  };

  const handleCalendarDialogClose = () => {
    setShowCalendarDialog(false);
  };

   // functions for handling block dates
  const handleBlockDates = async () => {
    try {
      const dates = [];
      for (let index = 0; index < selectedUnavailableDates.length; index++) {
        const day = selectedUnavailableDates[index].day;
        const month = selectedUnavailableDates[index].month;
        const year = selectedUnavailableDates[index].year;
        const date = year + "-" + month + "-" + day;
        dates.push(date);
      }
      console.log(dates);
      const BlockedDatesData = {
        mentorId: localUser.userName,
        dates: dates
      }
      const apiUrl = BLOCK_DATES;
      const response = await axios.post(apiUrl, BlockedDatesData);

      if (response.status === 201) {
        toast.success("Dates blocked successfully!");
      } else if (response.status === 200) {
        toast.success("Blocked Dates Updated Successfully");
      } else {
        toast.error("Failed to Block Dates");
      }

      handleCalendarDialogClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to Block Dates');
    }
  };

  useEffect(() => {
    // Fetch the unavailable dates from the backend API
    const localUser = JSON.parse(localStorage.getItem("user"));
    console.log("Printing local user:", localUser);
    setLocalUser(localUser);
    const fetchUnavailableDates = async () => {
      try {
        const apiUrl = GET_UNAVAILABLE_DATES;
        const params = {
          mentorId: localUser.userName,
        };
        const response = await axios.get(apiUrl, { params });
        const blockedDatesData = response?.data?.blockedDates;
        console.log(blockedDatesData);
        if (blockedDatesData) {
          const fetchedDates = blockedDatesData.dates.map((dateStr) => {
            const [year, month, day] = dateStr.split('-').map(Number);
            return new Date(year, month - 1, day); // Month is zero-based in JavaScript Dates
          });
          console.log(fetchedDates);
          setFetchedUnavailableDates(fetchedDates);
        }
        else {
          console.log("Blocked dates data not available.");
        }
      } catch (error) {
        if(error.response.status==404){
          console.log(error.response.data.message);
        }
        else{
          console.log(error);
          toast.error('Failed to fetch unavailable dates');
        }
      }
    };

    fetchUnavailableDates();
  }, []); // Empty dependency array to run the effect only once on component mount

  useEffect(() => {
    // Combine the selected dates and fetched dates into a single array
    const allDates = [...selectedUnavailableDates, ...fetchedUnavailableDates];
    setSelectedUnavailableDates(allDates);
  }, [fetchedUnavailableDates]);

  return (
    <>
      <Grid item sm={6}>
        <div className="block-dates" style={{ marginLeft: isLargeScreen ? "60px" : "" }}>
          <h2>Block Dates</h2>
          <p>Add dates when you will be unavailable to take calls</p>
          <BlockDatesButton variant="contained" fullWidth onClick={handleCalendarDialogOpen}>
            Add Unavailable Dates
          </BlockDatesButton>

          <Dialog open={showCalendarDialog} onClose={handleCalendarDialogClose}>
            <DialogTitle align="left" fontSize={"18px"} fontWeight={"bold"}>Select Unavailable Dates
              <Button onClick={handleCalendarDialogClose} color="primary" style={{ position: 'absolute', top: 13, right: 0 }}>
                X
              </Button>
            </DialogTitle>
            <DialogContent>
              <Calendar
                value={selectedUnavailableDates}
                onChange={setSelectedUnavailableDates}
                multiple
                sort
                layout="landscape"
                minDate={today}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCalendarDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleBlockDates} color="primary">
                Block Dates
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Grid>
    </>
  );
}