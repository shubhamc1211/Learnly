/**
 * @author Shivam Lakhanpal <sh475218@dal.ca/B00932887>
 */
import React from "react";
import { Button, Box } from "@mui/material";
import styles from "./FormComponents.module.css";

const FormButton = ({ buttonText, handleSubmit }) => {
  return (
    <Box className={styles["button-container"]}>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleSubmit}
        className={styles.button}
      >
        {buttonText}
      </Button>
    </Box>
  );
};
export default FormButton;
