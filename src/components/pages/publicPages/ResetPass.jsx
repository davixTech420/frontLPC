import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams(); // Capturamos el token desde la URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

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
          navigate('/login'); // Redirige a la página de inicio de sesión después de un tiempo
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error al restablecer la contraseña');
    }
  };

  return (
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
  );
};

export default ResetPassword;
