import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  TextField,
  InputAdornment,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  LocationOn,
  Close,
  Send,
  EventSeat,
  Person,
  // ChevronLeft,
  // ChevronRight,
  Star,
  Theaters,
} from '@mui/icons-material';
import HeaderPublic from "../../partials/HeaderPublic";
import FooterPublic from "../../partials/FooterPublic";
import Map from "../component/Map";
// Assume these functions are imported from your services
import { enviarMensaje } from "../../../services/ClienteServices";
import {
  SrcImagen,
  getSalasId,
  getSalas,
  getJefeId,
} from "../../../services/publicServices";

const TheaterCard = ({ theater, onClick }) => {
  const theme = useTheme();

  return (




    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: `0 10px 30px ${theme.palette.primary.main}40`,
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            paddingTop: '56.25%',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={SrcImagen(theater.imagen)}
            alt={theater.nombre}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
            }}
          />
        </Box>
        <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',background:"linear-gradient(45deg,#66A5AD ,#07575B ,#003B46)" }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {theater.nombre}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <LocationOn sx={{ color: theme.palette.secondary.light, mr: 0.5 }} fontSize="small" />
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              {theater.direccion}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Chip
              icon={<EventSeat sx={{ color: theme.palette.secondary.light }} />}
              label={`${theater.capacidad} asientos`}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Star sx={{ color: theme.palette.secondary.light, mr: 0.5 }} fontSize="small" />
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                {(Math.random() * (5 - 4) + 4).toFixed(1)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

const VibrantTheaterRental = () => {
  const [theaters, setTheaters] = useState([]);
  const [filteredTheaters, setFilteredTheaters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [manager, setManager] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchTheaters = async () => {
      const response = await getSalas();
      setTheaters(response.data);
      setFilteredTheaters(response.data);
    };
    fetchTheaters();
  }, []);

  useEffect(() => {
    setFilteredTheaters(
      theaters.filter((theater) =>
        theater.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, theaters]);

  const handleTheaterSelect = async (theater) => {
    setSelectedTheater(theater);
    const managerResponse = await getJefeId(theater.id);
    setManager(managerResponse.data);
    // setCurrentImageIndex(0); // Reset image index when selecting a new theater
    setIsDialogOpen(true);
  };

  const handleSendMessage = async () => {
    const message = {
      emisor: 'currentUserId', // Replace with actual user ID
      receptor: manager.id,
      contenido: `Hola, estoy interesado en tu teatro ${selectedTheater.nombre}`,
      fechaEnvio: new Date(),
    };
    await enviarMensaje(message);
    setIsDialogOpen(false);
  };

  // const handleNextImage = () => {
  //   if (selectedTheater && selectedTheater.imagenes) {
  //     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedTheater.imagenes.length);
  //   }
  // };

  // const handlePrevImage = () => {
  //   if (selectedTheater && selectedTheater.imagenes) {
  //     setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedTheater.imagenes.length) % selectedTheater.imagenes.length);
  //   }
  // };

  return (


    <Box>

      <HeaderPublic />

      <Box sx={{ maxWidth: '1200px', margin: 'auto', padding: 3 }}>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" align="center" sx={{
            fontWeight: 900,
            color: theme.palette.primary.main,
            mb: 4,
            textShadow: `2px 2px 4px ${theme.palette.primary.light}`,
          }}>
            Descubre Teatros Mágicos
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Busca tu teatro ideal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 4,
              '& .MuiOutlinedInput-root': {
                borderRadius: '30px',
                backgroundColor: theme.palette.background.paper,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
                '&.Mui-focused': {
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                },
              },
            }}
          />
        </motion.div>

        <Grid container spacing={3}>
          <AnimatePresence>
            {filteredTheaters.map((theater) => (
              <Grid item xs={12} sm={6} md={4} key={theater.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <TheaterCard theater={theater} onClick={() => handleTheaterSelect(theater)} />
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: '20px',
              overflow: 'hidden',
              bgcolor: theme.palette.background.paper,
            },
          }}
        >
          <DialogTitle sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component="span" sx={{
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              textShadow: `1px 1px 2px ${theme.palette.primary.light}`,
            }}>
              {selectedTheater?.nombre}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={() => setIsDialogOpen(false)}
              sx={{
                color: theme.palette.grey[500],
                '&:hover': { color: theme.palette.primary.main },
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 0 }}>
            <Box sx={{ position: 'relative', height: isMobile ? '300px' : '400px', overflow: 'hidden' }}>
              {selectedTheater && selectedTheater.imagen && (
                <Box
                  component="img"
                  src={SrcImagen(selectedTheater.imagen)}
                  alt={selectedTheater.nombre}
                  sx={{
                    width: '100%',
                    height: '100%',
                   
                    objectFit: 'cover',
                  }}
                />
              )}
            </Box>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{
                    fontWeight: 'bold',
                    color: "linear-gradient(45deg,#66A5AD ,#07575B ,#003B46)",
                    textShadow: `1px 1px 2px ${theme.palette.secondary.light}`,
                  }}>
                    Detalles del Teatro
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EventSeat  sx={{ color:"#07575B" }} />
                      <Typography variant="body1">Capacidad: {selectedTheater?.capacidad}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn sx={{ color:"#07575B" }} />
                      <Typography variant="body1">Dirección: {selectedTheater?.direccion}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Person sx={{ color:"#07575B" }} />
                      <Typography variant="body1">Jefe de la Sala: {manager?.nombre}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{
                    fontWeight: 'bold',
                    color: "linear-gradient(45deg,#66A5AD ,#07575B ,#003B46)",
                    textShadow: `1px 1px 2px ${theme.palette.secondary.light}`,
                  }}>
                    Ubicación
                  </Typography>
                  {/* <Box
                    sx={{
                      height: '200px',
                      bgcolor: theme.palette.primary.light,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.palette.primary.contrastText,
                    }}
                  >
                    
                    <Theaters sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="body2">
                      Mapa no disponible
                    </Typography>
                  </Box> */}
                  <Map address={"teatro colon"}/>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
            <Button
              onClick={() => setIsDialogOpen(false)}
              variant="outlined"
              sx={{
                borderRadius: '20px',
                borderColor: "linear-gradient(45deg,#66A5AD ,#07575B ,#003B46)",
                color: "linear-gradient(45deg,#66A5AD ,#07575B ,#003B46)",
                '&:hover': {
                  borderColor: theme.palette.secondary.dark,
                  backgroundColor: theme.palette.secondary.light,
                },
              }}
            >
              Cerrar
            </Button>
            <Button
              variant="contained"
              startIcon={<Send />}
              onClick={handleSendMessage}
              sx={{
                borderRadius: '20px',
                background:"linear-gradient(45deg,#66A5AD ,#07575B ,#003B46)",
                color: theme.palette.secondary.contrastText,
                boxShadow: `0 4px 10px ${theme.palette.secondary.main}40`,
                '&:hover': {
                  bgcolor: theme.palette.secondary.dark,
                  boxShadow: `0 6px 12px ${theme.palette.secondary.main}60`,
                },
              }}
            >
              Contactar Teatro
            </Button>
          </DialogActions>
        </Dialog>

      </Box>
      <FooterPublic />
    </Box>
  );
};

export default VibrantTheaterRental;