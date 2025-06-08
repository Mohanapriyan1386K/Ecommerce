import React from 'react'
import { Button,Box } from "@mui/material";

function CoustomButton({onClick,variant,backgroundColor,Buttonname,width}) {
  return (
    <Box>
        <Button  onClick={onClick} variant={variant} sx={{backgroundColor:{backgroundColor} ,width:{width}}} >{Buttonname}</Button>
    </Box>
  )
}

export default CoustomButton;

// 'text' | 'outlined' | 'contained'