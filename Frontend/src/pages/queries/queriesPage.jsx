/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 * Code resude from A1.
 */
import React, { useEffect, useState } from "react";
import HeaderComp from "../../Components/queries/header/headerComp";
import PageHeaderComp from "../../Components/header/headerComp";
import SidebarComp from "../../Components/queries/sidebar/sidebarComp";
import BodyComp from "../../Components/queries/body/bodyComp";
import "./queriesPage.css";
//import Querys from "../../assets/data/queries.json";
import { Grid } from "@mui/material";
import axios from "axios";
import { GET_QUERY } from "../../utils/apiUrls";
import { SnackbarProvider } from "notistack";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function QueriesPage(props) {
  const [value, setValue] = useState("");
  const handleUserClick = (user) => {
    setValue(user);
    console.log("Update id:", user);
  };

  const [Queries, setQueries] = useState([]);
  const [pendingQueryCount, setPendingQueryCount] = useState(0);
  const [answeredQueryCount, setAnsweredQueryCount] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const updateQueries = (queries) => {
    //debugger;
    setQueries(queries);

    console.log("Printing Quereies: ");
    console.log(Queries);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const localUser = JSON.parse(localStorage.getItem("user"));
      console.log("Printing local user:", localUser);

      if (!localUser) {
        navigate("/login");
      }

      const apiUrl = GET_QUERY;

      try {
        const response = await axios.post(apiUrl, {
          mentorId: localUser.userName,
        });
        updateQueries(response.data);

        console.log("Response", response);
        let pendCount = 0;
        let ansCount = 0;
        response.data.map((query, id) => {
          if (query.isResponded === false) {
            console.log("Adding pending");
            pendCount++;
          } else {
            console.log("Adding Answered");
            ansCount++;
          }
        });

        setPendingQueryCount(pendCount);
        setAnsweredQueryCount(ansCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [displayOption, updateDisplayOption] = useState("Pending");
  const changeDisplayOption = (option) => {
    updateDisplayOption(option);
    handleUserClick("");
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Function to show Snackbar
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  console.log(
    "Before return in page.. answer:",
    answeredQueryCount,
    "pending:",
    pendingQueryCount
  );

  return (
    <SnackbarProvider maxSnack={3}>
      <div className="queryPageBody">
        <div className="header">
          {/* <HeaderComp
          changeDisplayOption={changeDisplayOption}
          displayOption={displayOption}
        /> */}

          <PageHeaderComp
            pageTitle="Queries"
            changeDisplayOption={changeDisplayOption}
            displayOption={displayOption}
          />
        </div>

        <div className="belowHeader container">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={3} md={3}>
              <div className="side-bar item">
                <SidebarComp
                  handleUserClick={handleUserClick}
                  selectedUserId={value}
                  displayOption={displayOption}
                  Queries={Queries}
                  setPendingQueryCount={setPendingQueryCount}
                  setAnsweredQueryCount={setAnsweredQueryCount}
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={9} md={9}>
              <div className="body item">
                <BodyComp
                  userId={value}
                  selectedUserId={value}
                  updateQueries={updateQueries}
                  Queries={Queries}
                  changeDisplayOption={changeDisplayOption}
                  displayOption={displayOption}
                  pendingQueryCount={pendingQueryCount}
                  answeredQueryCount={answeredQueryCount}
                  setPendingQueryCount={setPendingQueryCount}
                  setAnsweredQueryCount={setAnsweredQueryCount}
                  showSnackbar={showSnackbar}
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    </SnackbarProvider>
  );
}

export default QueriesPage;
