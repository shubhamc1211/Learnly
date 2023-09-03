/**
 * This is the Contact Info Component.
 * Author: Taranjot Singh <tr548284@dal.ca/B00945917>
 */

// Import necessary components, icons, and styles
import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import UseMediaQuery from "@mui/material/useMediaQuery";

// ContactInfo functional component
export default function ContactInfo() {
  // UseMediaQuery to determine the screen size
  const isExtraSmallScreen = UseMediaQuery((theme) => theme.breakpoints.down("xs"));
  const isSmallScreen = UseMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMediumScreen = UseMediaQuery((theme) => theme.breakpoints.down("md"));
  const isLargeScreen = UseMediaQuery((theme) => theme.breakpoints.down("lg"));

  // Return the component JSX
  return (
    <Box>
      {/* Location information */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "80px" }}>
        <LocationOnIcon sx={{ marginRight: "8px", color: "#ffffff" }} />
        <Typography
          variant="body1"
          // Styles for location text
          sx={{
            fontWeight: "bold",
            marginRight: "8px",
            color: "#ffffff",
            fontSize: isExtraSmallScreen ? "10px" : isSmallScreen ? "12px" : isMediumScreen ? "14px" : isLargeScreen ? "14px" : "19px",
          }}
        >
          Address:
        </Typography>
        <Box>
          <Typography
            variant="body1"
            // Styles for address text
            sx={{
              color: "#ffffff",
              fontSize: isExtraSmallScreen ? "8px" : isSmallScreen ? "12px" : isMediumScreen ? "14px" : isLargeScreen ? "14px" : "19px",
              textAlign: isExtraSmallScreen ? "left" : isSmallScreen ? "left" : isMediumScreen ? "left" : "center",
            }}
          >
            3367 Berlin Street, Halifax, NS B3L 3B4
          </Typography>
        </Box>
      </Box>
      {/* Phone information */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "80px" }}>
        <PhoneIcon sx={{ marginRight: "8px", color: "#ffffff" }} />
        <Typography
          variant="body1"
          // Styles for phone text
          sx={{
            fontWeight: "bold",
            marginRight: "8px",
            color: "#ffffff",
            fontSize: isExtraSmallScreen ? "10px" : isSmallScreen ? "12px" : isMediumScreen ? "14px" : isLargeScreen ? "14px" : "19px",
          }}
        >
          Phone:
        </Typography>
        <Box>
          <Typography
            variant="body1"
            // Styles for phone number text
            sx={{
              color: "#ffffff",
              fontSize: isExtraSmallScreen ? "10px" : isSmallScreen ? "12px" : isMediumScreen ? "14px" : isLargeScreen ? "14px" : "19px",
            }}
          >
            +1 (902) 653-4837
          </Typography>
        </Box>
      </Box>
      {/* Email information */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "80px" }}>
        <EmailIcon sx={{ marginRight: "8px", color: "#ffffff" }} />
        <Typography
          variant="body1"
          // Styles for email text
          sx={{
            fontWeight: "bold",
            marginRight: "8px",
            color: "#ffffff",
            fontSize: isExtraSmallScreen ? "10px" : isSmallScreen ? "12px" : isMediumScreen ? "14px" : isLargeScreen ? "14px" : "19px",
          }}
        >
          Email:
        </Typography>
        <Box>
          <Typography
            variant="body1"
            // Styles for email address text
            sx={{
              color: "#ffffff",
              fontSize: isExtraSmallScreen ? "10px" : isSmallScreen ? "12px" : isMediumScreen ? "14px" : isLargeScreen ? "14px" : "19px",
            }}
          >
            info@learnly.com
          </Typography>
        </Box>
      </Box>
      {/* Website information */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "80px" }}>
        <LanguageIcon sx={{ marginRight: "8px", color: "#ffffff" }} />
        <Typography
          variant="body1"
          // Styles for website text
          sx={{
            fontWeight: "bold",
            marginRight: "8px",
            color: "#ffffff",
            fontSize: isExtraSmallScreen ? "10px" : isSmallScreen ? "12px" : isMediumScreen ? "14px" : isLargeScreen ? "14px" : "19px",
          }}
        >
          Website:
        </Typography>
        <Box>
          <Typography
            variant="body1"
            // Styles for website address text
            sx={{
              color: "#ffffff",
              fontSize: isExtraSmallScreen ? "10px" : isSmallScreen ? "12px" : isMediumScreen ? "14px" : isLargeScreen ? "14px" : "19px",
            }}
          >
            learnly.com
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
