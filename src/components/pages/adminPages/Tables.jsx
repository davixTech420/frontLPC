import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HeaderRol from "../../partials/HederRol";
import {
  Box,
  Container,
  Toolbar,
  Grid,
  Button,
  Snackbar,
} from "@mui/material";

import MuiAlert from '@mui/material/Alert';
import {
  FormAdmin,
  FormCliente,
  FormSala,
  FormEmpleado,
  FormShows,
  FormJefe,
} from "./FormComponent";
import {
  eliminarAdmin,
  eliminarSala,
  eliminarCliente,
  eliminarEmpleado,
  eliminarShow,
  eliminarPedido,
  eliminarJefe,
  activarShow,
  inactivarShow,
  cambiarRolUsuario,
} from "../../../services/AdminServices";
import TablaMejorada from "../component/Tabla";
import { SrcImagen } from "../../../services/publicServices";
import "../../../assets/admin.css";

const VistaTabla = () => {
  const { tablaId } = useParams();
  const [selectedRow, setSelectedRow] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleEdit = (row) => {
    setSelectedRow(row);
    setOpenForm(true);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/admin/tabla/${tablaId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      if (error.response && error.response.status === 403) {
        console.error("Acceso prohibido");
      }
    }
  }, [tablaId]);

  const actualizarDatos = useCallback(() => {
    setTriggerUpdate((prev) => prev + 1);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, triggerUpdate]);

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const eliminarRegistros = async (id) => {
    try {
      let resDel;
      switch (tablaId) {
        case "salas":
          resDel = await eliminarSala(id);
          break;
        case "admins":
          resDel = await eliminarAdmin(id);
          break;
        case "clientes":
          resDel = await eliminarCliente(id);
          break;
        case "empleados":
          resDel = await eliminarEmpleado(id);
          break;
        case "shows":
          resDel = await eliminarShow(id);
          break;
        case "jefesalas":
          resDel = await eliminarJefe(id);
          break;
        default:
          throw new Error("Tabla no reconocida");
      }
      actualizarDatos();
      showSnackbar("Registro Eliminado con éxito", "success");
    } catch (error) {
      console.error(error);
      showSnackbar("Error al eliminar el registro", "error");
    }
  };

  const activarRegistros = async (id) => {
    try {
      let resDel;
      switch (tablaId) {
        case "shows":
          resDel = await activarShow(id);
          break;
        default:
          throw new Error("Operación no soportada para esta tabla");
      }
      actualizarDatos();
      showSnackbar("Registro activado con éxito", "success");
    } catch (error) {
      console.error(error);
      showSnackbar("Error al activar el registro", "error");
    }
  };

  const inactivarRegistros = async (id) => {
    try {
      let resDel;
      switch (tablaId) {
        case "shows":
          resDel = await inactivarShow(id);
          break;
        default:
          throw new Error("Operación no soportada para esta tabla");
      }
      actualizarDatos();
      showSnackbar("Registro inactivado con éxito", "success");
    } catch (error) {
      console.error(error);
      showSnackbar("Error al inactivar el registro", "error");
    }
  };

  const cambiarRolRegistros = async (id, rol) => {
    try {
      let resDel;
      resDel = await cambiarRolUsuario(id, rol);
      actualizarDatos();
      showSnackbar("Rol Cambiado Con éxito", "success");
    } catch (error) {
      console.error(error);
      showSnackbar("Error Al Cambiar el rol", "error");
    }
  };

  const renderForm = (tablaId) => {
    const commonProps = {
      open: openForm,
      close: () => setOpenForm(false),
      record: selectedRow,
      onSubmitSuccess: () => {
        actualizarDatos();
        setOpenForm(false);
        showSnackbar("Operación realizada con éxito", "success");
      },
    };

    switch (tablaId) {
      case "admins":
        return <FormAdmin {...commonProps} />;
      case "clientes":
        return <FormCliente {...commonProps} />;
      case "salas":
        return <FormSala {...commonProps} />;
      case "empleados":
        return <FormEmpleado {...commonProps} />;
      case "shows":
        return <FormShows {...commonProps} />;
      case "jefesalas":
        return <FormJefe {...commonProps} />;
      default:
        return <div>No se encontró el formulario correspondiente.</div>;
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <HeaderRol />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            flexDirection: "fillColumn",
          }}
        >
          {tablaId && <>{renderForm(tablaId)}</>}

          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    className="btn-admin-panel"
                    variant="contained"
                    onClick={() => {
                      setOpenForm(true);
                      setSelectedRow(null);
                    }}
                  >
                    Crear
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <TablaMejorada
                  data={data}
                  SrcImagen={SrcImagen}
                  activarRegistros={activarRegistros}
                  inactivarRegistros={inactivarRegistros}
                  eliminarRegistros={eliminarRegistros}
                  setOpenConfirmDialog={setOpenConfirmDialog}
                  cambiarRol={cambiarRolRegistros}
                  handleEdit={handleEdit}
                />
              </Grid>
            </Grid>
            {loading && <p>Cargando...</p>}
          </Container>
        </Box>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default VistaTabla;