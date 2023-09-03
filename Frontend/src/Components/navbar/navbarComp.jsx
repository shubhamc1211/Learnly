/**
 * @author Amanjot Singh <am854663@dal.ca/B00942293>
 */

import "./navbarComp.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import React, { useState } from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Drawer from "@mui/material/Drawer";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import LoginIcon from "@mui/icons-material/Login";
import ListItemText from "@mui/material/ListItemText";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MailIcon from "@mui/icons-material/Mail";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CategoryIcon from "@mui/icons-material/Category";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
function ResponsiveAppBar() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [drawerIsOpen, drawerSetIsOpen] = useState(false);

  const theme = useTheme();

  const location = useLocation();
  React.useEffect(() => {
    // let user1 = location?.state ?? null;
    let user1;
    if (user1 == null) {
      user1 = JSON.parse(localStorage.getItem("user"));
      console.log(user1);
    }
    setUser(user1);
  }, [location]);

  const isXS = useMediaQuery(theme.breakpoints.down("sm"));
  const isMD = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    drawerSetIsOpen(!drawerIsOpen);
  };

  const list = () => (
    <Box
      sx={{ width: isXS ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {user !== null && (
          <>
            <Link
              to="/bookings"
              underline="none"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <GroupsIcon style={{ color: "inherit" }} />
                  </ListItemIcon>
                  <ListItemText primary="Bookings" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/calendar"
              underline="none"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CalendarMonthIcon style={{ color: "inherit" }} />
                  </ListItemIcon>
                  <ListItemText primary="Calendar" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/queries"
              underline="none"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <QuestionAnswerIcon style={{ color: "inherit" }} />
                  </ListItemIcon>
                  <ListItemText primary="Queries" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/services"
              underline="none"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CategoryIcon style={{ color: "inherit" }} />
                  </ListItemIcon>
                  <ListItemText primary="Services" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/payments"
              underline="none"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountBalanceWalletIcon style={{ color: "inherit" }} />
                  </ListItemIcon>
                  <ListItemText primary="Payments" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/contact"
              underline="none"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon style={{ color: "inherit" }} />
                  </ListItemIcon>
                  <ListItemText primary="Contact us" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link
              to="/issues"
              underline="none"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <FeedbackIcon style={{ color: "inherit" }} />
                  </ListItemIcon>
                  <ListItemText primary="Report Issue" />
                </ListItemButton>
              </ListItem>
            </Link>
          </>
        )}

        {user === null ? (
          <Link
            to="/"
            underline="none"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <ListItemButton onClick={handleScroll}>
                <ListItemIcon>
                  <LiveHelpIcon style={{ color: "inherit" }} />
                </ListItemIcon>
                <ListItemText primary="FAQ" />
              </ListItemButton>
            </ListItem>
          </Link>
        ) : null}
        {user === null ? (
          <a href="/login" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LoginIcon style={{ color: "inherit" }} />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </a>
        ) : null}

        {user === null ? (
          <a
            href="/register"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AppRegistrationIcon style={{ color: "inherit" }} />
                </ListItemIcon>
                <ListItemText primary="Signup" />
              </ListItemButton>
            </ListItem>
          </a>
        ) : null}
      </List>
    </Box>
  );

  // const location = useLocation();
  // React.useEffect(() => {
  //   let user1 = location?.state ?? null;
  //   if (user1 == null) {
  //     user1 = JSON.parse(localStorage.getItem("user"));
  //   }
  //   setUser(user1);
  // }, [location]);

  const accountOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleScroll = () => {
    // Scroll to the FAQ component
    setTimeout(() => {
      const faqElement = document.getElementById("faq-container");
      if (faqElement) {
        faqElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);

    // Navigate to the home page ("/") if not already on it
    if (navigate && window.location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.localStorage.setItem("logout", Date.now()); // new
    setUser(null);
    handleClose();
    navigate("/");
  };

  const redirectToProfileSettings = () => {
    handleClose();
    navigate("/profile-settings");
  };
  const styles = {
    appBarBackground: { background: "#1D267D" },
  };

  console.log(user);

  return (
    <AppBar style={styles.appBarBackground} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {((isMD && user === null) || user !== null) && (
            <Button sx={{ padding: "0" }} onClick={toggleDrawer}>
              <MenuIcon style={{ color: "white" }} />
            </Button>
          )}

          <Drawer open={drawerIsOpen} onClose={toggleDrawer}>
            {list()}
          </Drawer>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LEARNLY
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              textAlign: "center",
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LEARNLY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {user == null ? (
              <Button
                key="FAQ"
                onClick={handleScroll}
                sx={{
                  fontSize: "1rem",
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: "500",
                }}
              >
                FAQ
              </Button>
            ) : null}
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {user === null ? (
              <Button
                href="/Login"
                color="inherit"
                style={{ color: "white", fontWeight: "1000" }}
              >
                Login
              </Button>
            ) : null}

            {user === null ? (
              <Button
                href="/register"
                color="inherit"
                style={{ color: "white", fontWeight: "1000" }}
              >
                Signup
              </Button>
            ) : null}
          </Box>
          {user !== null ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                ml: 2,
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={accountOpen ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={accountOpen ? "true" : undefined}
                >
                  <AccountCircleIcon sx={{ fontSize: 40, color: "white" }} />
                  {/* <Avatar sx={{ width: 32, height: 32 }}>Aman</Avatar> */}
                </IconButton>
              </Tooltip>
            </Box>
          ) : null}
        </Toolbar>
      </Container>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={accountOpen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={redirectToProfileSettings}>
          <Avatar /> Profile Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
export default ResponsiveAppBar;
