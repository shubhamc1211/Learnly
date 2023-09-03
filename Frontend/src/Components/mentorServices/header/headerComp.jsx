/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */
import "./headerComp.css";
import React, { useState } from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { Button, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import AddMentorServicesComp from "../addMentorServices/addMentorServicesComp";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 330,
      sm: 380,
      md: 430,
      lg: 1100,
      xl: 1450,
    },
  },
});

const HeaderButton = styled(Button)(({ theme, showSelected }) => ({
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

// const CalendarButton = styled(Button)(({ theme, showSelected }) => ({
//   height: "100%",
//   padding: "10px 30px",
//   fontWeight: 600,
//   borderRadius: "50px",
//   pointerEvents: showSelected ? "none" : "auto",
//   color: showSelected
//     ? theme.palette.getContrastText(grey[900])
//     : theme.palette.getContrastText(grey[50]),
//   backgroundColor: showSelected ? "#1D267D" : grey[50],
//   "&:hover": {
//     backgroundColor: showSelected ? "none" : "#D4ADFC",
//   },
// }));

export default function PageHeaderComp({
  pageTitle,
  changeDisplayOption,
  displayOption,
  showSnackbar,
}) {
  // State variables to manage the selected component
  // const [seleactedButton, setSeleactedButton] = useState("1:1");

  // Event handler for when the Schedule button is clicked
  const handleSelectedButtonChange = (type) => {
    console.log(type);
    // setSeleactedButton(type);
    changeDisplayOption(type);
  };

  return (
    <div className="pagesHeaderCompDiv">
      <div className="pagesHeaderCompInnerDiv">
        <h1 className="pagesHeaderCompH1Title">{pageTitle.toUpperCase()}</h1>

        <div style={{ display: "flex" }}>
          <div>
            <Grid container spacing={2}>
              <Grid item sm={0}>
                <HeaderButton
                  variant="contained"
                  onClick={() => handleSelectedButtonChange("1:1")}
                  fullWidth
                  showSelected={displayOption == "1:1"}
                >
                  1:1
                </HeaderButton>
              </Grid>
              <Grid item sm={0}>
                <HeaderButton
                  variant="contained"
                  onClick={(e) => handleSelectedButtonChange("Query")}
                  fullWidth
                  showSelected={displayOption == "Query"}
                >
                  Query
                </HeaderButton>
              </Grid>
              <Grid item sm={0}>
                <HeaderButton
                  variant="contained"
                  onClick={(e) => handleSelectedButtonChange("Webniar")}
                  fullWidth
                  showSelected={displayOption == "Webniar"}
                >
                  Webniar
                </HeaderButton>
              </Grid>
            </Grid>
          </div>
          <div style={{ marginLeft: "auto" }}>
            {/* <Grid item sm={0}> */}
            <AddMentorServicesComp
              HeaderButton={HeaderButton}
              changeDisplayOption={changeDisplayOption}
              displayOption={displayOption}
              showSnackbar={showSnackbar}
            />
            {/* </Grid> */}
            {/* </Grid> */}
          </div>
        </div>
      </div>
    </div>
  );
}
