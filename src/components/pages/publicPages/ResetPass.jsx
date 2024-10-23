import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import HeaderPublic from '../../partials/HeaderPublic';
import FooterPublic from '../../partials/FooterPublic';
import { motion } from "framer-motion";
const ResetPassword = () => {
  const { token } = useParams(); // Capturamos el token desde la URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const LavaBackground = React.memo(() => (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        background: `
        radial-gradient(
          farthest-corner at 50% 50%,
          rgba(255, 255, 255, 0.1),
          rgba(255, 255, 255, 0.3) 30%,
          rgba(255, 255, 255, 0.5) 60%,
          rgba(255, 255, 255, 0.7)
        ),
        linear-gradient(
          45deg,
          #003B46,
          #07575B,
          #66A5AD,
          #C4DFE6
        )`,
        backgroundSize: "300% 300%",  // Reduced size for performance
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        type: "tween",
        duration: 20, // Reduced animation frequency
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      }}
    />
  ));


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/resetPass', { password, token });

      if (response.data.success) {
        setSuccess('Contraseña restablecida correctamente');
        setTimeout(() => {
          navigate('/loginPublic'); // Redirige a la página de inicio de sesión después de un tiempo
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error al restablecer la contraseña');
    }
  };

  return (
  <>

  <HeaderPublic />
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit}>
        <h2>Restablecer Contraseña</h2>
        <TextField
          label="Nueva Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirmar Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Restablecer
        </Button>

        {/* Muestra mensaje de éxito o error */}
        {error && (
          <Snackbar open autoHideDuration={6000} onClose={() => setError('')}>
            <Alert onClose={() => setError('')} severity="error">
              {error}
            </Alert>
          </Snackbar>
        )}
        {success && (
          <Snackbar open autoHideDuration={6000} onClose={() => setSuccess('')}>
            <Alert onClose={() => setSuccess('')} severity="success">
              {success}
            </Alert>
          </Snackbar>
        )}
      </form>
    </div>
    <FooterPublic/>
    </>
  );
};

export default ResetPassword;
