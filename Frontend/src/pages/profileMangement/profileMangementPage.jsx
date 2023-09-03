/**
 * @author Amanjot Singh <am854663@dal.ca/B00942293>
 */

import "./profileMangementPage.css";
import React, { useEffect } from "react";
import EditProfile from "../../Components/profileManagement/editProfileComp";
import myteam from "../../assets/images/profileEditing.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
function ProfileManagementPage() {
  const [value, setValue] = React.useState("one");

  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const localUser = JSON.parse(localStorage.getItem("user"));
      console.log("Printing local user:", localUser, !localUser);

      if (!localUser) {
        navigate("/login");
      }
    };

    checkLogin();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="register">
      <div className="profileManagement-container">
        <div className="profileManagement-left-div">
          <div className="profileManagement-form">
            <h1 className="profileManagement-form-header">
              Edit
              <span style={{ marginLeft: "6px", color: "#5C469C" }}>
                Profile
              </span>{" "}
            </h1>
            {/* <h2 className="profileManagement-form-header-sub">
              Getting started with Learnly is simple,quick and easy
            </h2>  */}

            <EditProfile />
          </div>
        </div>
        <div className="profileManagement-right-div">
          <img src={myteam} alt="My Team" width="85%" />
        </div>
      </div>
    </div>
  );
}

export default ProfileManagementPage;
