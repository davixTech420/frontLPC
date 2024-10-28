import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { IconButton, Button } from "@mui/material";
import HeaderPublic from "../../partials/HeaderPublic";
import FooterPublic from "../../partials/FooterPublic";
import {
  clienteLogeado, actualizarCliente , MiShows,
  getClienForm,
} from "../../../services/ClienteServices";
import { Chip, Paper} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import CloseIcon from "@mui/icons-material/Close";

const theme = createTheme({
  palette: {
    primary: { main: "#003b46" },
    secondary: { main: "#66A5AD" },
    background: { default: "#c4dfe6", paper: "#ffffff" },
    text: { primary: "#003b46", secondary: "#07575B" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700, color: "#003b46" },
    h6: { fontWeight: 600, color: "#07575B" },
    body1: { color: "#003b46" },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 8px 20px rgba(0,59,70,0.1)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#66A5AD",
          color: "#ffffff",
          "&:hover": { backgroundColor: "#07575B" },
        },
      },
    },
  },
});

const MotionPaper = motion(Paper);

export default function ProfileViewInteractive() {
  const [datosAdicionales, setDatosAdicionales] = useState({});
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    tipIdentidad: "",
    identificacion: "",
    telefono: "",
    email: "",
    password: "",
    estado: true,
    nacionCliente: "",
    direccion: "",
  });
  const [formData, setFormData] = useState({
  
    telefono: cliente.telefono,
    email: cliente.email,
    password: cliente.password,
    estado: true,
    nacionCliente: datosAdicionales.nacionCliente,
    direccion: datosAdicionales.direccion,
  });
  const [Shows, setShows] = useState([]);



  useEffect(() => {
    try {
      const clienLogi = async () => {
        const respoClien = await clienteLogeado();
        setCliente(respoClien.data);
        const vistaDash = await MiShows(respoClien.data.id);
       setShows(vistaDash.data);
        console.log(vistaDash.data);
        
        const resClienForm = await getClienForm(respoClien.data.id);
        setDatosAdicionales(resClienForm.data);

        /* establecemos los datos que van en el fromulario lo que envia a a la bd puede ir cambiando */
        setFormData({
           telefono: respoClien.data.telefono,
           email: respoClien.data.email,
           estado: true,
           nacionCliente: resClienForm.data.nacionCliente,
           direccion: resClienForm.data.direccion,
         });
        
         /**
          * 
          * 
          */
      };
      clienLogi();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const [isEditing, setIsEditing] = useState(false);
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };




  const handleSubmit = (e) => {
    e.preventDefault();
        
    try{
const enviar = actualizarCliente(cliente.id,formData);

      console.log(enviar);
    }catch(error){
console.log(error);
    }
    
  
    setIsEditing(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <HeaderPublic />
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: "#c4dfe6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
          }}
        >
          <MotionPaper
            elevation={3}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              width: "100%",
              maxWidth: 800,
              overflow: "hidden",
              borderRadius: 4,
              position: "relative",
            }}
          >
            <Box sx={{ p: 3, position: "relative", zIndex: 1 }}>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs>
                  <Typography variant="h4">{cliente.nombre}</Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Chip
                      icon={<LocationOnIcon />}
                      label={datosAdicionales.nacionCliente}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <IconButton
                    color="primary"
                    onClick={() => setIsEditing(!isEditing)}
                    sx={{ backgroundColor: "rgba(255,255,255,0.8)" }}
                  >
                    {isEditing ? <CloseIcon /> : <EditIcon />}
                  </IconButton>
                </Grid>
              </Grid>

              <AnimatePresence>
                {isEditing ? (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          
                          label="Name"
                          name="name"
                          value={cliente.nombre}
                         
                        />
                      </Grid>
                     

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="nacionCliente"
                          name="nacionCliente"
                          onKeyPress={(e) => {
                            if (!/['a-z']/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          inputProps={{
                            maxLength: 20,
                          }}
                          value={formData.nacionCliente}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="direccion"
                          name="direccion"
                          inputProps={{
                            maxLength: 30,
                          }}
                          value={formData.direccion}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="telefono"
                          name="telefono"
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                         inputProps={{
                          maxLength: 10,
                        }}

                          value={formData.telefono}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="email"
                          label="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => {
                            const email = e.target.value;
                            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                        
                            if (!emailPattern.test(email)) {
                              console.log("Email inválido");
                            } else {
                              console.log("Email válido");
                            }
                            handleInputChange(e);
                          
                            
                           // Esto mantiene la funcionalidad original de cambiar el valor
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{
                            textTransform:"none",
                          }}
                        >
                          Guardar
                        </Button>
                      </Grid>
                    </Grid>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                      Bienvenido{" "}
                      {cliente.nombre + " Puedes actualizar tus datos aqui"}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Mis shows
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {Shows.length === 0 ? (
                          <p>No tienes ningún show</p>
                        ) : (
                          Shows.map((show) => (
                            <motion.div
                              key={show.id}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Chip label={show.nombre} />
                            </motion.div>
                          ))
                        )}
                      </Box>
                    </Box>

                

                    
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </MotionPaper>
        </Box>
      </ThemeProvider>
    
    </>
  );
}
