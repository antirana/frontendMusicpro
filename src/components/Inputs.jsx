import React, { useState } from "react";
import { Box, TextField } from "@mui/material";

const Inputs = ({
  placeholder,
  estado,
  cambiarEstado,
  tipo,
  name,
  expresionRegular,
}) => {
  return (
    <Box marginLeft={"1rem"} width={"100%"}>
      <TextField
        variant="outlined"
        placeholder={placeholder}
        sx={{ width: "100%" }}
        type={tipo}
      />
    </Box>
  );
};

export default Inputs;
