/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */
import React from "react";
import { Stack } from "@mui/material";
import UserCardComp from "../userCard/userCardComp";
import "./sidebarComp.css";

function SidebarComp({
  handleUserClick,
  selectedUserId,
  displayOption,
  Queries,
}) {
  return (
    <div className="querySidebarComp">
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        {Queries.map((query, id) => {
          return displayOption === "Pending" ? (
            query.isResponded === false ? (
              <UserCardComp
                query={query}
                userId={id}
                selectedUserId={selectedUserId}
                handleUserClick={handleUserClick}
                inBody={false}
              />
            ) : (
              <></>
            )
          ) : displayOption === "Answered" ? (
            query.isResponded === true ? (
              <UserCardComp
                query={query}
                userId={id}
                selectedUserId={selectedUserId}
                handleUserClick={handleUserClick}
                inBody={false}
              />
            ) : (
              <></>
            )
          ) : (
            <></>
          );
        })}
      </Stack>
    </div>
  );
}

export default SidebarComp;
