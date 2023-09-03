/**
 * @author Shivam Lakhanpal <sh475218@dal.ca/B00932887>
 */
import React from "react";
import "./MentorServiceHomePage.css";
import RightServiceViewComp from "../../../Components/MentorServiceBooking/HomePage/rightServiceViewComp";
import LeftServiceViewComp from "../../../Components/MentorServiceBooking/HomePage/leftProfileViewComp";
import { useParams } from "react-router-dom";

const MentorServiceHomePage = () => {
  const { id } = useParams();
  return (
    <div className="mentor-service-homepage">
      <div className="left-container">
        <LeftServiceViewComp mentorId={id} />
      </div>
      <div className="right-container">
        <RightServiceViewComp mentorId={id} />
      </div>
    </div>
  );
};

export default MentorServiceHomePage;
