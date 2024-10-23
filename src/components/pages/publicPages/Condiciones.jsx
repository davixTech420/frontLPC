import React from "react";
import HeaderPublic from "../../partials/HeaderPublic";
import FooterPublic from "../../partials/FooterPublic";
import { Box ,Grid } from "@mui/material";
import Logo from "../../../images/lpc.webp";

export default function Condiciones() {
  return (
    <>
      <HeaderPublic />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: { xs: "50vh", md: "100vh" },
              order: { xs: 1, md: 2 },
            }}
          >
            <img
              src={Logo}
              alt="Imagen"
              style={{
                maxWidth: "110%",
                maxHeight: "110%",
                transform: "rotate(-15deg)",
                marginTop: "50px",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection:"column",
              justifyContent: "center",
              alignItems: "center",
              height: { xs: "50vh", md: "100vh" },
              order: { xs: 2, md: 1 }, 
            }}
          >
           <br />
           <br />
            <center>  <h1>Condiciones De Uso</h1> </center>
            <br />
            <Box sx={{ marginInline: 4 }}>El acceso y uso de este sitio web están sujetos a las siguientes condiciones. Al acceder a este sitio, usted acepta cumplir con estas condiciones 
              y cualquier otra ley o regulación aplicable. El contenido de las páginas de este sitio web es solo para su información general y está sujeto a cambios sin previo aviso. Ni nosotros
               ni terceros ofrecemos garantía alguna en cuanto a la precisión, puntualidad, rendimiento, integridad o adecuación de la información y los materiales 
              encontrados u ofrecidos en este sitio para cualquier propósito específico.</Box>
          </Grid>
        </Grid>
      </Box>
      <FooterPublic />
    </>
  );
}
