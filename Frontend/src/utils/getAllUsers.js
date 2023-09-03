/**
 * @author Amanjot Singh <am854663@dal.ca/B00942293>
 */
import axios from "axios";
import { GET_ALL_USERS } from "./apiUrls";
const getAllUsernames = async () => {
  try {
    console.log(GET_ALL_USERS);
    const response = await axios.get(GET_ALL_USERS);
    return response.data; // The result is an array of usernames
  } catch (error) {
    console.error("Error fetching usernames:", error);
    return []; // Return an empty array in case of an error
  }
};

export default getAllUsernames;
