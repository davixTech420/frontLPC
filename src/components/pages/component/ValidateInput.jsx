import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, IconButton ,FormControl,MenuItem,InputLabel,Select} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const InputValidate = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    validateInput(props.value);
  }, [props.value]);

  const validateInput = (value) => {
    switch (props.nombre) {
      case "empleado":
        setError(value.length == 0  ? "Debes Poner UN NUmero Si No Necesitas empleados 0" : "");
        break;
      case "salas":
        setError(value.length == 0  ? "Debes Escoger Una Sala" : "");
        break;
      case "horaFin":
      case "horaInicio":
        setError(value.length == 0  ? "Debes Poner Una Hora" : "");
        break;
      case "telefono":
        setError(value.length !== 10 ? "El teléfono debe tener 10 dígitos" : "");
        break;
      case "nombre":
      case "apellido":
        setError(value.length < 2 ? "Debe tener al menos 2 caracteres" : "");
        break;
      case "identificacion":
        setError(value.length !== 10 ? "La identificación debe tener 10 dígitos" : "");
        break;
        case "Tpidentificacion":
        setError(value.length < 1 ? "Debe tener un tipo de identificacion" : "");
        break;
      case "email":
        setError(!/\S+@\S+\.\S+/.test(value) ? "Email inválido" : "");
        break;
      case "pass":
        setError(value.length < 8 ? "La contraseña debe tener al menos 8 caracteres" : "");
        break;
        case "cupos":
          setError(value.length < 0 ? "Debes Ingesar Un Cupo" : "");
          break;
          case "fechaPresentar":
          setError(value.length < 0 ? "Debes Oprimir La casilla" : "");
          break;
      default:
        setError("");
    }
  };

  const commonProps = {
    value: props.value,
    onClick: props.onClick,
    onChange: (e) => {
      props.onChange(e);
      validateInput(e.target.value);
    },
    InputProps:{
      readOnly:props.readOnly,
    },
    required: true,
    fullWidth: true,
    variant: "standard",
    focused: true,
    error: !!error,
    helperText: error,
  };

  switch (props.nombre) {
    case "salas":
      return (
        <FormControl {...commonProps} fullWidth>
                      <InputLabel id="sala-label">Sala</InputLabel>
                      <Select
                        labelId="sala-label"
                        id="salaId"
                        {...commonProps}
                        label="Sala"
                      >
                        <MenuItem value="">
                          <em>Ninguna</em>
                        </MenuItem>
                        {props.salasCon.map((sala) => (
                          <MenuItem key={sala.id} value={sala.id}>{sala.nombre}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
      );
    
      case "empleado":
        return (
          <TextField
          {...commonProps}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          inputProps={{
            maxLength: 2,
          }}
          id="empleados"
          label="empleados"
          name="empleados"
          autoComplete="tel"
        />
        );
    case "horaInicio":
      return (
        <TextField
          {...commonProps}
          type="time"
          id="horaInicio"
          label="horaInicio"
          name="horaInicio"
          InputLabelProps={{
            shrink: true,
          }}
        />
      );
      case "horaFin":
      return (
        <TextField
          {...commonProps}
          type="time"
          id="horaFin"
          label="horaFin"
          name="horaFin"
          InputLabelProps={{
            shrink: true,
          }}
        />
      );
    case "fechaPresentar":
      return (
        <TextField
          {...commonProps}
          type="date"
          id="fechaPresentar"
          label="fechaPresentar"
          name="fechaPresentar"
        />
      );
    case "cupos":
      return (
        <TextField
          {...commonProps}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          inputProps={{
            maxLength: 4,
          }}
          id="cuposDisponibles"
          label="cuposDisponibles"
          name="cuposDisponibles"
        />
      );
    case "telefono":
      return (
        <TextField
          {...commonProps}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          inputProps={{
            maxLength: 10,
          }}
          id="Telefono"
          label="Teléfono"
          name="Telefono"
          autoComplete="tel"
        />
      );
    case "nombre":
      return (
        <TextField
          {...commonProps}
          onKeyPress={(e) => {
            if (!/[a-zA-Z\s]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          id="Nombre"
          label="Nombre"
          name="nombre"
          autoComplete="given-name"
          autoFocus
        />
      );
    case "apellido":
      return (
        <TextField
          {...commonProps}
          onKeyPress={(e) => {
            if (!/[a-zA-Z\s]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          id="Apellido"
          label="Apellido"
          name="Apellido"
          autoComplete="family-name"
        />
      );
      case "Tpidentificacion":
        return (
          <FormControl
          variant="standard"
          {...commonProps}
          focused
          sx={{ width: "100%", }}>
          <InputLabel id="demo-simple-select-filled-label">
            Tipo De Identificacion
          </InputLabel>
          <Select
            {...commonProps}
            id="demo-simple-select-filled"
            sx={{ width: "100%" }}

          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"C.C"}>Cedula Ciudadania</MenuItem>
            <MenuItem value={"T.I"}>Tarjeta De Identidad</MenuItem>
            <MenuItem value={"Pasaporte"}>Pasaporte</MenuItem>
          </Select>
        </FormControl>
        )
    case "identificacion":
      return (
        <TextField
          {...commonProps}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          inputProps={{
            maxLength: 10,
          }}
          id="identificacion"
          label="Identificación"
          name="identificacion"
        />
      );
    case "email":
      return (
        <TextField
          {...commonProps}
          type="email"
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
        />
      );
    case "pass":
      return (
        <TextField
          {...commonProps}
          name="password"
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      );
    default:
      console.log("default");
      return null;
  }
};

export default InputValidate;