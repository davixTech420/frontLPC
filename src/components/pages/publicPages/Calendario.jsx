import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import HeaderPublic from "../../partials/HeaderPublic";
import FooterPublic from "../../partials/FooterPublic";
import { FormComponent } from "../adminPages/FormComponent";
import { salasConJefe, crearPedido } from "../../../services/ClienteServices";
import { getShows, getSalasId, SrcImagen } from "../../../services/publicServices";
import { validarFormulario } from "../../../middleware/FormValidation";
import CloseIcon from "@mui/icons-material/Close";
import { PhotoCamera } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Fade,
} from "@mui/material";
import {
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
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { Card, CardContent, Typography } from "@mui/material";

const localizer = momentLocalizer(moment);
function Calendario() {
  const [logueado, setLogueado] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    imagen: image,
    nombre: "",
    cuposDisponibles: "",
    fechaPresentar: fechaSeleccionada,
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setLogueado(decoded);
      setFormData({ ...formData, clienteId: decoded.id });
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

  /**
   *
   *
   *  * este efecto es para obtener la sala del show seleccionado *
   * *
   * *
   * *
   * */
  useEffect(() => {
    const SalaSelect = async () => {
      try {
        const resSala = await getSalasId(selectedEvent?.salaId);
        setSelectedSala(resSala.data);
      } catch (error) {
        console.log(error);
      }
    };
    SalaSelect();
  }, [selectedEvent]);
  /*
   *
   *
   */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getShows();

        // Ajustar fechas y horas de eventos
        const transformedEvents = response.data
          .map((evento) => {
            // Convertir las fechas y horas a objetos Date
            // Asumimos que `fechaPresentar` está en formato YYYY-MM-DD y `horaInicio` y `horaFin` en formato HH:mm:ss
            const startDate = new Date(
              `${evento.fechaPresentar}T${evento.horaInicio}`
            );
            const endDate = new Date(
              `${evento.fechaPresentar}T${evento.horaFin}`
            );

            // Verificar si las fechas son válidas
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
              console.error(
                "Fecha inválida:",
                evento.fechaPresentar,
                evento.horaInicio,
                evento.horaFin
              );
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
  }, []);

  /**
   * *
   * *
   *  * este  codigo es para cambiar y subi  la imagen *
   * *
   *
   *
   *
   */
  const handleImageChange = (e) => {
    const { name, value, files } = e.target;

    // Si se selecciona una imagen (archivo)
    if (files && files.length > 0) {
      const file = files[0];
      setImage(URL.createObjectURL(file)); // Mostrar la imagen en la vista previa
      setFormData({
        ...formData,
        imagen: file, // Guardar el archivo en el formData
      });
    } else {
      // Si se trata de un campo normal (texto, número, etc.)
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  /**
   *
   *
   *
   *
   *
   */
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setOpenShow(true);
  };

  const isSlotEmpty = (slot) => {
    return events.every(
      (event) => !moment(event.start).isSame(slot.start, "day")
    );
  };

  // Manejo de selección de días

  const selectDay = (slot) => {
    try {
      console.log(logueado);
      if (logueado === null || logueado?.role != "cliente") {
        setOpenModal(true);
      } else {
        if (slot.start < new Date()) {
          setOpenModal(true);
          console.log(new Date().toLocaleDateString());
        } else {
          setConfirm(false);
          setSelectedSlot(true);
          const formattedDate = slot.start.toLocaleDateString();
          console.log("Fecha seleccionada:", formattedDate);
          setFechaSeleccionada(formattedDate);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    try {
      const errorForm = validarFormulario(formData, "pedidos");
      if (errorForm) {
        setErrorFormu(errorForm);
        console.log("error de vali", errorForm);
        e.preventDefault();
      } else {
        console.log(formData);
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
    const [day, month, year] = fecha.split("/"); // Separa el día, mes y año
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`; // Retorna en formato YYYY-MM-DD
  };

  /*  useEffect(() => {
    const prueba = () => {
    setFormData({
      ...formData,
      fechaPresentar: convertToDateInputFormat(fechaSeleccionada),
    });
  }
  prueba();
  }, [fechaSeleccionada]);+
 */
  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            borderRadius: 40,
          },
        }}
        TransitionComponent={Fade}
        transitionDuration={{ enter: 500, exit: 500 }}
        open={openShow}
        onClose={() => setOpenShow(false)}
      >
        <DialogTitle
          sx={{ background: "linear-gradient(900deg,#66A5AD,#C4dfe6,white)" }}
        >
          <center>{selectedEvent?.title}</center>
          <IconButton
            aria-label="close"
            onClick={() => setOpenShow(false)}
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
              <img
                style={{
                  borderRadius: 15,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
                }}
                src={SrcImagen(selectedEvent?.imagen)}
                width="100%"
                height="100%"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Contenido del segundo grid */}
              <Card
                sx={{
                  height: "100%",
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
                }}
              >
                <CardContent>
                  <Typography variant="h5" color="text.secondary">
                    Teatro : {selectedEvent?.teatro}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Inicio : {selectedEvent?.start.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fin : {selectedEvent?.end.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cupos Disponibles : {selectedEvent?.cupos}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Direccion : {selectedEvent?.direccion}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>{" "}
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            background: "linear-gradient(360deg,#66A5AD,#C4dfe6,white)",
          }}
        >
          <Button
            onClick={() => setOpenShow(false)}
            variant="contained"
            color="error"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/**
       * *
       * *
       *  * este es el dialog para mostrar el fromulario para que el cliente realizer el pedido del show *
       * *
       * *
       * *
       * **/}
      <FormComponent
        open={selectedSlot}
        onClose={() => setSelectedSlot(false)}
        PaperProps={{
          style: {
            borderRadius: 50,
          },
        }}
        TransitionComponent={Fade}
        transitionDuration={{ enter: 500, exit: 500 }}
        title={"Fecha Valida"}
        children={
          <>
            {confirm == true ? (
              <>
                <Box
                  sx={{ mt: 3, p: 3 }}
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {errorFormu ? (
                        <Alert color="error" severity="error">
                          {errorFormu[0]}
                        </Alert>
                      ) : null}
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          p: 2,
                          width: "100%",
                        }}
                      >
                        {/* Input oculto para subir la imagen */}
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="upload-image"
                          type="file"
                          onChange={handleImageChange}
                        />
                        {/* Botón para seleccionar la imagen */}
                        <label htmlFor="upload-image">
                          <Button
                            variant="outlined"
                            component="span"
                            startIcon={<PhotoCamera />}
                            sx={{
                              display: "block",
                              mb: 2,
                              textTransform: "none",
                            }}
                          >
                            Seleccionar Imagen
                          </Button>
                        </label>

                        {/* Previsualización de la imagen */}
                        {image ? (
                          <Avatar
                            src={image}
                            alt="Preview"
                            sx={{
                              width: 200,
                              height: 200,
                              borderRadius: "10px",
                              boxShadow: 2,
                              objectFit: "cover",
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
                      <TextField
                        required
                        fullWidth
                        value={formData.nombre}
                        onChange={(e) =>
                          setFormData({ ...formData, nombre: e.target.value })
                        }
                        inputProps={{
                          maxLength: 15,
                        }}
                        onKeyDown={(e) => {
                          if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        id="nombre"
                        label="nombre"
                        name="nombre"
                        autoComplete="family-name"
                        variant="filled"
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        fullWidth
                        onKeyPress={(e) => {
                          if (!/[0-9]{1,4}/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        value={formData.cuposDisponibles}
                        onChange={(e) => {
                          if (
                            e.target.value.length < 5 &&
                            e.target.value >= 0
                          ) {
                            setFormData({
                              ...formData,
                              cuposDisponibles: e.target.value,
                            });
                          }
                        }}
                        inputProps={{
                          maxLength: 4,
                        }}
                        type="number"
                        id="cuposDisponibles"
                        label="cuposDisponibles"
                        name="cuposDisponibles"
                        autoComplete="family-name"
                        variant="filled"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        value={convertToDateInputFormat(fechaSeleccionada)}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            fechaPresentar:
                              convertToDateInputFormat(fechaSeleccionada),
                          })
                        }
                        InputProps={{
                          readOnly: true,
                        }}
                        type="date"
                        id="fechaPresentar"
                        variant="filled"
                        label="fechaPresentar"
                        name="fechaPresentar"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        value={formData.horaInicio}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            horaInicio: e.target.value,
                          })
                        }
                        type="time"
                        id="horaInicio"
                        variant="filled"
                        label="horaInicio"
                        name="horaInicio"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
    required
    fullWidth
    value={formData.horaFin}
    onChange={(e) => {
      const horaInicio = formData.horaInicio;
      const horaFin = e.target.value;

      if (horaInicio && horaFin) {
        // Convertir ambas horas a minutos para fácil comparación
        const [horaInicioHoras, horaInicioMinutos] = horaInicio.split(":");
        const [horaFinHoras, horaFinMinutos] = horaFin.split(":");

        const totalMinutosInicio = parseInt(horaInicioHoras) * 60 + parseInt(horaInicioMinutos);
        const totalMinutosFin = parseInt(horaFinHoras) * 60 + parseInt(horaFinMinutos);

        // Validar que horaFin sea mayor a horaInicio
        if (totalMinutosFin > totalMinutosInicio) {
          setFormData({ ...formData, horaFin: horaFin });
        } else {
          setErrorFormu("La hora de fin debe ser posterior a la hora de inicio");
        }
      } else {
        setFormData({ ...formData, horaFin: horaFin });
      }
    }}
    type="time"
    id="horaFin"
    variant="filled"
    label="Hora Fin"
    name="horaFin"
  />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl variant="filled" sx={{ minWidth: "100%" }}>
                        <InputLabel id="demo-simple-select-filled-label">
                          Sala
                        </InputLabel>
                        <Select
                          value={formData.salaId}
                          onChange={(e) =>
                            setFormData({ ...formData, salaId: e.target.value })
                          }
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {salasCon.map((sala) => (
                            <MenuItem value={sala.id}>{sala.nombre}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        value={formData.empleadosRequeridos}
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          if (
                            e.target.value.length < 3 &&
                            e.target.value >= 0 
                          ) {
                            setFormData({
                              ...formData,
                              empleadosRequeridos: e.target.value,
                            });
                          }
                        }}
                        inputProps={{
                          maxLength: 2,

                        }}
                        type="number"
                        id="empleadosRequeridos"
                        variant="filled"
                        label="empleadosRequeridos"
                        name="empleadosRequeridos"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </>
            ) : (
              "Quieres Agendar Un Show Y Realizar El Pedido?"
            )}
          </>
        }
        actions={
          <>
            <Button
              onClick={() => {
                if (!confirm) {
                  setConfirm(true); // Mostrar mensaje de confirmación
                } else {
                  handleSubmit(); // Enviar el formulario
                }
              }}
              variant="contained"
              color="success"
            >
              Confirmar
            </Button>
            {confirm !== true && (
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setOpenModal(false);
                  setSelectedSlot(false);
                }}
              >
                Cerrar
              </Button>
            )}
          </>
        }
      />
      {/**
       * *
       * *
       * *
       *  * este es el dialog para mostrar si la fecha es invalida *
       * *
       * *
       * **/}
      <FormComponent
        open={openModal}
        onClose={() => setOpenModal(false)}
        PaperProps={{
          style: {
            borderRadius: 50,
          },
        }}
        TransitionComponent={Fade}
        transitionDuration={{ enter: 500, exit: 500 }}
        title={logueado == null ? "Error" : "Error"}
        children={
          logueado == null ? <p>Inicia Secion</p> : <p>Fecha Invalida</p>
        }
        actions={
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenModal(false)}
          >
            Cerrar
          </Button>
        }
      />

      {/**
       *
       * *
       * *
       *  * aca terminan los dialogos *
       * *
       *
       * ***/}
      <HeaderPublic />

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            style={{
              height: "100%",
              backgroundColor: "#f5f5f5",
              borderRadius: 15,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
              marginInline: 10,
            }}
          >
            <div
              className="calendar-container"
              style={{ marginTop: 80, marginInline: 30 }}
            >
              <Calendar
                localizer={localizer}
                events={events}
                defaultView="month"
                views={["month", "week"]}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={selectDay}
                selectable={true}
                style={{ height: "500px" }}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            style={{
              height: "100%",
              marginTop: 80,
              backgroundColor: "white",
              borderRadius: 15,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
              marginInline: 10,
            }}
          >
            <center>
              <h1>Eventos Activos</h1>
            </center>

            <List>
              {events.map((image, index) => (
                <>
                  <br />
                  <ListItem
                    sx={{
                      background: "#C4DFE6",
                      width: "87%",
                      borderRadius: 10,
                      marginInline: 5,
                      "&:hover": {
                        boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.5)",
                        zIndex: 10,
                      },
                    }}
                    key={index}
                  >
                    <ListItemAvatar>
                      <Avatar alt={`Image ${index}`} src={SrcImagen(image.imagen)} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={image.title}
                      secondary={image.description}
                    />
                  </ListItem>
                </>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
      <FooterPublic />
    </>
  );
}

export default Calendario;
