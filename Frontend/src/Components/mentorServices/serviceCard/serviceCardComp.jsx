/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Typography,
  Grid,
  Box,
  Divider,
  Button,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./serviceCardComp.css";

import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditMentorServicesComp from "../editMentorServices/editMentorServicesComp";
import { FRONTEND_DOMAIN } from "../../../utils/apiUrls";
import DeleteConfirmComp from "../deleteConfirm/deleteConfirmComp";

const ServiceCardComp = ({ service, changeDisplayOption, showSnackbar }) => {
  const shareLink = useRef("abcxyz");
  const location = useLocation();

  const navigate = useNavigate();

  const handleShareButton = () => {
    console.log("share button click..", shareLink, shareLink.current);
    if (shareLink.current) {
      const textElement = shareLink.current;
      textElement.select();
      document.execCommand("copy");
      showSnackbar("Link Copied. Redirecting to Mentor Service Page", "info");
      // Optionally, you can add some visual feedback for the user
      // alert("Text copied to clipboard!");
    }
    navigate(`/mentorServiceBooking/${service.mentorId}`);
  };

  return (
    <div className="serviceCardCompDiv">
      <input
        ref={shareLink}
        value={`${FRONTEND_DOMAIN}mentorServiceBooking/${service.mentorId}`}
        style={{ position: "absolute", left: "-9999px" }}
        readOnly
      />
      <Card
        elevation={5}
        className="service-card-comp"
        // onClick={() => handleServiceClick("")}
      >
        <div className="detail-box-card-comp">
          {/* <Box className="icon-box">
            <CalendarMonthIcon color="disabled" />
          </Box> */}
          <Typography
            variant="h5"
            className="service-name"
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: "45%",
            }}
          >
            {service.serviceName}
          </Typography>

          {/* <Divider sx={{ my: 2 }} /> */}
          <Box className="detail-box">
            <Typography variant="h5" sx={{ marginRight: "3px" }}>
              <AccessTimeIcon />
              {service.time} min
            </Typography>
            {/* <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ color: "red" }}
            /> */}
            <Typography
              variant="h5"
              sx={{ borderLeft: "solid grey 1px", paddingLeft: "3px" }}
            >
              {/* <AttachMoneyIcon /> */}${service.price}
            </Typography>
          </Box>
        </div>
        <Divider sx={{ my: 2 }} />
        <Box className="detail-box">
          <div className="detail-box-left">
            <Button
              variant="text"
              className="deleteButton"
              onClick={(e) => handleShareButton(e)}
              color="primary"
            >
              <Tooltip title="Go to Mentor Service Page" placement="bottom">
                <ShareIcon sx={{ margin: "0" }} />
              </Tooltip>
            </Button>
            <Tooltip title="Edit Service" placement="bottom">
              <EditMentorServicesComp
                service={service}
                changeDisplayOption={changeDisplayOption}
                showSnackbar={showSnackbar}
              />
            </Tooltip>
          </div>
          <DeleteConfirmComp
            service={service}
            changeDisplayOption={changeDisplayOption}
            showSnackbar={showSnackbar}
          />
        </Box>
        {/* <Box className="icon-box-right">
          <KeyboardArrowRightIcon color="disabled" />
        </Box> */}
      </Card>
    </div>
  );
};

export default ServiceCardComp;
