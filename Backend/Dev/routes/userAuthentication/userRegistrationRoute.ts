/**
 * @author Amanjot Singh <am854663@dal.ca/B00942293>
 */

import express from "express";
import userRegistrationCont from "../../controllers/userAuthentication/userRegistrationCont";
import getAllUsernamesCont from "../../controllers/userAuthentication/getAllUsernamesCont";
import getUserDetailsCont from "../../controllers/userAuthentication/getUserDetailsCont";
import putUserDetails from "../../controllers/profileManagement/putUserDetails";
import checkEmailExist from "../../controllers/userAuthentication/checkEmailExist";
const router = express.Router();

// POST /register/
router.post("/registerUser", userRegistrationCont.userRegisteration);
router.get(
  "/registerUser/getAllUsernames",
  getAllUsernamesCont.getAllUsernames
);
router.get(
  "/registerUser/getUserDetails/:username",
  getUserDetailsCont.getUserDetails
);
router.post("/registerUser/checkEmailExist/", checkEmailExist.checkEmailExist);
router.put("/updateUser", putUserDetails.putUserDetails);

export const userRegisterRoute = router;
