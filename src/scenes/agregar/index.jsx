import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "components/Header";
import Inputs from "components/Inputs";
import InputList from "components/InputList";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  useTheme,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Swal from "sweetalert2";

const Agregar = () => {
  // COLORES
  const theme = useTheme();

  // ADAPTART PANTALLA
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Funcion para subir imagenes
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
  };

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  const handleCategoriaChange = (event) => {
    const categoriaSeleccionada = event.target.value;
    setCategoriaSeleccionada(categoriaSeleccionada);
    setFormData((prevFormData) => ({
      ...prevFormData,
      categoria: { value: categoriaSeleccionada, isValid: false },
    }));
  };

  //inputs
  const [formData, setFormData] = useState({
    nombre: { value: "", isValid: false },
    precio: { value: "", isValid: false },
    marca: { value: "", isValid: false },
    stock: { value: "", isValid: false },
    imagen: { value: null, isValid: false },
    categoria: { value: "", isValid: false },
    subcategoria: { value: "", isValid: false },
  });

  //Expresiones de validacion
  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    precio: /^\d{4,9}$/,
    marca: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "precio") {
      const isValid = parseFloat(value) >= 1; // Verifica si el valor es un número mayor o igual a 1

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: { value, isValid },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: { value, isValid: value !== "" },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verificar si todos los campos son válidos
    const isFormValid = Object.values(formData).every((field) => field.isValid);
    if (isFormValid) {
      // Realizar acciones con los datos del formulario si es válido
      console.log("Formulario válido", formData);
    } else {
      // Mostrar mensajes de error o tomar otras acciones si es inválido
      console.log("Formulario inválido");
    }
  };
  const postData = new FormData();
  postData.append("nombre", formData.nombre.value);
  postData.append("precio", formData.precio.value);
  postData.append("marca", formData.marca.value);
  postData.append("stock", formData.stock.value);
  postData.append("imagen", selectedImage);
  postData.append("categoria", formData.categoria.value);
  postData.append("subcategoria", formData.subcategoria.value);

  //METODO PARA INGRESAR DATOS

  const handlePost = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

    try {
      const res = await axios.post(
        "https://musicproocyberedge.onrender.com/api/productos/create",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token, // Incluir el token en el encabezado como 'Authorization'

          },
        }
      );
      console.log(res.data);
      Swal.fire({
        title: "Producto Agregado",
        text: "El producto fue agregado de forma correcta",
        icon: "success",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header titulo={"Agregar Productos"}></Header>

      <form onSubmit={handleSubmit}>
        <Box
          margin={""}
          mt="20px"
          display={"grid"}
          gridTemplateColumns={"repeat(2, minmax(0, 1fr))"}
          justifyContent={"space-between"}
          rowGap={"20px"}
          columnGap={"1.33%"} //SEPARACION DEL MEDIO DE LAS CARD
          noValidate
          autoComplete="off"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {/* Container */}
          <Card
            sx={{
              backgroundColor: theme.palette.background.alt,
              borderRadius: "0.55rem",
            }}
          >
            {/* NOMBRE */}
            <CardContent>
              <Box display="flex" alignItems="center">
                <Typography variant="h5" component={"div"} marginRight={"10px"}>
                  Nombre:
                </Typography>
                <TextField
                  color="success"
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="nombre"
                  value={formData.nombre.value}
                  onChange={handleChange}
                  placeholder="Nombre"
                />
              </Box>
              {!formData.nombre.isValid && (
                <span style={{ color: "red" }}>Error en el Nombre</span>
              )}
            </CardContent>

            {/* PRECIO */}
            <CardContent>
              <Box display="flex" alignItems="center">
                <Typography variant="h5" component={"div"} marginRight={"21px"}>
                  Precio:
                </Typography>
                <TextField
                  color="success"
                  fullWidth
                  variant="outlined"
                  type="number"
                  name="precio"
                  value={formData.precio.value}
                  onChange={handleChange}
                  placeholder="Precio"
                />
              </Box>
              {!formData.precio.isValid && (
                <span style={{ color: "red" }}>Error en el Precio</span>
              )}
            </CardContent>

            {/* STOCK */}
            <CardContent>
              <Box display="flex" alignItems="center">
                <Typography variant="h5" component={"div"} marginRight={"21px"}>
                  Stock:
                </Typography>
                <TextField
                  color="success"
                  fullWidth
                  variant="outlined"
                  type="number"
                  name="stock"
                  value={formData.stock.value}
                  onChange={handleChange}
                  placeholder="Stock"
                />
              </Box>
              {!formData.precio.isValid && (
                <span style={{ color: "red" }}>Error en el Precio</span>
              )}
            </CardContent>

            {/* IMAGEN */}
            <CardContent>
              <Box display="flex" alignItems="center">
                <Typography variant="h5" component={"div"}>
                  Imagen:
                </Typography>
                <input
                  type="file"
                  id="imagenInput"
                  accept="image/*"
                  onChange={handleImageChange}
                ></input>
              </Box>
              <img src={selectedImage} width={100} height={100} />
            </CardContent>
          </Card>

          {/* Container */}
          <Card
            sx={{
              backgroundColor: theme.palette.background.alt,
              borderRadius: "0.55rem",
            }}
          >
            {/* MARCA */}
            <CardContent>
              <Box display="flex" alignItems="center">
                <Typography
                  variant="h5"
                  component={"div"}
                  marginRight={"1.1rem"}
                >
                  Marca:
                </Typography>
                <TextField
                  color="success"
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="marca"
                  value={formData.marca.value}
                  onChange={handleChange}
                  placeholder="Marca"
                ></TextField>
              </Box>
              {!formData.marca.isValid && (
                <span style={{ color: "red" }}>Error en la Marca</span>
              )}
            </CardContent>
            {/* CATEGORIA */}
            <CardContent>
              <Box display="flex" alignItems="center">
                <Typography variant="h5" component={"div"} marginRight={"8px"}>
                  Categoria:
                </Typography>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    name="categoria"
                    value={formData.categoria.value}
                    onChange={handleCategoriaChange}
                    label="Categoría"
                  >
                    <MenuItem value="Guitarra">Guitarra</MenuItem>
                    <MenuItem value="Pianos">Pianos</MenuItem>
                    <MenuItem value="Bajos">Bajos</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
            {/* SUBCATEGORIA */}
            <CardContent>
              <Box display="flex" alignItems="center">
                <Typography variant="h5" component={"div"} marginRight={"-8px"}>
                  Sub Categoria:
                </Typography>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>SubCategoría</InputLabel>
                  <Select
                    name="subcategoria"
                    value={formData.subcategoria.value}
                    onChange={handleChange}
                    label="SubCategoría"
                  >
                    <MenuItem value="Guitarras Cuerpo Solido">Guitarras Cuerpo Solido</MenuItem>
                    <MenuItem value="Piano de media cola">Piano de media cola</MenuItem>
                    <MenuItem value="Bajos Cuatro Cuerdas">Bajos Cuatro Cuerdas</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </form>

      {/* Boton */}
      <Box
        margin={""}
        mt="20px"
        display={"grid"}
        gridTemplateColumns={"repeat(1, minmax(0, 1fr))"}
        justifyContent={"space-between"}
        rowGap={"20px"}
        columnGap={"1.33%"} //SEPARACION DEL MEDIO DE LAS CARD
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <Card
          sx={{
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem",
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center">
              <Button
                variant="contained"
                color="success"
                fullWidth
                type="submit"
                onClick={handlePost}
              >
                Agregar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Agregar;
