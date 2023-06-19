import {CssBaseline, ThemeProvider} from "@mui/material"
import { createTheme } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {themeSettings} from "./theme"
import {BrowserRouter, Navigate, Route,Routes} from "react-router-dom"
import Dashboard from "scenes/dashboard"
import Layout from "scenes/layout"
import Productos from "scenes/productos"
import Agregar from "scenes/agregar";
import Login from "scenes/login"

function App() {
  const mode = useSelector((state)=> state.global.mode);
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route element={<Layout/>}>
              <Route path="/" element={<Navigate to="/login" replace />}></Route>
              <Route path="/dashboard" element={<Dashboard/>}></Route>
              <Route path="/productos" element={<Productos/>}></Route>
              <Route path="/agregar" element={<Agregar/>}></Route>
            </Route>
            <Route path="/login" element={<Login/>}></Route>
          </Routes> 
        </ThemeProvider>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
