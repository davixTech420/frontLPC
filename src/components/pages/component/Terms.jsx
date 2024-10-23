import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { styled } from '@mui/system';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
  },
}));

const AnimatedButton = motion(Button);

const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
};

const TermsAndConditions = () => {
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const acceptedTerms = getCookie('acceptedTerms');
    if (!acceptedTerms) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie('acceptedTerms', 'true', 365);
    setOpen(false);
  };

  const handleClose = () => {
    if (accepted) {
      handleAccept();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <StyledDialog
          open={open}
          onClose={handleClose}
          aria-labelledby="terms-dialog-title"
          aria-describedby="terms-dialog-description"
        >
          <DialogTitle id="terms-dialog-title">
            <Typography variant="h5" component="div" gutterBottom>
              Términos y Condiciones
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="terms-dialog-description">
              Por favor, acepta nuestros términos y condiciones para continuar usando el sitio.
            </DialogContentText>
            <Box mt={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    color="primary"
                  />
                }
                label="He leído y acepto los términos y condiciones"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <AnimatedButton
              onClick={handleAccept}
              color="primary"
              disabled={!accepted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Aceptar
            </AnimatedButton>
          </DialogActions>
        </StyledDialog>
      )}
    </AnimatePresence>
  );
};

export default TermsAndConditions;