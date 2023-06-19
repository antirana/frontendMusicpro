import {Typography, Box, useTheme} from '@mui/material'
import React from 'react'

const Header = ({ titulo}) => {
    const theme = useTheme();
    return (
        <Box>
            <Typography variant='h2' color={theme.palette.secondary[100]} fontWeight={"bold"} sx={{mb:"5px"}}>
                {titulo}
            </Typography>
        </Box>
    )
}

export default Header