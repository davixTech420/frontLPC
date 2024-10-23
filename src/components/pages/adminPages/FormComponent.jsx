import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import axios from 'axios';
import { PhotoCamera } from "@mui/icons-material";
import { SrcImagen } from "../../../services/publicServices";
import InputValidate from "../component/ValidateInput";
import {
  Box,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Fade,
  Avatar,
  Typography,
} from "@mui/material";
import { crearSala, crearShow, updateSala, updateUser, getSalasSin, getSalasCon } from "../../../services/AdminServices";
import "../../../assets/admin.css";
export const FormComponent = ({ open, onClose, title, children, actions }) => {
  return (
    <Dialog open={open} onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: 40,
        },
      }}
      TransitionComponent={Fade}
      transitionDuration={{ enter: 500, exit: 500 }} >
      <DialogTitle sx={{ background: "#07575B", color: "white" }}>
        {title}{" "}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon color="error" />
        </IconButton>{" "}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={{ justifyContent: "center", background: "#07575B" }}>{actions}</DialogActions>
    </Dialog>
  );
};

export const FormAdmin = ({ open, close, record }) => {

  const [formData, setFormData] = useState({
    nombre: record?.nombre || "",
    apellido: record?.apellido || "",
    tipIdentidad: record?.tipIdentidad || "",
    identificacion: record?.identificacion || "",
    telefono: record?.telefono || "",
    email: record?.email || "",
    password: record?.password || "",
    estado: true,
    role: "admin",
  });
  useEffect(() => {
    if (record) {
      setFormData({
        nombre: record.nombre,
        apellido: record.apellido,
        tipIdentidad: record.tipIdentidad,
        identificacion: record.identificacion,
        telefono: record.telefono,
        email: record.email,
        password: record.password,
        estado: record.estado
      });
    } else {
      setFormData({
        nombre: "",
        apellido: "",
        tipIdentidad: "",
        identificacion: "",
        telefono: "",
        email: "",
        password: "",
        estado: true,
        role: "admin"
      });
    }

  }, [record, open]);

  const hanSubmit = async (e) => {
    try {
      const regis = await axios.post('http://localhost:3001/api/auth/register', formData);
      console.log(regis.data);
      close();
    } catch (error) {
      console.log(error);
    }
  };
  const hanUpdate = async (e) => {

    try {
      const regis = updateUser(record.id, formData);
      console.log(regis.data);
      close();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    if (record) {
      hanUpdate(formData);
    } else {
      hanSubmit(formData);
    }

  }
  return (
    <FormComponent
      open={open}
      onClose={close}
      title={record ? "Actualizar Administrador" : "Crear Administrador"}
      children={
        <Box sx={{ mt: 3, p: 3 }} component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputValidate nombre="nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })} />

            </Grid>
            <Grid item xs={12} sm={6}>
              <InputValidate nombre="apellido"
                value={formData.apellido}
                onChange={(e) =>
                  setFormData({ ...formData, apellido: e.target.value })} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl focused variant="standard" sx={{ minWidth: "100%" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Tipo De Identificacion
                </InputLabel>
                <Select

                  value={formData.tipIdentidad}
                  onChange={(e) =>
                    setFormData({ ...formData, tipIdentidad: e.target.value })
                  }
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"C.C"}>Cedula Ciudadania</MenuItem>
                  <MenuItem value={"T.I"}>Tarjeta De Identidad</MenuItem>
                  <MenuItem value={"Pasaporte"}>Pasaporte</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputValidate nombre="identificacion"
                value={formData.identificacion}
                onChange={(e) =>
                  setFormData({ ...formData, identificacion: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <InputValidate nombre="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

            </Grid>
            <Grid item xs={12}>
              <InputValidate nombre="telefono"
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
              />

            </Grid>
            <Grid item xs={12}>
              <InputValidate nombre="pass"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

            </Grid>
          </Grid>
        </Box>
      }
      actions={
        <>
          <Button variant="contained" className="btn-admin-panel" onClick={handleSubmit}>
            {record ? "Actualizar" : "Crear"}
          </Button>
        </>
      }
    />
  );
};










/**
**
*
*
**este es el formulario del cliene *
***
*
*
*
*
*
*/




export const FormCliente = ({ open, close }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    tipIdentidad: "",
    identificacion: "",
    telefono: "",
    nacionCliente: "",
    direccion: "",
    email: "",
    password: "",
    estado: true,
    role: "cliente",
  });


  const hanSubmit = async (e) => {
    e.preventDefault();
    try {
      const regis = await axios.post('http://localhost:3001/api/auth/register', formData);
      console.log(regis.data);
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormComponent
      open={open}
      onClose={close}
      title={"Crear Cliente"}
      children={
        <Box sx={{ mt: 3, p: 3 }} component="form" onSubmit={hanSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                required
                fullWidth
                id="nombre"
                label="Nombre"
                autoFocus
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={formData.apellido}
                onChange={(e) =>
                  setFormData({ ...formData, apellido: e.target.value })
                }
                id="apellido"
                label="Apellido"
                name="apellido"
                autoComplete="family-name"
                variant="filled"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="filled" sx={{ minWidth: "100%" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Tipo De Identificacion
                </InputLabel>
                <Select
                  value={formData.tipIdentidad}
                  onChange={(e) =>
                    setFormData({ ...formData, tipIdentidad: e.target.value })
                  }
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"C.C"}>Cedula Ciudadania</MenuItem>
                  <MenuItem value={"T.I"}>Tarjeta De Identidad</MenuItem>
                  <MenuItem value={"Pasaporte"}>Pasaporte</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={formData.identificacion}
                onChange={(e) =>
                  setFormData({ ...formData, identificacion: e.target.value })
                }
                id="identificacion"
                label="Identificacion"
                name="identificacion"
                autoComplete="family-name"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formData.direccion}
                onChange={(e) =>
                  setFormData({ ...formData, direccion: e.target.value })
                }
                id="direccion"
                variant="filled"
                label="Direccion"
                name="Direccion"

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formData.nacionCliente}
                onChange={(e) =>
                  setFormData({ ...formData, nacionCliente: e.target.value })
                }
                id="nacionalidad"
                variant="filled"
                label="Nacionalidad"
                name="Nacionalidad"

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                id="email"
                variant="filled"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
                id="telefono"
                variant="filled"
                label="Telefono"
                name="telefono"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="filled"
              />
            </Grid>
          </Grid>
        </Box>
      }
      actions={
        <>
          <Button variant="contained" onClick={hanSubmit}>
            Crear
          </Button>
        </>
      }
    />
  );
};

/**
 * **
 * *
 * **
 * *
 * *
 * 
 * *
 * *aca terminal el formulario del cliente *
 * *
 * *
 * *
 * *
 * *
 * *
 * **/




/* *
*
*
*
*
*
*
*
*
este es  el fromulario para crear salas *
*
*
*
*
*
*
**/
export const FormSala = ({ open, close, record }) => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    imagen: record?.imagen || "",
    nombre: record?.nombre || "",
    direccion: record?.direccion || "",
    capacidad: record?.capacidad || "",
    estado: record?.estado || true
  });
  useEffect(() => {
    if (record) {
      setFormData({
        imagen: record.imagen,
        nombre: record.nombre,
        direccion: record.direccion,
        capacidad: record.capacidad,
        estado: record.estado
      });
    } else {
      setFormData({
        imagen: image,
        nombre: "",
        direccion: "",
        capacidad: "",
        estado: true,
      });
    }

  }, [record, open]);

  const hanUpdate = async (e) => {

    try {
      const regis = updateSala(record.id, formData);
      console.log(regis.data);
      close();
    } catch (error) {
      console.log(error);
    }
  };
  const hanSubmit = async (e) => {

    try {
      const regis = crearSala(formData);
      console.log(regis.data);
      close();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {

    if (record) {
      hanUpdate(formData);
    } else {
      hanSubmit(formData);
    }
    close();
  }


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



  return (
    <FormComponent
      open={open}
      onClose={close}
      title={"Crear Sala"}
      children={
        <Box sx={{ mt: 3, p: 3 }} component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
                {image || formData.imagen ? (
                  <Avatar
                    src={image || SrcImagen(formData.imagen)}
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

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                id="nombre"
                label="nombre"
                name="nombre"
                autoComplete="family-name"
                variant="filled"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                value={formData.capacidad}
                onChange={(e) =>
                  setFormData({ ...formData, capacidad: e.target.value })
                }
                id="capacidad"
                variant="filled"
                label="Capacidad"
                name="capacidad"
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                required
                fullWidth
                value={formData.direccion}
                onChange={(e) =>
                  setFormData({ ...formData, direccion: e.target.value })
                }
                id="direccion"
                label="Direccion"
                name="direccion"
                autoComplete="family-name"
                variant="filled"
              />
            </Grid>


          </Grid>
        </Box>
      }
      actions={
        <>
          <Button variant="contained" onClick={handleSubmit}>
            {record ? "Actualizar" : "Crear"}
          </Button>
        </>
      }
    />
  );
};
/**
 * *
 * *
 * *
 * *
 * 
 * *
 *  *
 *  aca termina el formulario de crear salas *
 * *
 * *
 * *
 * *
 * *
 * *
 * */





/** * * **
 * *
 * *
 * *
 * *
 *  * este es el formulario para crear empleados **
 * *
 * *
 * *
 * **
 * 
 */

export const FormEmpleado = ({ open, close, record }) => {

  const [formData, setFormData] = useState({
    nombre: record?.nombre || "",
    apellido: record?.apellido || "",
    tipIdentidad: record?.tipIdentidad || "",
    identificacion: record?.identificacion || "",
    telefono: record?.telefono || "",
    email: record?.email || "",
    password: record?.password || "",
    estado: record?.estado || true,
    role: "empleado",
  });


  useEffect(() => {
    if (record) {
      setFormData({
        nombre: record.nombre,
        apellido: record.apellido,
        tipIdentidad: record.tipIdentidad,
        identificacion: record.identificacion,
        telefono: record.telefono,
        email: record.email,
        password: record.password,
        estado: record.estado,
        role: "empleado",
      })

    } else {
      setFormData({
        nombre: "",
        apellido: "",
        tipIdentidad: "",
        identificacion: "",
        telefono: "",
        email: "",
        password: "",
        estado: true,
        role: "empleado",
      })

    }
  }, [record, open]);


  const hanSubmit = async (e) => {

    try {
      const regis = await axios.post('http://localhost:3001/api/auth/register', formData);
      console.log(regis.data);
      close();
    } catch (error) {
      console.log(error);
    }
  };

  const hanUpdate = async (e) => {

    try {
      const regis = updateUser(record.id, formData);
      console.log(regis.data);
      close();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    if (record) {
      hanUpdate(formData);
    } else {
      hanSubmit(formData);
    }

  }

  return (
    <FormComponent
      open={open}
      onClose={close}
      title={"Crear Empleado"}
      children={
        <Box sx={{ mt: 3, p: 3 }} component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                required
                fullWidth
                id="nombre"
                label="Nombre"
                autoFocus
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={formData.apellido}
                onChange={(e) =>
                  setFormData({ ...formData, apellido: e.target.value })
                }
                id="apellido"
                label="Apellido"
                name="apellido"
                autoComplete="family-name"
                variant="filled"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="filled" sx={{ minWidth: "100%" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Tipo De Identificacion
                </InputLabel>
                <Select
                  value={formData.tipIdentidad}
                  onChange={(e) =>
                    setFormData({ ...formData, tipIdentidad: e.target.value })
                  }
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"C.C"}>Cedula Ciudadania</MenuItem>
                  <MenuItem value={"T.I"}>Tarjeta De Identidad</MenuItem>
                  <MenuItem value={"Pasaporte"}>Pasaporte</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={formData.identificacion}
                onChange={(e) =>
                  setFormData({ ...formData, identificacion: e.target.value })
                }
                id="identificacion"
                label="Identificacion"
                name="identificacion"
                autoComplete="family-name"
                variant="filled"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                id="email"
                variant="filled"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
                id="telefono"
                variant="filled"
                label="Telefono"
                name="telefono"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="filled"
              />
            </Grid>
          </Grid>
        </Box>
      }
      actions={
        <>
          <Button variant="contained" onClick={handleSubmit}>
            Crear
          </Button>
        </>
      }
    />
  );
};
/**
 * 
 * 
 * 
 * aca termina este formulario
 * 
 * 
 * 
 */



/* *
*
*
*
*
*
*
*
*
este es  el fromulario para crear shows *
*
*
*
*
*
*
**/
export const FormShows = ({ open, close }) => {
  const [salas, setSalas] = useState([]);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    imagen: image,
    nombre: "",
    cuposDisponibles: "",
    fechaPresentar: "",
    horaInicio: "",
    horaFin: "",
    estado: true,
    salaId: "",
  });
  useEffect(() => {
    try {
      const obteSalas = async () => {
        const resSala = await getSalasCon();
        setSalas(resSala.data);
      }
      obteSalas();
    }
    catch (error) {
      console.log(error);
    }
  }, [salas])

  const hanSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const regis = crearShow(formData);
      console.log(regis.data);
      close();
    } catch (error) {
      console.log(error);
    }
  };

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
  return (
    <FormComponent
      open={open}
      onClose={close}
      title={"Crear Show"}
      children={
        <Box sx={{ mt: 3, p: 3 }} component="form" noValidate onSubmit={hanSubmit}>
          <Grid container spacing={2}>
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
                id="nombre"
                label="nombre"
                name="nombre"
                autoComplete="family-name"
                variant="filled"
              />
            </Grid>


            <Grid item xs={12} >
              <TextField
                required
                fullWidth
                value={formData.cuposDisponibles}
                onChange={(e) =>
                  setFormData({ ...formData, cuposDisponibles: e.target.value })
                }
                id="Cupones Disponibles"
                label="Cupones Disponibles"
                name="Cupones Disponibles"
                autoComplete="family-name"
                variant="filled"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="date"
                value={formData.fechaPresentar}
                onChange={(e) => {
                  // Solo toma la fecha en formato YYYY-MM-DD
                  const fechaSolo = e.target.value.split("T")[0] || e.target.value;
                  setFormData({ ...formData, fechaPresentar: fechaSolo });
                }}
                id="fechaPresentar"
                variant="filled"
                label="fechaPresentar"
                name="fechaPresentar"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                type="time"
                value={formData.horaInicio}
                onChange={(e) =>
                  setFormData({ ...formData, horaInicio: e.target.value })
                }
                id="horaInicio"
                variant="filled"
                label="Hora Inicio"
                name="Hora Inicio"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                type="time"
                value={formData.horaFin}
                onChange={(e) =>
                  setFormData({ ...formData, horaFin: e.target.value })
                }
                id="horaFin"
                variant="filled"
                label="horaFin"
                name="horaFin"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
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
                  {salas.map((sala) => (
                    <MenuItem value={sala.id}>{sala.nombre}</MenuItem>
                  ))
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      }
      actions={
        <>
          <Button className="btn-admin-panel" variant="contained" onClick={hanSubmit}>
            Crear
          </Button>
        </>
      }
    />
  );
};
/**
 * *
 * *
 * *
 * *
 * 
 * *
 *  *
 *  aca termina el formulario de crear shows *
 * *
 * *
 * *
 * *
 * *
 * *
 * */





/* *
*
*
*
*
*
*
*
*
este es  el fromulario para crear jefes de salas *
*
*
*
*
*
*
**/
export const FormJefe = ({ open, close }) => {

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    tipIdentidad: "",
    identificacion: "",
    telefono: "",
    email: "",
    password: "",
    estado: true,
    role: "jefesala",
    salaId: "",
  });
  const [salas, setSalas] = useState([]);


  useEffect(() => {
    try {
      const obteSalas = async () => {
        const resSala = await getSalasSin();
        setSalas(resSala.data);
      }
      obteSalas();
    }
    catch (error) {
      console.log(error);
    }
  }, [salas])



  const hanSubmit = async (e) => {
    e.preventDefault();
    try {
      const regis = await axios.post(`http://localhost:3001/api/auth/register`, formData);
      console.log(regis.data);
      close();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FormComponent
      open={open}
      onClose={close}
      title={"Crear Jefe De Sala"}
      children={
        <Box sx={{ mt: 3, p: 3 }} component="form" noValidate onSubmit={hanSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                required
                fullWidth
                id="nombre"
                label="Nombre"
                autoFocus
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={formData.apellido}
                onChange={(e) =>
                  setFormData({ ...formData, apellido: e.target.value })
                }
                id="apellido"
                label="Apellido"
                name="apellido"
                autoComplete="family-name"
                variant="filled"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl variant="filled" sx={{ minWidth: "100%" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Tipo De Identificacion
                </InputLabel>
                <Select
                  value={formData.tipIdentidad}
                  onChange={(e) =>
                    setFormData({ ...formData, tipIdentidad: e.target.value })
                  }
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>


                  <MenuItem value={"C.C"}>Cedula Ciudadania</MenuItem>
                  <MenuItem value={"T.I"}>Tarjeta De Identidad</MenuItem>
                  <MenuItem value={"Pasaporte"}>Pasaporte</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={formData.identificacion}
                onChange={(e) =>
                  setFormData({ ...formData, identificacion: e.target.value })
                }
                id="identificacion"
                label="Identificacion"
                name="identificacion"
                autoComplete="family-name"
                variant="filled"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                id="email"
                variant="filled"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
                id="telefono"
                variant="filled"
                label="Telefono"
                name="telefono"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
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
                  {salas.map((sala) => (
                    <MenuItem value={sala.id}>{sala.nombre}</MenuItem>
                  ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="filled"
              />
            </Grid>
          </Grid>
        </Box>
      }
      actions={
        <>
          <Button variant="contained" onClick={hanSubmit}>
            Crear
          </Button>
        </>
      }
    />
  );
};
/**
 * *
 * *
 * *
 * *
 * 
 * *
 *  *
 *  aca termina el formulario de crear  jefes de salas *
 * *
 * *
 * *
 * *
 * *
 * *
 * */

