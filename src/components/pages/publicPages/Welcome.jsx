import React, { useState, useEffect } from 'react'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Chip,
  useMediaQuery,
  CircularProgress,
  TextField,
  InputAdornment,
} from '@mui/material'
import {
  ChevronLeft,
  ChevronRight,
  CalendarToday,
  AccessTime,
  LocationOn,
  Search,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material'

// Assuming these functions are imported from your services
import { SrcImagen, getShows, getSalasId } from '../../../services/publicServices'
import HeaderPublic from "../../partials/HeaderPublic";
import FooterPublic from '../../partials/FooterPublic'
import Map from "../component/Map";
import "../../../assets/public.css";

let theme = createTheme({
  palette: {
    primary: {
      main: '#1A5F7A',
    },
    secondary: {
      main: '#FFC300',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#34495E',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 20px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
})

theme = responsiveFontSizes(theme)

export default function MinimalistEventShowcase() {
  const [shows, setShows] = useState([])
  const [nextShow, setNextShow] = useState(null)
  const [currentShowIndex, setCurrentShowIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [favorites, setFavorites] = useState([])

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setIsLoading(true)
        const response = await getShows()
        setShows(response.data)

        const closestShow = response.data.reduce((closest, currentShow) => {
          const currentDate = new Date()
          const showDate = new Date(currentShow.fechaPresentar)

          if (showDate <= currentDate) return closest
          if (!closest) return currentShow

          const closestDate = new Date(closest.fechaPresentar)
          return showDate < closestDate ? currentShow : closest
        }, null)

        if (closestShow) {
          const salaInfo = await getSalasId(closestShow.salaId)
          setNextShow({ ...closestShow, sala: salaInfo })
        }

        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setError('Failed to fetch shows. Please try again later.')
        setIsLoading(false)
      }
    }

    fetchShows()
  }, [])

  const nextShowHandler = () => {
    setCurrentShowIndex((prevIndex) => (prevIndex + 1) % shows.length)
  }

  const prevShowHandler = () => {
    setCurrentShowIndex((prevIndex) => (prevIndex - 1 + shows.length) % shows.length)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    })
  }

  const formatTime = (timeString) => {
    return timeString
  }

  const toggleFavorite = (showId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(showId)
        ? prevFavorites.filter((id) => id !== showId)
        : [...prevFavorites, showId]
    )
  }

  const filteredShows = shows.filter((show) =>
    show.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    )
  }

  const currentShow = shows[currentShowIndex]

  return (



    <Box sx={{ background: "linear-gradient(45deg ,#C4dfe6,#66A5AD ,#07575B ,#003B46)" }}>
      <HeaderPublic />
      <ThemeProvider theme={theme}>

        <Box sx={{
          minHeight: '100vh'
        }}>

          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: 'white', mb: 4, textAlign: 'center' }}>
              Descubre Eventos Increíbles
            </Typography>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: isMobile ? 400 : 500,
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentShowIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                  >
                    <Box
                      component="img"
                      src={SrcImagen(currentShow?.imagen) || '/placeholder.svg?height=500&width=1000'}
                      alt={currentShow?.titulo}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center',
    
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 4,
                  }}
                >
                  <Typography variant="h3" sx={{ color: 'white', mb: 2 }}>
                    {currentShow?.titulo}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {currentShow?.tags &&
                      currentShow.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
                        />
                      ))}
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, color: 'white', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body1">{formatDate(currentShow?.fechaPresentar)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTime sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body1">{formatTime(currentShow?.horaInicio)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body1">
                        {currentShow?.sala ? currentShow.sala.direccion : 'Bogotá D.C'}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    size="large"
                    className="botnWelcome"

                    onClick={() => {
                      window.location.href = 'https://tuboleta.com/'
                    }}
                  >
                    Reservar Ahora
                  </Button>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 2,
                  }}
                >
                  <IconButton onClick={prevShowHandler} sx={{ color: 'white' }}>
                    <ChevronLeft />
                  </IconButton>
                  <IconButton onClick={nextShowHandler} sx={{ color: 'white' }}>
                    <ChevronRight />
                  </IconButton>
                </Box>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box sx={{ mt: 6, mb: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 8,
                      backgroundColor: 'background.paper',
                    },
                  }}
                />
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 , color:"white"}}>
                Próximos Eventos
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 3 }}>
                {filteredShows.map((show) => (
                  <Box
                    key={show.id}
                    sx={{
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <Box
                        component="img"
                        src={SrcImagen(show.imagen) || '/placeholder.svg?height=150&width=250'}
                        alt={show.titulo}
                        sx={{ width: '100%', height: 150, objectFit: 'cover' }}
                      />
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                        }}
                        onClick={() => toggleFavorite(show.id)}
                      >
                        {favorites.includes(show.id) ? (
                          <Favorite sx={{ color: 'secondary.main' }} />
                        ) : (
                          <FavoriteBorder />
                        )}
                      </IconButton>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {show.titulo}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {formatDate(show.fechaPresentar)}
                      </Typography>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          window.location.href = 'https://tuboleta.com/'
                        }}
                      >
                        Ver Detalles
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            </motion.div>

            {nextShow && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Box sx={{ mt: 6, p: 4, bgcolor: 'background.paper', borderRadius: 4, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}>
                    No Te Pierdas Nuestro Próximo  Gran Evento
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 4 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" sx={{ mb: 2 }}>{nextShow.titulo}</Typography>
                      <Typography variant="body1" paragraph>
                        <CalendarToday sx={{ mr: 1, verticalAlign: 'middle', color: 'primary.main' }} />
                        {formatDate(nextShow.fechaPresentar)}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        <AccessTime sx={{ mr: 1, verticalAlign: 'middle', color: 'primary.main' }} />
                        {nextShow.horaInicio}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        <LocationOn sx={{ mr: 1, verticalAlign: 'middle', color: 'primary.main' }} />
                        {nextShow.sala ? nextShow.sala.data.direccion : 'Bogotá D.C'}
                      </Typography>
                      <Button
                        variant="contained"
                        size="large"
                        className="botnWelcome"
                        onClick={() => {
                          window.location.href = 'https://tuboleta.com/'
                        }}
                      >
                        Asegura Tu Entrada
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        height: 250,
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Box sx={{ width: "100%", height: "100%", obejectFit: "cover" }}>
                        <Map address={nextShow?.sala.data.direccion || nextShow?.sala.data.nombre} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            )}
          </Container>
        </Box>
        <FooterPublic />
      </ThemeProvider>
    </Box>
  )
}