import HeaderPublic from "../../partials/HeaderPublic";
import FooterPublic from "../../partials/FooterPublic";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  InputAdornment,
  IconButton
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputValidate from "../component/ValidateInput";




const LavaBackground = React.memo(() => (
  <motion.div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      background: `
      radial-gradient(
        farthest-corner at 50% 50%,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.3) 30%,
        rgba(255, 255, 255, 0.5) 60%,
        rgba(255, 255, 255, 0.7)
      ),
      linear-gradient(
        45deg,
        #003B46,
        #07575B,
        #66A5AD,
        #C4DFE6
      )`,
      backgroundSize: "300% 300%",  // Reduced size for performance
    }}
    animate={{
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    }}
    transition={{
      type: "tween",
      duration: 20, // Reduced animation frequency
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    }}
  />
));





export default function PublicRegis() {
  /* este estado es para guardar y mostrar los mensajes de error o de exito */
  const [openMensaje, setOpenMensaje] = useState(false);
  const [error, setError] = useState(null);
  /**
   *
   *
   */
  const [showPassword, setShowPassword] = useState(false);

  const [rolSelect, setRolSelect] = useState();
  /* estos son los datos del fromulario */
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    tipIdentidad: "",
    identificacion: "",
    telefono: "",
    email: "",
    password: "",
    estado: true,
    role: "cliente",
    ...(rolSelect === "cliente" && {
      direccion: "",
      nacionCliente: ""
    }),
  });
  /**
   *
   *
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorForm = validarFormulario(formData);
    if (errorForm) {
      setError(errorForm);
      setOpenMensaje(true);
    }
    else {
      if (rolSelect !== "cliente") {
        setRolSelect();
      }
      try {
        const regis = await axios.post(
          "http://localhost:3001/api/auth/register",
          formData
        );
        window.location.href = "/loginPublic";
        setError(regis.data.message || "Error desconocido");
        setOpenMensaje(true);
      } catch (error) {

        setError(error.response.data.message || "Error desconocido");
        setOpenMensaje(true);

      }

    }
  }






  function validarFormulario(formData) {
    // Validar nombre y apellido solo letras

    /* if (!formData.role || !["cliente", "empleado"].includes(formData.role.toLowerCase())) {
      return "Debes Seleccionar Un Rol";
    } */


    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(formData.nombre)) {
      return "El nombre solo debe contener letras";
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(formData.apellido)) {
      return "El apellido solo debe contener letras";
    } if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      return "El email no es válido";
    }
    // Validar identificación solo números
    if (!/^[0-9]+$/.test(formData.identificacion)) {
      return "La identificación solo debe contener números";
    }

    // Validar teléfono solo números de 10 dígitos
    if (!/^[0-9]{10}$/.test(formData.telefono)) {
      return "El teléfono debe contener 10 dígitos";
    }
    if (!/^.{6,}$/.test(formData.password)) {
      return "La Contraseña Debe Ser Minimo  De 6 Digitos ";
    }
    return null; // Si no hay errores, retorna null
  }







  return (
    <>
      <Snackbar
        open={openMensaje}
        autoHideDuration={6000}
        onClose={() => setOpenMensaje(false)}
      >
        <Alert
          onClose={() => setOpenMensaje(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <LavaBackground />
      <HeaderPublic />
      <Container component="main" maxWidth="xs">
        {/* este es el contenedor donde va el formulario con sus campos */}
        <Box
          sx={{
            width: "100%",
            borderRadius: 5,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0px 4px 8px black",
            marginTop: 8,
            display: "flex",
            backdropFilter: "blur(50px)",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, background: "#07575B" }}>
            <LockOutlinedIcon sx={{ color: "white" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear Cuenta
          </Typography>






          <Box
            sx={{ mt: 3, p: 3 }}
            component="form"
            noValidate
            onSubmit={handleSubmit}
          >

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
               




              <InputValidate nombre="nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
               
              </Grid>
              <Grid item xs={12} sm={6}>
              <InputValidate nombre="apellido"
                value={formData.apellido}
                onChange={(e) =>
                  setFormData({ ...formData, apellido: e.target.value })
                }
              />
               
              </Grid>

              <Grid item xs={12} sm={6}>

                <InputValidate nombre="Tpidentificacion" value={formData.tipIdentidad} onChange={(e) =>
                      setFormData({ ...formData, tipIdentidad: e.target.value })
                    } />
                
              </Grid>
              <Grid item xs={12} sm={6} >

              <InputValidate nombre="identificacion" value={formData.identificacion} onChange={(e) =>
                      setFormData({ ...formData, identificacion: e.target.value })
                    } />

              



              </Grid>

              <Grid item xs={12}>
              <InputValidate nombre="email" value={formData.email} onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    } />
                
              </Grid>
              <Grid item xs={12}>
              <InputValidate nombre="telefono" value={formData.telefono} onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    } />
               
              </Grid>
              <Grid item xs={12}>
              <InputValidate nombre="pass" value={formData.password} onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    } />
                
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            {/* Boton para enviar los datos del formulario */}


            <center>
              <Button
                type="submit"
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: "60%",
                  borderRadius: 20,
                  bgcolor: "#66A5AD", // Cambia el color de fondo del botón
                  color: "white", // Cambia el color del texto del botón
                  "&:hover": {
                    bgcolor: "#5497A7", // Cambia el color de fondo del botón en hover
                  },
                }}
              >
                Crear Cuenta
              </Button>
            </center>
            {/*--------*/}
          </Box>

        </Box>
      </Container>
      <br />

      <FooterPublic />
    </>
  );
}
