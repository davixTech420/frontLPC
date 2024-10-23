import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  Avatar,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  CalendarToday,
  AccessTime,
  LocationOn,
} from "@mui/icons-material";
import Map from "../component/Map";
import FooterPublic from "../../partials/FooterPublic";
import HeaderPublic from "../../partials/HeaderPublic";
import "../../../assets/public.css";
import {
  SrcImagen,
  getShows,
  getSalasId,
} from "../../../services/publicServices"; // Assuming these functions are exported from an api.js file
// Assuming these functions are exported from an api.js file

export default function ModernIndexPage() {
  const [shows, setShows] = useState([]);
  const [nextShow, setNextShow] = useState(null);
  const [nextSala,setNextSala]= useState(null);
  const [currentShowIndex, setCurrentShowIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setIsLoading(true);
        const response = await getShows();
        setShows(response.data);

        // Find the next show
        const closestShow = response.data.reduce((closest, currentShow) => {
          const currentDate = new Date();
          const showDate = new Date(currentShow.fechaPresentar);

          if (showDate <= currentDate) {
            return closest;
          }

          if (!closest) {
            return currentShow;
          }

          const closestDate = new Date(closest.fechaPresentar);
          return showDate < closestDate ? currentShow : closest;
        }, null);

        if (closestShow) {
          const salaInfo = await getSalasId(closestShow.salaId);
          const showWithSalaInfo = {
            ...closestShow,
            sala: salaInfo,
          };
          setNextShow(showWithSalaInfo);
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch shows. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchShows();
  }, []);

 /*  useEffect(() => {
    const obteSala = async () => {
    console.log("proximo",nextShow);
      const res = await getSalasId(nextShow?.id)
      
      console.log("desde la sala",res);
      
    }
obteSala();
  },[nextShow]); */

  const nextShowHandler = () => {
    setCurrentShowIndex((prevIndex) => (prevIndex + 1) % shows.length);
  };

  const prevShowHandler = () => {
    setCurrentShowIndex(
      (prevIndex) => (prevIndex - 1 + shows.length) % shows.length
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  };
  console.log(shows);

  const getGoogleMapsUrl = (address) => {
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
      address
    )}`;
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {error}
      </Box>
    );
  }

  const currentShow = shows[currentShowIndex];
  const daysUntilNextShow = nextShow
    ? Math.ceil(
        (new Date(nextShow.fechaPresentar).getTime() - new Date().getTime()) /
          (1000 * 3600 * 24)
      )
    : null;

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(45deg ,#C4dfe6,#66A5AD ,#07575B ,#003B46)",
        }}
      >
        <HeaderPublic/>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8} >
              <Card
                sx={{
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
                  background: "rgba(255, 255, 255)",
                  backdropFilter: "blur(10px)",
                  borderRadius: theme.shape.borderRadius * 2,
                }}
              >
                <CardContent sx={{ padding: theme.spacing(4) }}>
                  <Box
                    sx={{
                      position: "relative",
                      marginBottom: theme.spacing(4),
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentShowIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Box
                          component="img"
                          src={
                            SrcImagen(currentShow?.imagen) ||
                            "/placeholder.svg?height=300&width=400"
                          }
                        alt={currentShow?.titulo}
                          sx={{
                            width: "100%",
                            height: 300,
                            objectFit: "cover",
                            borderRadius: theme.shape.borderRadius,
                          }}
                        />
                      </motion.div>
                    </AnimatePresence>
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: theme.spacing(2),
                        borderRadius: theme.shape.borderRadius,
                      }}
                    >
                      <Typography
                        variant="h3"
                        component="h1"
                        sx={{ color: "white", fontWeight: "bold", mb: 1 }}
                      >
                        {currentShow?.titulo}
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {currentShow?.tags &&
                          currentShow.tags.map((tag, index) => (
                            <Chip
                              key={index}
                              label={tag}
                              size="small"
                              sx={{
                                backgroundColor: "rgba(255, 255, 255)",
                                color: "white",
                              }}
                            />
                          ))}
                      </Box>
                    </Box>
                  </Box>

                  <Grid
                    container
                    spacing={2}
                    sx={{ marginBottom: theme.spacing(3) }}
                  >
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarToday
                         className="colorPrimaIcon"
                          sx={{ marginRight: 1}}
                        />
                        <Typography variant="body1">
                          {formatDate(currentShow?.fechaPresentar)}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccessTime
                        className="colorPrimaIcon"
                          sx={{ marginRight: 1 }}
                        />
                        <Typography variant="body1">
                          {currentShow?.horaInicio}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationOn
                         className="colorPrimaIcon"
                          sx={{ marginRight: 1 }}
                        />
                        <Typography variant="body1">
                          {currentShow?.sala ? currentShow.sala.direccion : "Bogota D.C"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={prevShowHandler}
                      sx={{ color: "primary.main" }}
                    >
                      <ChevronLeft className="colorPrimaIcon" />
                    </IconButton>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        className="botnWelcome"
                        sx={{
                          "&:hover": {
                            backgroundColor: "primary.dark",
                          },
                        }}
                        onClick={() => {
                          window.location.href= "https://tuboleta.com/"
                        }}
                      >
                        Reservar Ahora
                      </Button>
                    </motion.div>
                    <IconButton
                      onClick={nextShowHandler}
                       className="colorPrimaIcon"
                      sx={{ color: "primary.main" }}
                    >
                      <ChevronRight />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
                  background: "rgba(255, 255, 255)",
                  backdropFilter: "blur(10px)",
                  borderRadius: theme.shape.borderRadius * 2,
                }}
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Próximos Eventos
                  </Typography>
                  {shows.map((show, index) => (
                    <Box
                      key={show.id}
                      sx={{ display: "flex", alignItems: "center", mb: 2 }}
                    >
                      <Avatar
                        src={
                          SrcImagen(show.imagen) ||
                          "/placeholder.svg?height=48&width=48"
                        }
                        sx={{ width: 48, height: 48, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1">
                          {show.titulo}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(show.fechaPresentar)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>

              <Card
                sx={{
                  mt: 2,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
                  background: "rgba(255, 255, 255)",
                  backdropFilter: "blur(10px)",
                  borderRadius: theme.shape.borderRadius * 2,
                }}
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Inicia Secion
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Agenda Tu Show Y Ve Los Shos Cercanos
                  </Typography>
                 
                  <Button className="botnWelcome" fullWidth variant="contained" sx={{ mt: 2 }} onClick={() => window.location.href = '/loginPublic'}>
                    Login
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {nextShow && (
            <Card
              sx={{
                mt: 4,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
                background: "rgba(255, 255, 255)",
                backdropFilter: "blur(10px)",
                borderRadius: theme.shape.borderRadius * 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ color: "primary.main" }}
                >
                  Próximo Show: {nextShow.titulo}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  ¡Faltan solo {daysUntilNextShow} días!
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body1" paragraph>
                      <strong>Fecha:</strong>{" "}
                      {formatDate(nextShow.fechaPresentar)}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      <strong>Hora:</strong>{" "}
                      {nextShow.horaInicio}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      <strong>Ubicación:</strong>{" "}
                      {nextShow.sala ? nextShow.sala.data.direccion : "Bogota D.C"}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      <strong>Dirección:</strong>{" "}
                      {nextShow.sala ? nextShow.sala.data.direccion : "TBA"}
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}
                    >
                      {nextShow.tags &&
                        nextShow.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            size="small"
                            sx={{
                              backgroundColor: "primary.main",
                              color: "white",
                            }}
                          />
                        ))}
                    </Box>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        backgroundColor: "primary.main",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                      }}
                      onClick={() => {
                        window.location.href= "https://tuboleta.com/"
                      }}
                    >
                      Comprar Entradas
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Box
                      sx={{
                        width: "150%",
                        height: 300,
                        position: "relative",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <Map address={"Teatro Colon"} />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Container>

        <FooterPublic />
      </Box>
    </>
  );
}
