import * as React from "react";
import {
  styled,
  alpha,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import logo from "../../images/lpc.webp";
import { Avatar, Divider, List, ListItemText } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ChecklistIcon from '@mui/icons-material/Checklist';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import StadiumIcon from '@mui/icons-material/Stadium';
import AssignmentIcon from "@mui/icons-material/Assignment";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InputBase from "@mui/material/InputBase";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BadgeIcon from '@mui/icons-material/Badge';
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate, useLocation } from "react-router-dom";
import "../../assets/admin.css";






const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function HeaderRol() {
  /**constante para enrutar a diferentes direcciones */
  const navigate = useNavigate();
  /*
  *
  *
  * */

  /**estado de la anchuro del appbar menu */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  /*
  *
  *
  * */
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      style={{ background: "transparent", opacity: 1 }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      
        <MenuItem sx={{ backgroundColor: "transparent", borderRadius: "20px" }} onClick={() => { handleMenuClose(); localStorage.removeItem("token"); window.location.reload(); }}>Cerrar sesión</MenuItem>
      </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const location = useLocation();
  const mainListItems = (
    <React.Fragment>
      <ListItemButton
        sx={{
          ...(location.pathname === "/admin/dashboard")
            ? {
              background: "white",
              color: "black"
            } : {}
        }}


        className="btn-men-lateral" onClick={() => navigate("/admin/dashboard")}>
        <ListItemIcon>
          <DashboardIcon
            sx={{
              ...(location.pathname === "/admin/dashboard" ? { color: "#003b46" } : { color: "white" }) // Cambia el color por defecto
            }}
            className="icon-men-lateral-header"
          />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton

        sx={{
          ...(location.pathname === "/admin/tabla/admins")
            ? {
              background: "white",
              color: "black"
            } : {}
        }}
        className="btn-men-lateral" onClick={() => navigate("/admin/tabla/admins")}>
        <ListItemIcon>
          <AdminPanelSettingsIcon
            sx={{
              ...(location.pathname === "/admin/tabla/admins" ? { color: "#003b46" } : { color: "white" }) // Cambia el color por defecto
            }}
            className="icon-men-lateral-header" />

        </ListItemIcon>
        <ListItemText primary="Administradores" />
      </ListItemButton>
      <ListItemButton
        sx={{
          ...(location.pathname === "/admin/tabla/clientes")
            ? {
              background: "white",
              color: "black"
            } : {}
        }}
        className="btn-men-lateral" onClick={() => navigate("/admin/tabla/clientes")}>
        <ListItemIcon>
          <PeopleIcon
            sx={{
              ...(location.pathname === "/admin/tabla/clientes" ? { color: "#003b46" } : { color: "white" }) // Cambia el color por defecto
            }}
            className="icon-men-lateral-header" />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItemButton>
      <ListItemButton
        sx={{
          ...(location.pathname === "/admin/tabla/empleados")
            ? {
              background: "white",
              color: "black"
            } : {}
        }}
        className="btn-men-lateral" onClick={() => navigate("/admin/tabla/empleados")}>
        <ListItemIcon>
          <BadgeIcon
            sx={{
              ...(location.pathname === "/admin/tabla/empleados" ? { color: "#003b46" } : { color: "white" }) // Cambia el color por defecto
            }}
            className="icon-men-lateral-header" />
        </ListItemIcon>
        <ListItemText primary="Empleados" />
      </ListItemButton>
      <ListItemButton
        sx={{
          ...(location.pathname === "/admin/tabla/salas")
            ? {
              background: "white",
              color: "black"
            } : {}
        }}
        className="btn-men-lateral" onClick={() => navigate("/admin/tabla/salas")}>
        <ListItemIcon>
          <StadiumIcon
            sx={{
              ...(location.pathname === "/admin/tabla/salas" ? { color: "#003b46" } : { color: "white" }) // Cambia el color por defecto
            }}
            className="icon-men-lateral-header" />
        </ListItemIcon>
        <ListItemText primary="Salas" />
      </ListItemButton>
      <ListItemButton
        sx={{
          ...(location.pathname === "/admin/tabla/shows")
            ? {
              background: "white",
              color: "black"
            } : {}
        }}
        className="btn-men-lateral" onClick={() => navigate("/admin/tabla/shows")}>
        <ListItemIcon>
          <TheaterComedyIcon
            sx={{
              ...(location.pathname === "/admin/tabla/shows" ? { color: "#003b46" } : { color: "white" }) // Cambia el color por defecto
            }}
            className="icon-men-lateral-header" />
        </ListItemIcon>
        <ListItemText primary="Shows" />
      </ListItemButton>
      <ListItemButton
        sx={{
          ...(location.pathname === "/admin/tabla/jefesalas")
            ? {
              background: "white",
              color: "black"
            } : {}
        }}
        className="btn-men-lateral" onClick={() => navigate("/admin/tabla/jefesalas")}>
        <ListItemIcon>
          <SupervisedUserCircleIcon
            sx={{
              ...(location.pathname === "/admin/tabla/jefesalas" ? { color: "#003b46" } : { color: "white" }) // Cambia el color por defecto
            }}
            className="icon-men-lateral-header" />
        </ListItemIcon>
        <ListItemText primary="Jefes De Sala" />
      </ListItemButton>
      <ListItemButton
        sx={{
          ...(location.pathname === "/admin/tabla/pedidos")
            ? {
              background: "white",
              color: "black"
            } : {}
        }}
        className="btn-men-lateral" onClick={() => navigate("/admin/tabla/pedidos")}>
        <ListItemIcon>
          <ChecklistIcon
            sx={{
              ...(location.pathname === "/admin/tabla/pedidos" ? { color: "#003b46" } : { color: "white" }) // Cambia el color por defecto
            }}
            className="icon-men-lateral-header" />
        </ListItemIcon>
        <ListItemText primary="Pedidos" />
      </ListItemButton>
    </React.Fragment>
  );


  /* este menu se renderiza en el return */
  /**
   *
   *
   *
   */
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >


      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar
        position="absolute"
        open={open}
        sx={{ backgroundColor: "#07575B", color: "white" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Avatar
            src={logo}
            sx={{ display: { xs: "flex", md: "flex" }, mr: 1, filter: "invert(1) brightness(100)" }}
          />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
            background: "#003B46",
          }}
        >

          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon className="icon-men-lateral-header" />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav" sx={{ background: "#003B46", height: "100%", color: "white" }}>
          {mainListItems}
          <Divider sx={{ my: 1 }} />

        </List>
      </Drawer>
    </ThemeProvider>
  );
}
