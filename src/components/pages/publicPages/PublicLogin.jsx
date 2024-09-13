import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  ThemeProvider,
  createTheme,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Login } from "../../../services/publicServices";
import HeaderPublic from "../../partials/HeaderPublic";
import FooterPublic from "../../partials/FooterPublic";

const theme = createTheme({
  palette: {
    primary: { main: "#FFD700" }, // Gold color
    secondary: { main: "#8B0000" }, // Dark red
    background: { default: "#1C1C1C" }, // Dark background
  },
  typography: {
    fontFamily: "Playfair Display, serif",
  },
});

// Memoizing LavaBackground to avoid unnecessary re-renders
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

const TheaterVolcanicLogin = () => {
  const [openError, setOpenError] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const nav = useNavigate();


  // Memoize handleSubmit to avoid re-creation on every render
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      try {
        const regis = await Login(formData);
        localStorage.setItem("token", regis.data.token);
        localStorage.setItem("role", regis.data.role);
        const roleToPath = {
          admin: "/admin/dashboard",
          cliente: "/cliente/dashboard",
          jefesala: "/jefe/dashboard",
          empleado: "/empleado/dashboard",
        };
       nav(roleToPath[regis.data.role] || "/loginPublic");
      } catch (error) {
        setError(error.response.data.message);
        setOpenError(true);
      }
      setIsSubmitting(false);
    },
    [formData]
  );

  return (
    <>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={() => setOpenError(false)}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <LavaBackground />
      <HeaderPublic />
      <Container
        component="main"
        maxWidth={false}
        disableGutters
        sx={{
         /*  height: "100vh", */
          display: "flex",
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          padding: isMobile ? 2 : 4,
        }}
      >
        <Box
          sx={{
            top: 15,
            display: "flex",
            flexDirection: "column",
             alignItems: "center",
            marginInline: 5,
            borderRadius: "15px",
            padding: 4,
            width: "50%",
            bgcolor:"white",
            backdropFilter: "blur(50px)",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.8)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          

          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Typography component="h1" variant="h4" sx={{ color: "black", mb: 3 }}>
              Inicia Sesión
            </Typography>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            style={{ width: "100%" }}
          >
            <Grid  container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  variant="filled"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <center><Button
                type="submit"
               
                variant="contained"
               
                sx={{
                  mt: 3,
                  mb: 2,
                  width: "60%",
                  borderRadius:20,
                  bgcolor: "#66A5AD", // Cambia el color de fondo del botón
                  color: "white", // Cambia el color del texto del botón
                  "&:hover": {
                    bgcolor: "#5497A7", // Cambia el color de fondo del botón en hover
                  },
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Entrando..." : "Iniciar Sesión"}
              </Button></center>
            </motion.div>
          </motion.form>
        </Box>
      </Container>
      <FooterPublic  />
    </>
  );
}

export default TheaterVolcanicLogin;
