import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HeaderPublic from "../../partials/HeaderPublic";
import FooterPublic from "../../partials/FooterPublic";
import { TextField, Card, CardContent, Typography } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  IconButton,
  Button,
  Grid,
  Fade,
  ImageListItemBar,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { enviarMensaje } from "../../../services/ClienteServices";
import {
  getSalasId,
  getSalas,
  getJefeId,
} from "../../../services/publicServices";
import Map from "../component/Map";

export default function Teatros() {
  const [rol, setRol] = useState(null);
  const [idLogueado, setIdLogueado] = useState(null);
  const [salas, setSalas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectTeatro, setSelectTeatro] = useState();
  const [openTeatro, setOpenTeatro] = useState(false);
  const [jefeSelect, setJefeSelect] = useState();

  console.log(selectTeatro);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setRol(decoded.role);
      setIdLogueado(decoded.id);
    }
  }, []);

  const obtenerJefe = async (id) => {
    try {
      const resJefe = await getJefeId(id);
      if (resJefe.status === 500) {
        setJefeSelect(null);
      } else {
        setJefeSelect(resJefe.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*
   *
   *
   *
   *enviar menaje al jefe del teatro */
  const sendMessage = async () => {
    const formData = {
      emisor: idLogueado,
      receptor: jefeSelect?.id,
      contenido:
        "Hola, te saludo estoy interesado en tu " + selectTeatro?.nombre,
      fechaEnvio: new Date(),
    };
    const semd = await enviarMensaje(formData);
    if (semd.status === 201) {
      setOpenTeatro(false);
      alert("Mensaje enviado exitosamente");
    } else {
      alert("Error al enviar el correo");
    }
  };

  /**
   *
   *
   *
   *
   */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSalas();
        setSalas(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredGames(
      salas.filter((game) =>
        game.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, salas]);

  const goGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      selectTeatro?.direccion
    )}`;
    window.open(googleMapsUrl, "_blank");
  };
  return (
    <>
      <Dialog
        open={openTeatro}
        onClose={() => setOpenTeatro(false)}
        PaperProps={{
          style: {
            borderRadius: 50,
          },
        }}
        TransitionComponent={Fade}
        transitionDuration={{ enter: 500, exit: 500 }}
      >
        <DialogTitle sx={{ background:"linear-gradient(900deg,#66A5AD,#C4dfe6,white)"}}>
          <center>{selectTeatro?.nombre}</center>
          <IconButton
            aria-label="close"
            onClick={() => setOpenTeatro(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon color="error" />
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)" }}>
                <CardContent>
                  <Typography variant="h5" color="text.secondary">
                    Capacidad : {selectTeatro?.capacidad}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Direccion : {selectTeatro?.direccion}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Jefe De La Sala : {jefeSelect?.nombre}
                  </Typography>
                  <br />
                 

                  {rol == "cliente" && (
                    <>
                      <center>
                        <br />
                        <br />
                        <Button onClick={sendMessage} variant="outlined">
                          <SendIcon /> Comunicar Con Teatro
                        </Button>
                      </center>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img
                style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)" }}
                src={selectTeatro?.imagen}
                width="100%"
                height="100%"
              />
            </Grid>
          </Grid>{" "}
          <Grid>
            <center> 
              <br />
              <Button
                color="success"
                variant="outlined"
                onClick={goGoogleMaps}
              >
                <LocationOnIcon />
                Mapa
              </Button>
              
            </center>
            <br />
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: { xs: "30vh", md: "50vh" },
              width: "100%",
              
            }}>
            <Map address={selectTeatro?.direccion || selectTeatro?.nombre} />
            </Box>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center",background:"linear-gradient(360deg,#66A5AD,#C4dfe6,white)" }}>
          <Button
            onClick={() => setOpenTeatro(false)}
            variant="contained"
            color="error"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <HeaderPublic />

      <center>
        <h1>Buscas Alquilar Un Teatro?</h1>
      </center>
      {/* contenedor de la vista de teatros con las imagenees  */}
      <Box sx={{ maxWidth: "100%", maxHeight: "80%", marginInline: "30px" }}>
        <TextField
          sx={{ marginBottom: 4 }}
          label="Buscar teatro"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Solo muestra la ImageList si no hay alerta abierta */}

        <ImageList variant="masonry" cols={3} gap={8}>
          {filteredGames.map((sala) => (
            <ImageListItem key={sala.id}>
              <img
                style={{
                  borderRadius: 6,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
                }}
                onClick={() => {
                  setSelectTeatro(sala);
                  setOpenTeatro(true);
                  obtenerJefe(sala.id);
                }}
                src={sala?.imagen}
                alt={`Imagen de ${sala.nombre}`}
                loading="lazy"
              />
              <ImageListItemBar
                style={{
                  borderBottomLeftRadius: 6,
                  borderBottomRightRadius: 6,
                }}
                title={sala.nombre}
                onClick={() => {
                  setSelectTeatro(sala);
                  setOpenTeatro(true);
                  obtenerJefe(sala.id);
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <FooterPublic />
    </>
  );
}
