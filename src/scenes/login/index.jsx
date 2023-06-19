import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleButtonClick = () => {
    // Realizar solicitud de inicio de sesión al backend
    axios
      .post('https://musicproocyberedge.onrender.com/user/login/', { username, password })
      .then((response) => {
        const data = response.data;
        if (data.data.token) {
          // Almacenar el token en el almacenamiento local (ejemplo: localStorage)
          localStorage.setItem('token', data.data.token);
          navigate('/dashboard');
        } else {
          console.log('Error de inicio de sesión:', data.error);
        }
      })
      .catch((error) => {
        console.log('Error de inicio de sesión:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: "Credenciales Erroneas",
        });

      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleButtonClick();
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar sesión
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            marginTop: 1,
          }}
        >
          <TextField
            label="Usuario"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;