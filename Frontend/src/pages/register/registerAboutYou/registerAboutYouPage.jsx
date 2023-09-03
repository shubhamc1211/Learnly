/**
 * @author Amanjot Singh <am854663@dal.ca/B00942293>
 */
import "./registerAboutYouPage.css";
import React, { useEffect } from "react";
import RegisterAboutYouComp from "../../../Components/register/registerAboutYou/registerAboutYouComp";
import aboutYou from "../../../assets/images/about-you.svg";
import { useNavigate } from "react-router-dom";
function RegisterAboutYouPage() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     const localUser = JSON.parse(localStorage.getItem("user"));
  //     console.log("Printing local user:", localUser);

  //     if (!localUser) {
  //       navigate("/login");
  //     }
  //   };

  //   checkLogin();
  // }, []);
  return (
    <div className="register">
      <div className="register-container">
        <div className="register-left-div">
          <div className="register-form">
            {/* <h1 className="register-form-header">
              CREATE YOUR
              <span style={{ marginLeft: "6px", color: "#5C469C" }}>
                ACCOUNT
              </span>{" "}
            </h1> */}

            <RegisterAboutYouComp />
          </div>
        </div>
        <div className="register-right-div">
          <img src={aboutYou} alt="My Team" width="60%" />
        </div>
      </div>
    </div>
  );
}

export default RegisterAboutYouPage;
