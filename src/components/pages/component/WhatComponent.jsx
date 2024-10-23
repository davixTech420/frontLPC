import React from 'react';
import { Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatComponent = () => {
  const handleClick = () => {
    // Define el número de teléfono y el mensaje
    const phoneNumber = '+573242855700'; // Cambia esto por el número de teléfono deseado
    const message = 'Hola, En Que Teatro Estas Interesado'; // Mensaje que deseas enviar

    // Codifica el mensaje para que sea seguro para la URL
    const encodedMessage = encodeURIComponent(message);

    // Construye la URL de WhatsApp
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    // Abre la URL en una nueva pestaña
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Fab
      color="success"
      aria-label="WhatsApp"
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000,
      }}
      onClick={handleClick} // Agrega el manejador de clics
    >
      <WhatsAppIcon />
    </Fab>
  );
};

export default WhatComponent;