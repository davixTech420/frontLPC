import React from 'react';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle 
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDialog = motion(Dialog);

const ConfirmationDialog = ({ open, onClose, onConfirm, itemName }) => {
  return (
    <AnimatePresence>
      {open && (
        <MotionDialog
          open={open}
          onClose={onClose}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          transition={{ duration: 0.2 }}
        >
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de que deseas eliminar {itemName}? Esta acción no se puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancelar
            </Button>
            <Button 
              onClick={onConfirm} 
              color="error" 
              variant="contained"
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Eliminar
            </Button>
          </DialogActions>
        </MotionDialog>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationDialog;