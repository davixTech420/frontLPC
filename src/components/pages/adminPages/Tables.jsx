import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HeaderRol from "../../partials/HederRol";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Container,
  Toolbar,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
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
import { SrcImagen } from "../../../services/publicServices";
import "../../../assets/admin.css";

const VistaTabla = () => {
  const { tablaId } = useParams();
  const [selectedRow, setSelectedRow] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  /**
   *
   *
   *
   *
   *  * este codigo es para seleccionar el cliente a editar *
   * *
   * *
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

  useEffect(() => {
    setOpenForm(false);

    fetchData();
  }, [tablaId]);
  const eliminarRegistros = async (id) => {
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
                  <Button className="btn-admin-panel"   variant="contained" sx={{ marginInline: 2 }}>
                    Reporte
                  </Button>
                  <TextField
                    id="standard-basic"
                    label="Buscar"
                    variant="standard"
                    placeholder="Ingrese su búsqueda"
                    InputProps={{
                      startAdornment: (
                        <Box sx={{ mr: 1 }}>
                          <SearchIcon />
                        </Box>
                      ),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <TableContainer component={Paper}>
                  {data && (
                    <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          {data.columns.map((column) => {
                            if (
                              column !== "createdAt" &&
                              column !== "updatedAt" &&
                              column !== "password"
                            ) {
                              return <TableCell>{column}</TableCell>;
                            }
                          })}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.rows.map((row) => (
                          <TableRow
                            key={row.id} // Add a unique key for each row
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            {data.columns.map((column) => {
                              if (
                                column !== "createdAt" &&
                                column !== "updatedAt" &&
                                column !== "password"
                              ) {
                                // Check if the column is not createdAt or updatedAt
                                return (
                                  <TableCell key={column}>
                                    {column === "estado" ? (
                                      row[column].toString().trim() ===
                                      "false" ? (
                                        <span style={{ color: "white",background:"red",borderRadius:25, padding:8 }}>
                                          Inactivo
                                        </span>
                                      ) : row[column].toString().trim() ===
                                        "true" ? (
                                        <span style={{ color: "white",background:"green",borderRadius:25, padding:8 }}>
                                          Activo
                                        </span>
                                      ) : (
                                        row[column] // Display other values
                                      )
                                    ) : typeof row[column] === "string" &&
                                       row[column].startsWith("/images/")  ? (
                                      <img
                                        width={100}
                                        height={100}
                                        src={SrcImagen(row[column])}  
                                        alt={column}
                                      />
                                    ) : (
                                      row[column]
                                    )}
                                  </TableCell>
                                );
                              }
                              return null; // Don't render the hidden columns
                            })}
                            <TableCell>
                            <Button onClick={() => row.estado === false ?  activarRegistros(row.id)
                           : inactivarRegistros(row.id) }>{row.estado === false ? <ToggleOffIcon sx={{ color: "gray" }} /> : <ToggleOnIcon/> }</Button>

                              <Button
                                onClick={(e) => eliminarRegistros(row.id)}
                              >
                                <DeleteIcon color="error" />
                              </Button>
                              <Button onClick={(e) => handleEdit(row)}>
                                <EditIcon sx={{ color: "#07575B" }} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TableContainer>
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
