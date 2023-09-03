/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */
import React from "react";
import { Avatar, Card, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//import ReactDOM from 'react-dom/client';
import "./userCardComp.css";
// import Users from "../../../assets/data/users.json";

function UserCardComp(props) {
  console.log("user card", props);
  const userId = props.userId ?? -1;
  const name = props.query?.name ?? props.queries[userId]?.name;
  const email = props.query?.email ?? props.queries[userId]?.email;
  const date = props.query?.time ?? props.queries[userId]?.time;
  const title = props.query?.title ?? props.queries[userId]?.title;

  return (
    <Card
      className={`queryUserCard ${
        userId === props?.selectedUserId ? "selected-card" : ""
      } ${props.inBody ? "not-clickable" : "in-sidebar"}`}
      variant="outlined"
      onClick={() => props.handleUserClick(userId)}
    >
      <CardContent>
        <Box display="flex" alignItems="center">
          {props.inBody ? (
            <Avatar sx={{ bgcolor: "#5e35b1" }}>{name[0].toUpperCase()}</Avatar>
          ) : (
            <></>
          )}
          <Box marginLeft={props.inBody ? 2 : 0}>
            <Typography
              variant="h6"
              component="div"
              fontWeight="600"
              textAlign="left"
            >
              {name}
            </Typography>
            <Typography variant="body1">
              {props.inBody ? `${email} | ${date}` : title}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default UserCardComp;
