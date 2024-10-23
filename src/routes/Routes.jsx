import React from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "../components/pages/publicPages/Welcome";
import Condiciones from "../components/pages/publicPages/Condiciones";
import Teatros from "../components/pages/publicPages/Teatros";
import PublicLogin from "../components/pages/publicPages/PublicLogin";
import PublicRegis from "../components/pages/publicPages/PublicRegis";
import Dashboard from "../components/pages/adminPages/Dashboard";
import Prueba from "../components/pages/clientPages/ProtecCli";
import Contact from "../components/pages/publicPages/Contact";
import VistaTabla from "../components/pages/adminPages/Tables";
import Calendario from "../components/pages/publicPages/Calendario";
import DashboardJefe from "../components/pages/jefePages/DashboardJefe";
import Mensaje from "../components/pages/clientPages/Mensajes";
import MisShows from "../components/pages/clientPages/MisShows"
import MiSala from "../components/pages/jefePages/MiSala";
import EmployeeDashboard from "../components/pages/emplePages/DashboardEmple";
import ResetPassword from "../components/pages/publicPages/ResetPass";

//aca se manejan todas las rutas publica donde todo el mundo puede ver
export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/welcome" element={<Welcome />}></Route>
      <Route path="/condiciones" element={<Condiciones />}></Route>
      <Route path="/teatros" element={<Teatros />}></Route>
      <Route path='/contacto' element={<Contact />} ></Route>
      <Route path="/loginPublic" element={<PublicLogin />}></Route>
      <Route path="/registrar" element={<PublicRegis />}></Route>
      <Route path="/calendario" element={<Calendario />}></Route>
      <Route path="/resetPass/:token" element={<ResetPassword />} />

    </Routes>
  );
};


export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Prueba />}></Route>
      <Route path="mensajes" element={<Mensaje />}></Route>
      <Route path="misShows" element={<MisShows />}></Route>
    </Routes>
  );
};  




export const EmpleadoRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<EmployeeDashboard />}></Route>
      <Route path="mensajes" element={<Mensaje />}></Route>
      <Route path="misShows" element={<MisShows />}></Route>
    </Routes>
  );
};                                                                                                                                                                                    




export const JefeRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardJefe />}></Route>
      <Route path="mensajes" element={<Mensaje />} ></Route>
      <Route path="miSala" element={<MiSala />} ></Route>

    </Routes>
  );
};



export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />}></Route>
      <Route path="tabla/:tablaId" element={<VistaTabla />}></Route>
    </Routes>
  );
};
