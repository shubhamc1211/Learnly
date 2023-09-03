// Author: Aadith Shameel - B00929852
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { GET_ALL_ISSUES } from "../../utils/apiUrls";

const ReportPage = () => {
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();
  const localUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    //Checking if the user is logged in
    const checkLogin = async () => {
      
      console.log("Printing local user:", localUser);

      if (!localUser) {
        navigate("/login");
      }
    };

    checkLogin();
  }, []);

  // Fetching issues made only by the user
  const fetchIssues = async () => {
    try {
      const res = await fetch(GET_ALL_ISSUES + `/${localUser.userName}`);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const issuesData = await res.json();
      setIssues(issuesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);
  
  //Customizing submit button
  const ReportIssueButton = styled(Button)(({ theme }) => ({
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
    <Container
      style={{ paddingTop: "10%", minHeight: "100vh", textAlign: "center" }}
    >
      <Typography variant="h3" align="left" style={{ marginBottom: "5%" }}>
        Reported Issues
      </Typography>
      {/* Creating Cards for all issues */}
      {issues.map((issue) => (
        <Card key={issue._id} style={{ marginBottom: "1rem" }}>
          <CardActionArea onClick={() => navigate(`/issue/${issue._id}`)}>
            <CardContent>
              <Typography variant="h5" align="left">
                {issue.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
      {/* Left side of && becomes ture if there are no issues. So the right side is checked. Since it is a  component, it gets rendered*/}
      {issues.length === 0 && (
        <Typography variant="h4">No Issues Raised</Typography>
      )}
      <ReportIssueButton
        variant="contained"
        href="/issue/new"
        style={{ marginTop: "5%" }}
      >
        Report Issue
      </ReportIssueButton>
    </Container>
  );
};

export default ReportPage;
