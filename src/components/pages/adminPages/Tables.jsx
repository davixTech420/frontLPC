 import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HeaderRol from "../../partials/HederRol";
import {
  Box,
  Container,
  Toolbar,
  Grid,
  Button,
} from "@mui/material";
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
  activarShow,
  inactivarShow,
  eliminarJefe,
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
  /**
   *
   *
   *  * este codigo es para seleccionar el cliente a editar *
   * *
   * */
  const handleEdit = (row) => {
    setSelectedRow(row); // Guardar el registro seleccionado en el estado
    setOpenForm(true); // Abrir el formulario
  };
  /**
   *
   *
   * aca termina
   *
   */
  const fetchData = async () => {
    try {
      // Agregar cabeceras de autenticación si es necesario
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
      // Manejar el error 403 de forma específica
      if (error.response && error.response.status === 403) {
        console.error("Acceso prohibido");
        // Mostrar un mensaje al usuario o redirigir
      }
    }
  };

  const actualizarDatos = () => {
    setTriggerUpdate((prev) => prev + 1);
  }

  useEffect(() => {
    fetchData();
  }, [tablaId, triggerUpdate]);

  const eliminarRegistros = async (id) => {
    let resDel;
    try {
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
          return <div>Ha Ocurrido Un Error</div>;
          break;
      }
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };



  const activarRegistros = async (id) => {
    let resDel;
    try {
      switch (tablaId) {
        case "salas":
          resDel = await eliminarSala(id);
          fetchData();
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
          resDel = await activarShow(id);
          break;
        case "jefesalas":
          resDel = await eliminarJefe(id);
          break;
        default:
          return <div>Ha Ocurrido Un Error</div>;
          break;
      }
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };


  const inactivarRegistros = async (id) => {
    let resDel;
    try {
      switch (tablaId) {
        case "salas":
          resDel = await eliminarSala(id);
          fetchData();
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
          return <div>Ha Ocurrido Un Error</div>;
          break;
      }
      fetchData();

    } catch (error) {
      console.error(error);
    }
  };
  const renderForm = (tablaId) => {
    switch (tablaId) {
      case "admins":
        return (
          <FormAdmin
            open={openForm}
            close={() => setOpenForm(false)}
            record={selectedRow}
          />
        );
      case "clientes":
        return (
          <FormCliente
            open={openForm}
            close={() => setOpenForm(false)}
            record={selectedRow}
          />
        );
      case "salas":
        return (
          <FormSala
            open={openForm}
            close={() => setOpenForm(false)}
            record={selectedRow}
          />
        );
      case "empleados":
        return (
          <FormEmpleado
            open={openForm}
            close={() => setOpenForm(false)}
            record={selectedRow}
          />
        );
      case "shows":
        return (
          <FormShows
            open={openForm}
            close={() => setOpenForm(false)}
            record={selectedRow}
          />
        );
      case "jefesalas":
        return (
          <FormJefe
            open={openForm}
            close={() => setOpenForm(false)}
            record={selectedRow}
          />
        );

      default:
        return <div>No se encontró el formulario correspondiente.</div>;
    }
  };

  // Renderizar la tabla si no hay errores y los datos están cargados
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
                  handleEdit={handleEdit}
                />
              </Grid>
            </Grid>
            {loading && <p>Cargando...</p>}
          </Container>
        </Box>
      </Box>
    </>
  );
};
export default VistaTabla;
 