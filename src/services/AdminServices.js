import axios from "axios";
//produccion
/* const baseUrl = "https://backlpc-production.up.railway.app/api/admin"; */

//local
const baseUrl = "http://localhost:3001/api/admin";


export const updateUser = (id, formData) => {
  return axios.put(`${baseUrl}/user/${id}`, formData,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      }
    }
  );
}




export const crearSala = (formData) => {
 return axios.post(`${baseUrl}/sala`, formData,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type":"multipart/form-data",
      }
    }
 );
}
export const getSalas = () => {
  return axios.get(`${baseUrl}/dashboard/`,
  {
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
 }

 export const eliminarSala = (id) => {
  return axios.delete(`${baseUrl}/sala/${id}`,
  {
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
 }
 export const updateSala = (id, formData) => {
  return axios.put(`${baseUrl}/sala/${id}`, formData,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type":"multipart/form-data",
      }
    }
  );
 }



/*api de los sshows para el admin*/
export const crearShow = (formData) => {
  return axios.post(`${baseUrl}/show`, formData,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type":"multipart/form-data",
      }
    }
 );
}

export const eliminarShow = (id) => {
  return axios.delete(`${baseUrl}/show/${id}`,
  {
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
 }

 export const activarShow = (id) => {
  return axios.put(`${baseUrl}/showAct/${id}`,{},
  {
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
 }

 export const inactivarShow = (id) => {
  return axios.put(`${baseUrl}/showIna/${id}`,{},
  {
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
 }


 /**
  * 
  * 
  */




 export const eliminarJefe = (id) => {
  return axios.delete(`${baseUrl}/jefe/${id}`,
  {
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
 }

 export const getJefe = () => {
  return axios.get(`${baseUrl}/jefe/`,
  {
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
 }

export const getSalasSin = () => {
  return axios.get(`${baseUrl}/salaSin/`,
  {
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
}


export const getSalasCon = () => {
  return axios.get(`${baseUrl}/salaCon/`,
  {
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
}



 export const eliminarAdmin = (id) => {
  return axios.delete(`${baseUrl}/admins/${id}`,
  {
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
 }






 export const getCliente = () => {
  return axios.get(`${baseUrl}/dashboard/`,
  {
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
 }

 export const eliminarCliente = (id) => {
  return axios.delete(`${baseUrl}/clientes/${id}`,
  {
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
 }


 export const eliminarEmpleado = (id) => {
  return axios.delete(`${baseUrl}/empleados/${id}`,
  {
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
}

 