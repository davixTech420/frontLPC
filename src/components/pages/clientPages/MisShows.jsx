import React, { useEffect, useState } from 'react';
import { MiShows,eliminarPedido } from "../../../services/ClienteServices";
import { SrcImagen } from '../../../services/publicServices';
import { jwtDecode } from 'jwt-decode';

import {
  AppBar,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  CardMedia,
 
  Chip,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

import { styled } from '@mui/system';
import { 
  TheaterComedy, 
  Event, 
  AccessTime, 

} from '@mui/icons-material';
import HeaderPublic from '../../partials/HeaderPublic';

// Crear un tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff3d00',
    },
    background: {
      default: '#1976d2',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
});

// Estilizar el contenedor principal
const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background:"white",
  padding: theme.spacing(3),
}));

// Estilizar las tarjetas
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
  transition: 'transform 0.15s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.6)",
  },
}));

// Función auxiliar para el contenido de las pestañas
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Datos de ejemplo (reemplaza esto con tus datos reales)
const showsData = [
  { id: 1, title: "Hamlet", date: "2023-07-15", time: "20:00", image: "https://source.unsplash.com/random/400x200?theater", rating: 4.5 },
  { id: 2, title: "Romeo y Julieta", date: "2023-07-22", time: "19:30", image: "https://source.unsplash.com/random/400x200?stage", rating: 4.8 },
  { id: 3, title: "El Rey León", date: "2023-07-29", time: "18:00", image: "https://source.unsplash.com/random/400x200?musical", rating: 4.9 },
  { id: 4, title: "Cats", date: "2023-08-05", time: "20:30", image: "https://source.unsplash.com/random/400x200?performance", rating: 4.2 },
];

export default function MisShows() {
  const [value, setValue] = useState(0);
const [shows, setShows] = useState([]);

const [logueado, setLogueado] = useState(null);
const theme = useTheme();
const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setLogueado(decoded);
    }
  }, []);

useEffect(() => {
try{
  if (!logueado?.id) return;
  const misPedidos = async () => {
  const resto= await MiShows(logueado.id);
    setShows(resto.data);
  }
  misPedidos();
}catch(error){
console.log(error);
}
},[logueado]);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return ( 
<>
    <HeaderPublic />
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledBox>
        <AppBar position="static" color="transparent" elevation={0}>
          <Tabs 
          sx={{ mt:10 ,borderRadius:20}}
            value={value} 
            onChange={handleChange} 
            aria-label="shows tabs" 
            variant="fullWidth"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#003B46",
              }
            }}

          >
            <Tab  label="Mis Shows" icon={<TheaterComedy />} />
            <Tab label="Agendados" icon={<Event />} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Grid container spacing={3}>
            {shows.map((show) => (
              <Grid item xs={12} sm={6} md={4} key={show.id}>
                <StyledCard>
                  <CardMedia
                    component="img"
                    height="140"
                    image={SrcImagen(show.imagen)}
                    alt={show.nombre}
                  />
                  <CardContent sx={{ backgroundColor: "#C4DFE6" }}>
                    <Typography variant="h6" component="div" gutterBottom>
                      {show.nombre}
                    </Typography>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Event fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary" ml={1}>
                        {show.fechaPresentar}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={1}>
                      <AccessTime fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary" ml={1}>
                       Hora Inicio:  {show.horaInicio}
                      </Typography>
                      <AccessTime fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary" ml={1}>
                        Hora Fin:  {show.horaFin}
                      </Typography>
                    </Box>
                    
                  </CardContent>
                
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box 
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: 2,
              p: 3,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Próximos Shows Agendados
            </Typography>
            {shows
                  .filter((show) => new Date(show.fechaPresentar) >= new Date())
                  .map((show) => (
                    <Box
                      key={show.id}
                      sx={{
                        width: isLargeScreen ? "calc(50% - 16px)" : "100%",
                        bgcolor: "grey.100",
                        borderRadius: 2,
                        p: 2,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Chip
                            icon={<Event />}
                            label={show.fechaPresentar}
                            color="primary"
                            variant="outlined"
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          <Typography variant="body1">
                            {show.nombre} - {show.horaInicio}
                          </Typography>
                        </Box>
                        <Box>
                          <IconButton size="small" onClick={() => eliminarPedido(show.id) && window.location.reload()}>
                            <DeleteIcon color="error" />
                          </IconButton>
                         
                        </Box>
                      </Box>
                      
                    </Box>
                    
                  ))}
          </Box>
        </TabPanel>
      </StyledBox>
    </ThemeProvider>
    </>
  );
}