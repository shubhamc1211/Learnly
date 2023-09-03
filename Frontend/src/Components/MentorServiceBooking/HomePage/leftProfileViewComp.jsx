//refernce: https://mui.com/material-ui/react-avatar/

/**
 * @author Shivam Lakhanpal <sh475218@dal.ca/B00932887>
 */

import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { Box, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./leftServiceViewComp.css";
import SendQueryComp from "../../queries/sendQuery/sendQueryComp";
import { GET_MENTOR_DETAILS } from "../../../utils/apiUrls";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 125,
      height: 125,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const LeftServiceViewComp = () => {
  const [mentor, setMentor] = useState({});
  const location = useLocation();
  const mentorId = location.pathname.split("/")[2];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [avatarSize, setAvatarSize] = useState({
    width: 100,
    height: 100,
  });

  const [responsiveStyles, setResponsiveStyles] = useState({
    avatar: {
      width: 100,
      height: 100,
    },
    mentorName: {
      fontSize: "2rem",
    },
    mentorQuery: {
      fontSize: "1rem",
    },
  });

  useEffect(() => {
    fetch(GET_MENTOR_DETAILS + "/" + mentorId)
      .then((response) => response.json())
      .then((data) => setMentor(data.user));
  }, [mentorId]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        // mobile
        setResponsiveStyles({
          avatar: { width: 60, height: 60 },
          mentorName: { fontSize: "1.5rem" },
          mentorQuery: { fontSize: "0.8rem" },
        });
      } else if (window.innerWidth <= 768) {
        // tablet
        setResponsiveStyles({
          avatar: { width: 80, height: 80 },
          mentorName: { fontSize: "1.8rem" },
          mentorQuery: { fontSize: "0.9rem" },
        });
      } else {
        // desktop
        setResponsiveStyles({
          avatar: { width: 100, height: 100 },
          mentorName: { fontSize: "2rem" },
          mentorQuery: { fontSize: "1rem" },
        });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // call it once to set the initial size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const mentorName = mentor ? `${mentor.firstName} ${mentor.lastName}` : "";
  console.log(mentor);
  return (
    <Box className="mentorBox">
      <Avatar {...stringAvatar(mentorName)} style={responsiveStyles.avatar} />
      {/* <Button onClick={handleOpen}>Open modal</Button> */}

      <Typography
        variant="h4"
        className="mentorName"
        style={responsiveStyles.mentorName}
      >
        {mentorName}
      </Typography>
      <Typography
        variant="body1"
        className="mentorQuery"
        style={responsiveStyles.mentorQuery}
      >
        Have a query with our mentor?
      </Typography>

      {/* Added This Comp here to ask queries */}
      <SendQueryComp mentorName={mentorName} mentorId={mentorId} />

      <Button
        sx={{
          marginTop: 1,
          bgcolor: "#1D267D",
          color: "white",
          "&:hover": {
            bgcolor: "#0C134F", // Set your desired hover color here
          },
        }}
        onClick={handleOpen}
        variant="contained"
      >
        Know more
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {mentor.displayName}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {mentor.aboutYou}
            </Typography>
            <br />
            {mentor.expertise
              ? mentor.expertise.map((option) => (
                  <Button
                    key={option}
                    variant="contained"
                    color="primary"
                    onClick={() => {}}
                    className="toggleButton"
                    sx={{
                      bgcolor: "#1D267D",
                      margin: "1px",
                      color: "white",
                      "&:hover": {
                        bgcolor: "#0C134F", // Set your desired hover color here
                      },
                    }}
                  >
                    {option}
                  </Button>
                ))
              : ""}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default LeftServiceViewComp;
