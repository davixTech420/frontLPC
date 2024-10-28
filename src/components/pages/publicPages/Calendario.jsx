import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import HeaderPublic from "../../partials/HeaderPublic";
import FooterPublic from "../../partials/FooterPublic";
import { FormComponent } from "../adminPages/FormComponent";
import { salasConJefe, crearPedido } from "../../../services/ClienteServices";
import { getShows, getSalasId, SrcImagen } from "../../../services/publicServices";
import { validarFormulario } from "../../../middleware/FormValidation";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Close as CloseIcon,
  PhotoCamera,
  Event as EventIcon,
  AccessTime,
  LocationOn,
  Person,
  EventSeat,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Fade,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  IconButton,
  Button,
  Grid,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Alert,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import InputValidate from "../component/ValidateInput";
import { jwtDecode } from "jwt-decode";

const localizer = momentLocalizer(moment);

function Calendario() {
  const [logueado, setLogueado] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    imagen: null,
    nombre: "",
    cuposDisponibles: "",
    fechaPresentar: null,
    horaInicio: "",
    horaFin: "",
    salaId: "",
    clienteId: "",
    empleadosRequeridos: "",
  });
  const [errorFormu, setErrorFormu] = useState(null);
  const [salasCon, setSalasCon] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSala, setSelectedSala] = useState();
  const [openShow, setOpenShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [confirm, setConfirm] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setLogueado(decoded);
      setFormData(prevState => ({ ...prevState, clienteId: decoded.id }));
    }

    const fetchSalas = async () => {
      try {
        const response = await salasConJefe();
        setSalasCon(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSalas();
  }, []);

  useEffect(() => {
    const SalaSelect = async () => {
      if (selectedEvent?.salaId) {
        try {
          const resSala = await getSalasId(selectedEvent.salaId);
          setSelectedSala(resSala.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    SalaSelect();
  }, [selectedEvent]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getShows();
        const transformedEvents = response.data
          .map((evento) => {
            const startDate = new Date(`${evento.fechaPresentar}T${evento.horaInicio}`);
            const endDate = new Date(`${evento.fechaPresentar}T${evento.horaFin}`);

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
              console.error("Fecha inválida:", evento.fechaPresentar, evento.horaInicio, evento.horaFin);
              return null;
            }

            return {
              title: evento.nombre || "Evento",
              imagen: evento.imagen,
              cupos: evento.cuposDisponibles,
              salaId: evento.salaId,
              teatro: selectedSala?.nombre,
              direccion: selectedSala?.direccion,
              start: startDate,
              end: endDate,
            };
          })
          .filter((event) => event !== null);
        setEvents(transformedEvents);
      } catch (error) {
        console.error("Error al obtener eventos:", error);
      }
    };
    fetchEvents();
  }, [selectedSala]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFormData(prevState => ({
        ...prevState,
        imagen: file,
      }));
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setOpenShow(true);
  };

  const selectDay = (slot) => {
    try {
      if (logueado === null || logueado?.role !== "cliente") {
        setOpenModal(true);
      } else {
        if (slot.start < new Date()) {
          setOpenModal(true);
        } else {
          setConfirm(false);
          setSelectedSlot(true);
          const formattedDate = slot.start.toLocaleDateString();
          setFechaSeleccionada(formattedDate);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {

    try {
      const errorForm = validarFormulario(formData, "pedidos");
      if (errorForm) {
        setErrorFormu(errorForm);
      } else {
        const enviar = await crearPedido(formData);
        if (enviar) {
          setSelectedSlot(false);
          setOpenModal(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertToDateInputFormat = (fecha) => {
    const [day, month, year] = fecha.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  return (
    <>
      <HeaderPublic />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" align="center" sx={{ mt: 4, mb: 4, fontWeight: 'bold', color: theme.palette.primary.main }}>
          Calendario de eventos
        </Typography>
      </motion.div>

      <Grid container spacing={3} sx={{ px: 3 }}>
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={6}
              sx={{
                height: "100%",
                backgroundColor: theme.palette.background.paper,
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <Box sx={{ p: 3 }}>
                <Calendar
                  localizer={localizer}
                  events={events}
                  defaultView="month"
                  views={["month", "week"]}
                  onSelectEvent={handleSelectEvent}
                  onSelectSlot={selectDay}
                  selectable={true}
                  style={{ height: "600px" }}
                />
              </Box>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper
              elevation={6}
              sx={{
                height: "100%",
                backgroundColor: theme.palette.background.paper,
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <Box sx={{ p: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                  Eventos activos
                </Typography>
                <List>
                  <AnimatePresence>
                    {events.map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <ListItem
                          sx={{
                            mb: 2,
                            backgroundColor: theme.palette.action.hover,
                            borderRadius: 2,
                            transition: 'all 0.3s',
                            '&:hover': {
                              backgroundColor: theme.palette.action.selected,
                              transform: 'translateY(-4px)',
                              boxShadow: theme.shadows[4],
                            },
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar src={SrcImagen(event.imagen)} alt={event.title} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={event.title}
                            secondary={moment(event.start).format('LLL')}
                          />
                        </ListItem>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </List>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      <Dialog
        open={openShow}
        onClose={() => setOpenShow(false)}
        TransitionComponent={Fade}
        transitionDuration={{ enter: 500, exit: 500 }}
        PaperProps={{
          style: {
            borderRadius: 16,
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          },
        }}
      >
        <DialogTitle sx={{
          background: "linear-gradient(45deg,#66A5AD ,#07575B ,#003B46)",
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography variant="h6">{selectedEvent?.title}</Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpenShow(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={SrcImagen(selectedEvent?.imagen)}
                alt={selectedEvent?.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 8,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card elevation={0}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    <EventIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    {selectedEvent?.teatro}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <AccessTime sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Inicio: {selectedEvent?.start.toLocaleString()}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <AccessTime sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Fin: {selectedEvent?.end.toLocaleString()}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <EventSeat sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Cupos Disponibles: {selectedEvent?.cupos}
                  </Typography>
                  <Typography variant="body1">
                    <LocationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
                    {selectedEvent?.direccion}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
          <Button
            onClick={() => setOpenShow(false)}
            variant="contained"
            color="primary"
            className="botnWelcome"
            sx={{ borderRadius: 20 ,
              textTransform: "none", 
            }}

          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <FormComponent
        open={selectedSlot}
        onClose={() => setSelectedSlot(false)}
        PaperProps={{
          style: {
            borderRadius: 16,
          },
        }}
        TransitionComponent={Fade}
        transitionDuration={{ enter: 500, exit: 500 }}
        title={"Fecha válida"}
        children={
          <>
            {confirm ? (
              <Box
                sx={{ mt: 3, p: 3 }}
                component="form"
                noValidate
                onSubmit={handleSubmit}
              >
                <Grid container spacing={3}>
                  {errorFormu && (
                    <Grid item xs={12}>
                      <Alert severity="error">{errorFormu[0]}</Alert>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2,
                        width: '100%',
                      }}
                    >
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="upload-image"
                        type="file"
                        onChange={handleImageChange}
                      />
                      <label htmlFor="upload-image">
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<PhotoCamera />}
                          sx={{
                            mb: 2,
                            borderRadius: 20,

                          }}
                        >
                          Seleccionar imagen
                        </Button>
                      </label>
                      {image ? (
                        <Avatar
                          src={image}
                          alt="Preview"
                          sx={{
                            width: 200,
                            height: 200,
                            borderRadius: 4,
                            boxShadow: 3,
                          }}
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No se ha seleccionado ninguna imagen.
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <InputValidate nombre="nombre" value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                  </Grid>
                  <Grid item xs={12}>
                    <InputValidate nombre="cupos" value={formData.cuposDisponibles}
                      onChange={(e) => setFormData({ ...formData, cuposDisponibles: e.target.value })}

                    />

                  </Grid>
                  <Grid item xs={12}>

                    <InputValidate nombre="fechaPresentar"
                      value={convertToDateInputFormat(fechaSeleccionada)}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          fechaPresentar: convertToDateInputFormat(fechaSeleccionada),
                        })
                      }
                      readOnly={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputValidate nombre="horaInicio"
                        value={formData.horaInicio}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            horaInicio: e.target.value,
                          })
                        }
            
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>

                  <InputValidate nombre="horaFin"
                       value={formData.horaFin}
                       onChange={(e) => {
                         const horaInicio = formData.horaInicio;
                         const horaFin = e.target.value;
 
                         if (horaInicio && horaFin) {
                           const [horaInicioHoras, horaInicioMinutos] = horaInicio.split(":");
                           const [horaFinHoras, horaFinMinutos] = horaFin.split(":");
 
                           const totalMinutosInicio = parseInt(horaInicioHoras) * 60 + parseInt(horaInicioMinutos);
                           const totalMinutosFin = parseInt(horaFinHoras) * 60 + parseInt(horaFinMinutos);
 
                           if (totalMinutosFin > totalMinutosInicio) {
                             setFormData({ ...formData, horaFin: horaFin });
                           } else {
                             setErrorFormu(["La hora de fin debe ser posterior a la hora de inicio"]);
                           }
                         } else {
                           setFormData({ ...formData, horaFin: horaFin });
                         }
                       }}
            
                    />
  
                  </Grid>
                  <Grid item xs={12}>

                    <InputValidate nombre="salas" salasCon={salasCon}
                     value={formData.salaId}
                     onChange={(e) =>
                       setFormData({ ...formData, salaId: e.target.value })
                     }
                    />
                  </Grid>
                  <Grid item xs={12}>

                  <InputValidate nombre="empleado" 
                     value={formData.empleadosRequeridos}
                     onChange={(e) => {
                       const value = e.target.value;
                       if (value.length < 3 && parseInt(value) >= 0) {
                         setFormData({
                           ...formData,
                           empleadosRequeridos: value,
                         });
                       }
                     }}
                    />

                    
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Typography variant="body1" align="center">
                ¿Quieres agendar un show y realizar el pedido?
              </Typography>
            )}
          </>
        }
        actions={
          <>
            <Button
              onClick={() => {
                if (!confirm) {
                  setConfirm(true);
                } else {
                  handleSubmit();
                }
              }}
              variant="contained"

              sx={{ borderRadius: 20,
                textTransform: "none", 
               }}

            >
              Confirmar
            </Button>
            {!confirm && (
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setOpenModal(false);
                  setSelectedSlot(false);
                }}
                sx={{ borderRadius: 20 ,
                  textTransform: "none", 
                }}
              >
                Cerrar
              </Button>
            )}
          </>
        }
      />

      <FormComponent
        open={openModal}
        onClose={() => setOpenModal(false)}
        PaperProps={{
          style: {
            borderRadius: 16,
          },
        }}
        TransitionComponent={Fade}
        transitionDuration={{ enter: 500, exit: 500 }}
        title={logueado == null ? "Error" : "Error"}
        children={
          <Typography variant="body1" align="center">
            {logueado == null ? "Inicia sesión" : "Fecha inválida"}
          </Typography>
        }
        actions={
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenModal(false)}
            sx={{ borderRadius: 20,
              textTransform: "none", 
            }}
          >
            Cerrar
          </Button>
        }
      />

      <FooterPublic />
    </>
  );
}

export default Calendario;