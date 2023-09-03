/**
 * @author Amanjot Singh <am854663@dal.ca/B00942293>
 */
import "./loginPage.css";
import React from "react";
import { Typography } from "@mui/material";
import FormComp from "../../Components/login/form/formComp";
// import FormPropsTextFields from "../../Components/form/registerForm";
import myteam from "../../assets/images/landing1.png";

function LoginPage() {
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-left-div">
          <div className="login-form">
            <h1 className="login-form-header">
              LOG IN
              {/* <span style={{ marginLeft: "2px", color: "#5C469C" }}>IN</span> */}
            </h1>

            {/* <h2 className="form-header-sub"></h2> */}

            <FormComp />
          </div>
        </div>
        <div className="login-right-div">
          <img src={myteam} alt="My Team" width="75%" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
