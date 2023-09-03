/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */
import React from "react";
import "./headerComp.css";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { Button, Stack, Tab } from "@mui/material";
import Box from "@mui/material/Box";
import SendQueryComp from "../sendQuery/sendQueryComp";
import { grey } from "@mui/material/colors";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

function HeaderComp({ changeDisplayOption, displayOption }) {
  const QueryTypeButton = styled(Button)(({ theme }) => ({
    height: "100%",
    width: "100%",
    padding: "10px 30px",
    fontWeight: 600,
    borderRadius: "50px",
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: "#1D267D",
    "&:hover": {
      backgroundColor: "#0C134F",
    },
  }));

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    changeDisplayOption(newValue === "1" ? "Pending" : "Answered");
  };

  return (
    <div>
      <Box className="queryHeaderContainer">
        <h1 className="header-title">Queries</h1>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Pending" value="1" />
                <Tab label="Answered" value="2" />
              </TabList>
            </Box>
            {/* <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel> */}
          </TabContext>
        </Box>

        {/* <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <QueryTypeButton
            variant="outlined"
            className={`header-button ${
              displayOption === "Pending" ? "buttonSelected" : ""
            }`}
            // fullWidth
            onClick={() => changeDisplayOption("Pending")}
          >
            Pending
          </QueryTypeButton>
          <QueryTypeButton
            variant="outlined"
            className={`header-button ${
              displayOption === "Pending" ? "buttonSelected" : ""
            }`}
            // fullWidth
            onClick={() => changeDisplayOption("Answered")}
          >
            Answered
          </QueryTypeButton>
          <SendQueryComp mentorId={"test123"} />
        </Stack> */}
        {/* <SendQueryComp mentorId={"test123"} /> */}
      </Box>
    </div>
  );
}

export default HeaderComp;
