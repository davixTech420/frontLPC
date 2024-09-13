import { useState, useEffect } from "react";
import HeaderPublic from "../../partials/HeaderPublic";
import FooterPublic from "../../partials/FooterPublic";
import {
  Box,
  Grid,
  Button,
  Card,
  CardMedia,
} from "@mui/material";
import { motion } from "framer-motion";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Carousel from "react-material-ui-carousel";
import Map from "../component/Map";
import { getShows, getSalasId,SrcImagen } from "../../../services/publicServices";


const AnimatedTypography = motion(Typography);

/* esta es la vista de inicio */

export default function Welcome() {
  const [shows, setShows] = useState([]);
  const [nextShow, setNextShow] = useState(null);

  useEffect(() => {
    const show = async () => {
      try {
        const response = await getShows();
        setShows(response.data);
        console.log(response.data);

        // Encontrar el show más próximo
        const closestShow = response.data.reduce((closest, currentShow) => {
          const currentDate = new Date(); // Fecha actual
          const showDate = new Date(currentShow.fechaPresentar); // Fecha del show actual

          // Ignorar shows que son anteriores a la fecha actual
          if (showDate <= currentDate) {
            return closest;
          }

          if (!closest) {
            return currentShow; // Si no hay un show más cercano aún, este es el primero
          }

          const closestDate = new Date(closest.fechaPresentar); // Fecha del show más cercano

          // Verificar si la fecha del show actual es más cercana que la del show más cercano guardado
          return showDate < closestDate ? currentShow : closest;
        }, null);

        if (closestShow) {
          // Obtener la información de la sala correspondiente al nextShow
          const salaInfo = await getSalasId(closestShow.salaId);

          // Combinar la información del show con la información de la sala
          const showWithSalaInfo = {
            ...closestShow,
            sala: salaInfo,
          };

          setNextShow(showWithSalaInfo); // Guardar el show más próximo con la sala
        }
      } catch (error) {
        console.log(error);
      }
    };

    show();
  }, []);

/**
 * 
 * eviar a google maps
 *
 * 
 */
const goGoogleMaps = () => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nextShow?.sala.data.direccion)}`;
  window.open(googleMapsUrl, '_blank');
};


  return (
    <>
      <HeaderPublic />

      <Box sx={{ flexGrow: 1, marginTop: 9}}>
        <Grid container spacing={2}>
          <br />
          {/*
        ----------
        --------
        --------
        -- este es el contendor del carrusel */}
          <Grid item xs={12} md={15} lg={15}>


          <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >

























      
      <Carousel
        animation="slide"
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        interval={4000}
        duration={500}
        navButtonsProps={{
          style: {
            backgroundColor: "#003B46", // Color de fondo de los botones
            color: "white", // Color del icono de las flechas
            borderRadius: 100, // Ajusta el borde redondeado
            margin: "0 10px", // Ajusta el margen
          },
        }}
        sx={{
          marginInline: 2,
          marginTop: 2,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          flexWrap: "nowrap",
          height: "80%",
          width: "auto",
          backgroundColor: "white",
        }}
      >
        {shows.map((item, index) => (
                <Box
                  key={index}
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Box
                    component="img"
                    src={SrcImagen(item.imagen)}
                    alt={`carousel-item-${index}`}
                    sx={{
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
                      height: "300px",
                      maxHeight: "300px",
                      maxWidth: "100%",
                      margin: "auto",
                      borderRadius: 2,
                    }}
                  />
                </Box>
              ))}
        {/* Aquí van tus elementos dentro del carrusel */}
      </Carousel>
    </motion.div>


          </Grid>

          {/**----
           * ---
           * --------
           * --
           * ------------- */}

          <Grid item sx={{ backgroundColor: "#003B46",marginInline: 1,marginLeft: 3,borderTopLeftRadius: 50,borderTopRightRadius: 50 }} xs={12} md={15} lg={15}>
            <center>
            <motion.div
      initial={{ scale: 0.8, rotateX: 45, rotateY: 45, opacity: 0 }}
      animate={{ scale: 1, rotateX: 0, rotateY: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      whileHover={{
        scale: 1.05,
        rotateX: -10,
        rotateY: -10,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      style={{
        perspective: "1000px", // Añade profundidad
        display: "inline-block",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "white", // Color del texto principal
          fontWeight: "bold",
          textShadow: `
            2px 2px 0px  #66A5AD, 
            4px 4px 0px  #66A5AD, 
            6px 6px 0px  #66A5AD, 
            8px 8px 0px  #C4DFE6, 
            10px 10px 20px #C4DFE6`,
          transformStyle: "preserve-3d",
          userSelect: "none", // Evita que el texto se seleccione
        }}
      >
        Proximo Show
      </Typography>
    </motion.div>
            </center>
          </Grid>
          {/* contenedor de las tarjetas del show con su recpectivo teatro
           *
           *
           * *
           * **
           * *
           * */}
            
          <Grid
            item
            xs={12}
            md={15}
            lg={15}
            sx={{
              background: "linear-gradient(900deg, #003B46,#07575B ,#66A5AD,#C4dfe6)",
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              flexDirection: { xs: "column", md: "row" },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginInline: 1,
              marginLeft: 3,
            }}
          >

            


            <Card
              sx={{
                borderRadius: 8,
                width: "80%",
                height: "60%",
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
                marginBottom: 2,
                alignContent: "center",
              }}
            >
              <CardContent sx={{ textAlign: "center",p:20 }}>
                <Typography
                  sx={{ textAlign: "center" }}
                  variant="h5"
                  component="div"
                >
                  {nextShow?.sala.data.nombre}
                </Typography>
                <Typography sx={{ whiteSpace: "pre-line"}} variant="body2">
                  {"\n"} Aforo Maximo : {nextShow?.sala.data.capacidad} {"\n"}
                  Cupos Disponibles : {nextShow?.cuposDisponibles} {"\n"}
                  Direccion : {nextShow?.sala.data.direccion} {"\n"}
                  Fecha A Presentar : {nextShow?.fechaPresentar} {"\n"}
                  Hora Inicio: {nextShow?.horaInicio} {"\n"}
                  Hora Final : {nextShow?.horaFin} {"\n"}
                </Typography>
                <br />
                
              </CardContent>


              
            </Card>

            <Card
              sx={{
                marginInline: 2,
                borderRadius: 8,
                width: "80%",
                height: "60%",
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
                marginBottom: 2,
              }}
            >
              <CardMedia
                component="img"
                image={SrcImagen(nextShow?.imagen)}
                alt="Imagen de la tarjeta"
                sx={{
                  height: "90%",
                  width: "100%",
                  objectFit: "",
                }}
              />
              <CardContent
                sx={{
                  height: "10%", // 10% de la altura de la tarjeta para el texto
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 1,
                }}
              >
                <Typography variant="h6" component="div" align="center">
                  {nextShow?.nombre}
                </Typography>
              </CardContent>
            </Card>
           
          </Grid>
    
          {/* 
**
***
*
**
*

aca terminar el contenedor principal de las tarjetas debajo del carrusel */}

          <Grid item xs={12} md={12} lg={12}>
            <center>
              <Button onClick={goGoogleMaps} variant="contained" sx={{color:"black",   background:"#66A5AD", width: "30%",marginInline: 2,borderRadius: 10,boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)",
            "&:hover":{
              background:"#07575B",
              boxShadow: "0px 15px 22px rgba(0, 0, 0, 0.4)",
              color:"white"
            }
            }} >
              <LocationOnIcon/><Typography>Dirigir</Typography>
              </Button>
              </center>
            
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: { xs: "50vh", md: "80vh" },
              order: { xs: 1, md: 2 },
            }}
          >
            
            {/* este es el componente que hace conexion con la api del mapa */}
            <Map address={ nextShow?.sala.data.direccion || nextShow?.sala.data.nombre} />
            {/*
             *
             *
             * * * */}
          </Grid>
        </Grid>
      </Box>
      <FooterPublic />
    </>
  );
}
