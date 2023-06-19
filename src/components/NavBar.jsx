import React,{useState} from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material'
import FlexBetween from 'components/FlexBetween'
import { useDispatch } from 'react-redux'
import { setMode } from 'state'
import { AppBar, Box, Button, IconButton, InputBase, Toolbar, useTheme,  Menu, MenuItem, } from '@mui/material'

const NavBar = ({isSidebarOpen, setIsSidebarOpen}) => {

    const dispatch = useDispatch();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
  

    return (
        <AppBar sx={{
            position:"static",
            background:"none",
            boxShadow:"none"
        }}>
            <Toolbar sx={{justifyContent:"space-between"}}>
                {/* Lado Izquierdo */}
                
                <FlexBetween>
                    <IconButton onClick={()=> setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon></MenuIcon>
                    </IconButton>
                    
                    <FlexBetween 
                    backgroundColor={theme.palette.background.alt}
                    borderRadius={"9px"} 
                    gap={"3rem"}
                    p={"0.1rem 1.5rem"}
                    >
                        <InputBase placeholder='Search...'></InputBase>
                        <IconButton>
                            <Search></Search>
                        </IconButton>

                    </FlexBetween>
                </FlexBetween>
                
                <Box  sx={{
                        paddingLeft: "750px",
                        }}>
                <FlexBetween gap="1.5rem" >
                    <IconButton onClick={()=> dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkModeOutlined sx={{fontSize:"25px"}}></DarkModeOutlined>
                        ): (
                            <LightModeOutlined sx={{fontSize:"25px"}}></LightModeOutlined>
                        )}
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{fontSize:"25px"}}></SettingsOutlined>
                    </IconButton>
                </FlexBetween>
                </Box>
                {/* Lado Derecho */}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar