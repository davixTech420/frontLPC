import { useState,useEffect } from "react";
import { Avatar,Slide,useScrollTrigger,Drawer ,Divider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../images/lpc.webp";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { motion } from "framer-motion";

const settings = ["Logout"];

function HeaderPublic() {
  const [rol,setRol] = useState(null);
  const trigger = useScrollTrigger();
 /**
  * *
  * *
  *  * este codigo es para verificar el rol de la persona que esta logeada segun el rol renderiza un header distinto *
  * *
  * *
  * *
  * */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setRol(decoded.role);
    }
  }, []);
  /**
   * 
   * aca termina la verificacion del rol
   * 
   */

//esta cosdigo es para el boton de login cambie su texto y ruta dependiendo la rurta donde se encuentra
const location = useLocation();
  
  // Estado para saber si el usuario ha iniciado sesión o no
/*   const [isLoggedIn, setIsLoggedIn] = useState(false);
 */
  // Determinar el texto y la ruta del botón basado en la ruta actual y el estado de sesión
  const buttonText = location.pathname === '/loginPublic' ? 'Registrar' : 'Login';
  const buttonRoute = location.pathname === '/loginPublic' ? '/registrar' : '/loginPublic';



  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navegar = useNavigate();
  function nav(path) {
    navegar(path);
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  /*   const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  }; */

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
/* esto es solo para el rol del cliente */
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  return (

<>
{ rol === 'cliente' || rol === 'jefesala' || rol === 'empleado' ? ( 

<>


<div>
<motion.div
  initial={{ y: -50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, delay: 0.5 }}
>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
           bgcolor: 'transparent', 
          backgroundImage: 'none',
          mt: 2,
          
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:"#003B46",
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)"
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <img
                src={logo}
                width={40}
                height={20}
                style={{ filter:"invert(1) brightness(100)" }}
                onClick={() => nav("/welcome")}
                alt="logo of sitemark"
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
               
                <MenuItem
                 onClick={() => {   rol === 'jefesala' ?  nav("/jefe/dashboard") : rol === 'empleado' ? nav("/empleado/dashboard")  : nav("/cliente/dashboard") }}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="white">
                    Dashboard
                  </Typography>
                </MenuItem>
                <MenuItem
                 onClick={() => nav("/calendario") }
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="white">
                    Calendario
                  </Typography>
                </MenuItem>
                <MenuItem
                onClick={() => nav("/teatros") }
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="white">
                    Teatros
                  </Typography>
                </MenuItem>
                <MenuItem
onClick={() => nav("/contacto") }
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="white">
                    Contactanos
                  </Typography>
                </MenuItem>


                <MenuItem
               onClick={() => {    rol === 'jefesala' ?  nav("/jefe/mensajes"): nav("/cliente/mensajes") }}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="white">
                    Mensajes
                  </Typography>
                </MenuItem>


                
                <MenuItem
               onClick={() => {    rol === 'jefesala' ?  nav("/jefe/miSala"): nav("/cliente/misShows") }}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="white">
                  {rol == "jefesala" ? "Mi Sala"  : "Mis Shows" }
                  </Typography>
                </MenuItem>

              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
             
             
              <Button
                color="error"
                variant="contained"
                size="small"
                component="a" 
                target="_blank"
                onClick={() =>{ localStorage.removeItem('token','role'); window.location.reload(); }}
              >
                <LogoutIcon/>
              </Button>
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px',color:"white" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    
                  </Box>
                  <MenuItem  onClick={() => nav("/welcome") } sx={{ ":hover": { color: "white" ,backgroundColor:'#07575B' } }}  >
                    Home
                  </MenuItem>
                  <MenuItem   onClick={() => {   rol === 'jefesala' ?  nav("/jefe/dashboard"): nav("/cliente/dashboard") }}  sx={{ ":hover": { color: "white" ,backgroundColor:'#07575B' } }}>
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={() => nav("/calendario")}  sx={{ ":hover": { color: "white" ,backgroundColor:'#07575B' } }}>
                   Calendario
                  </MenuItem>
                  <MenuItem onClick={() => nav("/teatros")}  sx={{ ":hover": { color: "white" ,backgroundColor:'#07575B' } }}>
                   Teatros
                  </MenuItem>
                  <MenuItem  onClick={() => {    rol === 'jefesala' ?  nav("/jefe/mensajes"): nav("/cliente/mensajes") }}  sx={{ ":hover": { color: "white" ,backgroundColor:'#07575B' } }} >
                    Mensajes
                  </MenuItem>
                  <MenuItem   onClick={() => {    rol === 'jefesala' ?  nav("/jefe/miSala"): nav("/cliente/misShows") }}  sx={{ ":hover": { color: "white" ,backgroundColor:'#07575B' } }}>
                 
                  {rol === "jefesala" ? "Mi Sala"  : "Mis Shows" }
         
                  </MenuItem>
                  <Divider />
                  <MenuItem sx={{ alineItems: 'center', justifyContent: 'center'}}>
                  <center><Button
                color="error"
                variant="contained"
                size="small"
                component="a" 
                target="_blank"
                onClick={() =>{ localStorage.removeItem('token','role'); window.location.reload(); }}
              > Cerrar Secion {"  "}
                <LogoutIcon/>
              </Button></center>
                  </MenuItem>
                 
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      </motion.div>
    </div>
</>

) : (
  <motion.div
  initial={{ y: -50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, delay: 0.5 }}
>

  <AppBar position="static" sx={{ background: "#003B46",borderBottomLeftRadius: 50, borderBottomRightRadius: 50, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)", }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
          onClick={() => nav("/welcome")}
            src={logo}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "white",filter:"invert(1) brightness(100)" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={() => nav("/loginPublic")}>
                <Typography textAlign="center" var>Login</Typography>
              </MenuItem>
              <MenuItem onClick={() => nav("/registrar")}>
                <Typography textAlign="center">Register</Typography>
              </MenuItem>
              <MenuItem onClick={() => nav("/contacto")}>
                <Typography textAlign="center">Contactanos</Typography>
              </MenuItem>
              <MenuItem onClick={() => nav("/teatros")}>
                <Typography textAlign="center">Teatros</Typography>
              </MenuItem>
              <MenuItem onClick={() => nav("/calendario")}>
                <Typography textAlign="center">Calendario</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Avatar
            onClick={() => nav("/welcome")}
            src={logo}
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 ,filter:"invert(1) brightness(100)" }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
              <Button
            onClick={() => nav("/calendario")}
             sx={{ my: 2, color: "white", display: "block" }}>
              Calendario
            </Button>
              <Button
            onClick={() => nav("/teatros")}
             sx={{ my: 2, color: "white", display: "block" }}>
              Teatros
            </Button>
            <Button
              onClick={() => nav("/contacto")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Contactanos
            </Button>
          
            <Button
              onClick={() => nav(buttonRoute)}
              sx={{
              borderRadius: 50,
                my: 2,
                color: "black",
                display: "block",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "#C4DFE6", 
                  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                },
              }}
            >
              {buttonText}
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings"></Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </motion.div>

)}



</>
  );
}
export default HeaderPublic;
