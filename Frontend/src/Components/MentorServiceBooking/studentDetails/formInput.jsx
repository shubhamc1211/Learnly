/**
 * @author Shivam Lakhanpal <sh475218@dal.ca/B00932887>
 */
import React from "react";
import { Typography, TextField, Box } from "@mui/material";
import styles from "./FormComponents.module.css";

const FormInput = ({ label, value, onChange, placeholder }) => {
  return (
    <Box className={styles["input-container"]}>
      <Typography variant="h6" gutterBottom className={styles.label}>
        {label}
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
      />
    </Box>
  );
};

export default FormInput;
