import { useState, useEffect } from "react";
import HeaderPublic from "../../partials/HeaderPublic";
import FooterPublic from "../../partials/FooterPublic";
import {
  Box,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { Avatar } from "@mui/material";
import Logo from "../../../images/lpc.webp";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import emailjs from "emailjs-com";
import PhoneIcon from "@mui/icons-material/Phone";
import { FormComponent } from "../adminPages/FormComponent";

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    mensaje: "",
  });
  const [logueado, setLogueado] = useState(null);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setLogueado(decoded);
    }
  }, []);

  const enviarWhatsapp = () => {
    if (!logueado) {
      setOpenError(true);
      return;
    }
    const phoneNumber = "+573242855700";
    const message =
      "Hola " +
      formData.nombre +
      " " +
      formData.apellido +
      " " +
      formData.mensaje;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const enviarEmail = () => {
    if (!logueado) {
      setOpenError(true);
      return;
    }
    const templateParams = {
      from_name: `${formData.nombre} ${formData.apellido}`,
      message: formData.mensaje,
      to_email: "dasd@dasd", // El email del cliente logeado
    };

    emailjs
      .send(
        "service_1etbmla", // Reemplaza con tu service ID de EmailJS
        "template_in1do8k", // Reemplaza con tu template ID de EmailJS
        templateParams,
        "P6tmoHQghWd8ZBBFq" // Reemplaza con tu user ID de EmailJS
      )
      .then(
        (response) => {
          console.log(
            "Correo enviado exitosamente:",
            response.status,
            response.text
          );
          alert("El correo ha sido enviado correctamente.");
        },
        (err) => {
          console.error("Error al enviar el correo:", err);
          alert("Hubo un error al enviar el correo.");
        }
      );
  };

  return (
    <>
      <FormComponent
        open={openError}
        onClose={() => setOpenError(false)}
        title={"Error"}
        children={"Inicia Secion"}
        actions={
          <Button
            onClick={() => setOpenError(false)}
            variant="contained"
            color="error"
          >
            Cerrar
          </Button>
        }
      />

      <HeaderPublic />

      <Box
        sx={{
          flexGrow: 1,
          marginTop: 4,
          p: 3,
          backgroundColor: "white",
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "90%",
                backgroundColor: "#fff",
                p: 4,
                borderRadius: 2,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Typography variant="h6" sx={{ color: "#66A5AD" }} gutterBottom>
                Ahora
              </Typography>
              <Typography variant="h4" gutterBottom>
                Contactanos
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                ¿Estas Interesedo En Un Teatro O Tienes Alguna Duda?
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                   required
                    label="Nombre"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                  required
                    label="Apellido"
                    value={formData.apellido}
                    onChange={(e) =>
                      setFormData({ ...formData, apellido: e.target.value })
                    }
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                  required
                    label="Mensaje"
                    value={formData.mensaje}
                    onChange={(e) =>
                      setFormData({ ...formData, mensaje: e.target.value })
                    }
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={enviarWhatsapp}
                    variant="contained"
                    color="success"
                    fullWidth
                  >
                    <WhatsAppIcon /> Enviar Mensaje
                  </Button>
                  <Button></Button>
                  <Button
                    onClick={enviarEmail}
                    variant="contained"
                    color="error"
                    fullWidth
                  >
                    <EmailIcon /> Enviar Mensaje
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                alt="User Image"
                src={Logo}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  mb: 3,
                  filter: `drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.5))`,
                }}
              />
              <List
                sx={{
                  background:
                    "linear-gradient(900deg, #003B46,#07575B ,#66A5AD,#C4dfe6)",
                  color: "white",
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
                  p: 3,
                  borderRadius: 2,
                }}
              >
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    secondaryTypographyProps={{
                      style: {
                        color: "white",
                      },
                    }}
                    primary="Email"
                    secondary="datech@datech.com"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText
                    secondaryTypographyProps={{
                      style: {
                        color: "white",
                      },
                    }}
                    primary="Phone"
                    secondary="+57 3242855700"
                  />
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <FooterPublic />
    </>
  );
}
