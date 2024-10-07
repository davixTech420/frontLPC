import { useState } from "react"
import { TextField,InputAdornment,IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
 const InputValidate = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    switch (props.nombre) {
        case "telefono":
            return(
                <TextField
                 onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                inputProps={{
                  maxLength: 10,
                }}
                value={props.value}
                onChange={props.onChange}
                  required
                  fullWidth
                  id="Telefono"
                  label="Telefono"
                  name="Telefono"
                  autoComplete="family-name"
                  variant="standard"
                  focused
                />  
            );
            break;
            case "nombre":
            return(
                <TextField
                 onKeyPress={(e) => {
                  if (!/['a-z']/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                  autoComplete="given-name"
                  name="nombre"
                  value={props.value}
                  onChange={props.onChange}
                  required
                  fullWidth
                  id="Nombre"
                  label="Nombre"
                  autoFocus
                  variant="standard"
                  focused
                /> 
            );
            break;
            case "apellido":
            return(
                <TextField
                 onKeyPress={(e) => {
                  if (!/['a-z']/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                  autoComplete="given-name"
                  name="Apellido"
                  value={props.value}
                  onChange={props.onChange}
                  required
                  fullWidth
                  id="Apellido"
                  label="Apellido"
                  autoFocus
                  variant="standard"
                  focused
                /> 
            );
            break;
            case "identificacion":
            return(
                <TextField
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  inputProps={{
                    maxLength: 10,
                  }}
                  required
                  fullWidth
                  value={props.value}
                  onChange={props.onChange}
                  id="identificacion"
                  label="Identificacion"
                  name="identificacion"
                  autoComplete="family-name"
                  variant="standard"
                  focused
                />
            );
            break;
            case "email":
            return(
                <TextField
                  required
                  type="email"
                  fullWidth
                  value={props.value}
                  onChange={props.onChange}
                  id="email"
                  variant="standard"
                  focused
                  label="Email"
                  name="email"
                  autoComplete="email"

                />
            );
            break;
            case "pass":
            return(
                <TextField
                  variant="standard"
                  focused
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  value={props.password}
                  onChange={props.onChange}
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
            break;

    
        default:
            console.log("default");
            break;
    }


}
export default  InputValidate;
