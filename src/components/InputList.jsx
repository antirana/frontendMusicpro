import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const InputList = ({ label, options, options2 }) => {
  const [selectedOption, setSelectedOption] = React.useState(options[0].value);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box marginTop={'1rem'} width={'100%'}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={selectedOption}
          onChange={handleChange}
        >
          {options.map((option,options2) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>         
          ))}
        </Select>

        
      </FormControl>
    </Box>
  );
};

export default InputList;
