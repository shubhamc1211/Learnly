/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UserCardComp from "../userCard/userCardComp";
import "./bodyComp.css";
import { Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { SEND_RESPONSE, DELETE_QUERY } from "../../../utils/apiUrls";
import { useSnackbar } from "notistack";
import DeleteConfirmComp from "../deleteConfirm/deleteConfirmComp";

function BodyComp(props) {
  const [textareaValue, setTextareaValue] = useState("");
  const [isResponseEmpty, setIsResponseEmpty] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const showSnackbar = props.showSnackbar;
  console.log("Props:", props);

  const handleTextareaChange = (event) => {
    setTextareaValue(event?.target?.value);
    if (textareaValue !== "") {
      setIsResponseEmpty(false);
    }
  };

  async function handleDeleteQuery(e) {
    e.preventDefault();

    const apiUrl = DELETE_QUERY;

    const postData = {
      _id: props.Queries[props.userId]._id,
      userMail: props.Queries[props.userId].email,
      mentor: JSON.parse(localStorage.getItem("user")).firstName,
      query: props.Queries[props.userId].content,
      title: props.Queries[props.userId].title,
    };

    try {
      const response = await axios.post(apiUrl, postData);
      console.log(response.data);
      if (props.Queries[props.userId].isResponded === false) {
        console.log("Deleteing pending");
        props.setPendingQueryCount(props.pendingQueryCount - 1);
      } else {
        console.log("Deleteing answered");
        props.setAnsweredQueryCount(props.answeredQueryCount - 1);
      }
    } catch (error) {
      console.error("Error deleteing Query:", error);
    }

    let newQueries = props.Queries;
    newQueries.splice(props.userId, 1);
    props.updateQueries(newQueries);
    setTextareaValue("");
    if (props.displayOption === "Pending") {
      props.changeDisplayOption("Pending");
    } else {
      props.changeDisplayOption("Answered");
    }
    // window.alert("Query moved to Deleted");

    showSnackbar("Query Deleted.", "success");
  }

  async function respondQuery(e, value) {
    e.preventDefault();
    if (value === "") {
      setIsResponseEmpty(true);
      return;
    }

    const apiUrl = SEND_RESPONSE;

    const postData = {
      _id: props.Queries[props.userId]._id,
      response: value,
      userMail: props.Queries[props.userId].email,
      mentor: JSON.parse(localStorage.getItem("user")).firstName,
      query: props.Queries[props.userId].content,
      title: props.Queries[props.userId].title,
    };

    try {
      const response = await axios.post(apiUrl, postData);
      console.log(response.data);
      props.setPendingQueryCount(props.pendingQueryCount - 1);
      props.setAnsweredQueryCount(props.answeredQueryCount + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    const newQueries = props.Queries;
    const response = value ?? "";
    newQueries[props.userId].isResponded = true;
    newQueries[props.userId].response = response;
    props.updateQueries(newQueries);
    setTextareaValue("");
    props.changeDisplayOption("Pending");
    // window.alert("Query moved to Answered");
    showSnackbar("Response Sent", "success");
  }

  console.log(
    "Before return..",
    props.answeredQueryCount,
    props.pendingQueryCount
  );

  return (
    <div className="queryBodyCompDiv">
      {props.selectedUserId >= 0 && props.selectedUserId !== "" ? (
        <div className={`bodyCompDivInner`}>
          <div className={`userCardClass`}>
            <UserCardComp
              queries={props.Queries}
              userId={props.userId}
              inBody={true}
            />

            {/* <Button
              variant="text"
              className="deleteButton"
              onClick={(e) => handleDeleteQuery(e)}
              color="error"
              // startIcon={}
            >
              <DeleteIcon />
            </Button> */}
            <DeleteConfirmComp handleDeleteQuery={handleDeleteQuery} />
          </div>
          <br />
          <div className="textAreaContainer">
            <Typography className="title" variant="h6" component="h2">
              {props.Queries[props.userId].title}
            </Typography>
            <Box mt={2}>
              <Typography className="text-box query-text-box" variant="body1">
                {props.Queries[props.userId].content}
              </Typography>
            </Box>
            {props.Queries[props.userId].isResponded === false ? (
              <div className="formDiv">
                <form onSubmit={(e) => respondQuery(e, textareaValue)}>
                  <TextField
                    id="outlined-multiline-static"
                    value={textareaValue}
                    onChange={handleTextareaChange}
                    label="Message"
                    multiline
                    maxRows={4}
                    error={isResponseEmpty}
                  />

                  <div className="buttonDiv">
                    <Button
                      variant="contained"
                      className="submitButton"
                      type="submit"
                      // color="success"
                      endIcon={<SendIcon />}
                    >
                      Respond
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <Typography fontWeight={600} paddingLeft={1} variant="body1">
                  Your Response
                </Typography>
                <Box mt={2}>
                  <Typography
                    className="text-box responseTextBox"
                    variant="body1"
                  >
                    {props.Queries[props.userId].response}
                  </Typography>
                </Box>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="noBodyCompDiv">
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <div className="noBodyInnerDiv">
                  {props.displayOption === "Pending"
                    ? props.pendingQueryCount > 0
                      ? "Select a Query"
                      : "No Queries"
                    : props.answeredQueryCount > 0
                    ? "Select a Query"
                    : "No Queries"}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default BodyComp;
