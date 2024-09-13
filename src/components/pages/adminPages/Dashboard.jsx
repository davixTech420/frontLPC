import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HeaderRol from "../../partials/HederRol";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  TableContainer,
} from "@mui/material";
import { Table,TableHead,TableRow,TableCell , TableBody } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { GraficaLine } from "../component/Chart";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

import { getCliente,getJefe } from "../../../services/AdminServices";
import {getShows ,getSalas } from "../../../services/publicServices";

const defaultTheme = createTheme();



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const [clientes,setClientes] = React.useState([]);
  const [salas,setSalas] = React.useState([]);
  const [shows,setShows] = React.useState([]);
  const [jefes,setJefes] = React.useState([]);
  const [beneficios, setBeneficios] = React.useState([]);


  /**
   * 
   * 
   * 
   * 
   *  este codigo es para mostrar los graficos consumiendo la api*
   * 
   * **
   * *
   * 
   *  */
  const calcularBeneficiosPorMes = (shows) => {
    // Inicializar un array de 12 elementos con ceros para contar los shows por mes
    const showsPorMes = new Array(12).fill(0);
  
    shows.forEach(show => {
      const showDate = new Date(show.fechaPresentar);
      const monthIndex = showDate.getUTCMonth(); // Obtén el índice del mes (0 = Enero, 11 = Diciembre)
      showsPorMes[monthIndex] += 1; // Contar un show en el mes correspondiente
    });
  
    return showsPorMes;
  };


  /**
   * 
   * 
   *  * aca consumimos la api *
   * *
   * **/
  React.useEffect(() => {
    const fetchShows = async () => {
      try {
        const resShow = await getShows();
        const beneficiosAgrupados = calcularBeneficiosPorMes(resShow.data);
        setBeneficios(beneficiosAgrupados);
      } catch (error) {
        console.log(error);
      }
    };

    fetchShows();
  }, []);
/**
 * 
 * 
 *  * consume de la api *
 * *
 * **/


  
  var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
  var misoptionsBarras = {
    responsive : true,
    animation : true,
    plugins : {
        legend : {
            display : false
        }
    },
    scales : {
        y : {
            min : 0,
            max : 30
        },
        x: {
            ticks: { color: 'black'}
        }
    }
  };
  
  var midataBarras = {
    labels: meses,
    datasets: [
        {
            label: 'Shows Por Mes',
            data: beneficios,
            backgroundColor: 'black'
        }
    ]
  };


  /*
  *
  *
  *
  ** * 
  aca termina el codigo para las grafica *
  *
  *
  * *
  * *
  * */
  const findSalaById = (salaId) => {
    return salas.find(sala => sala.id === salaId);
  };

  React.useEffect(() => {
   try{
    const obteClientes = async () => {
    const res = await getCliente();
    setClientes(res.data);
    }
    obteClientes();
   }catch(error){
    console.log(error);
   }
  },[])
  
  React.useEffect(() => {
    try{
     const obteSalas = async () => {
     const resSala = await getSalas();
     setSalas(resSala.data);
     }
     obteSalas();
    }catch(error){
     console.log(error);
    }
   },[])
   
   React.useEffect(() => {
    try{
     const obteShow = async () => {
     const resShow = await getShows();
     setShows(resShow.data);
     }
     obteShow();
    }catch(error){
     console.log(error);
    }
   },[])

   React.useEffect(() => {
    try{
     const obteJefe = async () => {
     const resjefe = await getJefe();
     setJefes(resjefe.data);
     }
     obteJefe();
    }catch(error){
     console.log(error);
    }
   },[])
   
   


  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  

console.log(shows);
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const chartData = shows.length > 0 ?
    months.map(month => ({
      label: month,
      data: shows.filter(show => new Date(show.fechaPresentar).getMonth() === months.indexOf(month)).length,
    })) :
    [];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

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
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* se muestra el contenido en lateral de de los cuadros de informacion  */}
              <Grid item xs={12} md={15} lg={15}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection:{ xs:"column" , lg:"fillColumn", md:"row"    } ,
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Card
                    sx={{
                      maxWidth: "100%",
                      margin: "auto",
                      padding: 2,
                      marginInline: "1%",
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 20,
                          textAlign: "left",
                          display: "relative",
                        }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Clientes
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontSize: 35 }}
                      >
                        {clientes.length}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card
                    sx={{
                      maxWidth: "100%",
                      margin: "auto",
                      padding: 2,
                      marginInline: "1%",
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: 20 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Salas
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontSize: 35 }}
                      >
                        {salas.length }
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card
                    sx={{
                      maxWidth: "100%",
                      margin: "auto",
                      padding: 2,
                      marginInline: "1%",
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: 20 }}
                        color="text.secondary"
                        gutterBottom
                      >
                       Shows
                      </Typography>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontSize: 35 }}
                      >
                       {shows.length}
                      </Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>

              {/* Recent Deposits */}
              <Grid item xs={12} md={8} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <GraficaLine />
                 {/*  <img src={Graf} style={{ width: "100%", height: "100%" }} /> */}
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                  overflowY: "auto",
                    flexDirection: "column",
                    height: "70%",
                  }}
                >
                  <center>Jefes De Sala</center>
    <List sx={{ width: '100%', maxWidth: '100%' }}>
     {jefes.map((jefe) => {
      const sala = findSalaById(jefe.salaId);
      return (
        <React.Fragment key={jefe.id}>
          <ListItem sx={{ borderBottom: '1px solid #ddd' }}>
            <ListItemText primary={sala?.nombre || 'Sala no encontrada'} />
            <ListItemText secondary={jefe.nombre} />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      );
    })} 
    </List>
                </Paper>
              </Grid>

              <Grid item xs={12} md={7} lg={7}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    position: "relative",
                    flexDirection: "column",
                    height: "60%",
                  }}
                >
                  <center>Salas</center>
                  <TableContainer>
                 <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Imagen</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Dirección</TableCell>
          <TableCell>Capacidad</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {salas.length > 0 ? (
          salas.map((sala) => (
            <TableRow key={sala.id}>
              <TableCell>{sala.id}</TableCell>
              <TableCell>
                {sala.imagen && <img src={sala.imagen} alt={sala.nombre} width={50} height={50} />} {/* Conditionally render image */}
              </TableCell>
              <TableCell>{sala.nombre}</TableCell>
              <TableCell>{sala.direccion}</TableCell>
              <TableCell>{sala.capacidad}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} align="center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    </TableContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={5} lg={5}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent:"center",
                    height: "60%",
                  }}
                >
                  <center>Estadísticas Por Mes</center>
                  <Bar data={midataBarras} options={misoptionsBarras} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
