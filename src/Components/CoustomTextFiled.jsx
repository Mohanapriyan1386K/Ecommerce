import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import { Email } from "@mui/icons-material";

function CustomTextField({
  variant = "outlined",
  onChange,
  id,
  placeholder,
  prefix,          
  label,
  width,
  height,
  type = "text",
  description,
  value,
  focused
}) {
  return (
    <Box>
      <TextField
        focused={focused}
        fullWidth
        value={value}
        type={type}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        label={label}
        variant={variant}
        helperText={description} // Add description below input
        sx={{
          width: width || "100%",
          height: height,
          m: 1,
        }}
      />
    </Box>
  );
}

export default CustomTextField;
