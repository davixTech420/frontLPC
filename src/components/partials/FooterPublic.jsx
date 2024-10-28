import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  Box,
} from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FooterPublic = (props) => {

const navegar = useNavigate();

function nav(path){
  navegar(path);
}

  return (
    <Box sx={[props.style ,{ color:'white', backgroundColor: '#07575B', padding: '20px' , position: 'flex' , left:0,right:0, bottom: 0, marginTop: 15,borderTopLeftRadius: 50,borderTopRightRadius: 50 ,boxShadow: "10px 10px 10px 10px rgba(0, 0, 0, 0.5)" }]}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="white">
              LPC
            </Typography>
            <Typography variant="body2">
            Los mejores en logística buscas teatros disponibles para tu show y gente técnica y capacitada 
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton aria-label="Facebook" sx={{ color: 'white' }}>
                <Facebook />
              </IconButton>
              <IconButton aria-label="Instagram" sx={{ color: 'white' }}>
                <Instagram />
              </IconButton>
              <IconButton aria-label="Twitter" sx={{ color: 'white' }}>
                <Twitter />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="white">
            Contáctenos
            </Typography>
            <Typography variant="body2">
              Email: datech@datech
              <br />
              Telefono: +57 324-285-5700
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button onClick={() => nav("/condiciones")} variant="outlined"  sx={{
        color: 'white',
        borderColor: 'white',
        '&:hover': {
          backgroundColor: 'white',
          color: 'black',
        },
        textTransform:"none",
      }}>
                Terminos y condiciones
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2 }} />
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="body2" color="white">
          Copyright Datech todos los derechos reservados al desarrollador
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
export default FooterPublic;



