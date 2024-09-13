import axios from "axios";


const baseUrl = "http://localhost:3001/api/cliente";

export const clienteLogeado = () => {
    return axios.get(`${baseUrl}/clienteLogeado`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      }
    )
  }



  export const getClienForm = (id) => {
    return axios.get(`${baseUrl}/clienForm/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      }
    );
  }
  



export const MiShows = (id) => {
  return axios.get(`${baseUrl}/misShows/${id}`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      }
    }
  );
}


  export const actualizarCliente = (id, formData) => {
    return axios.put(`${baseUrl}/cliente/${id}`, formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      }
    );
  }


  export const getJefeId = (id) => {
    return axios.get(`${baseUrl}/jefe/${id}`,{
      headers: {
        Authorization: localStorage.getItem("token"),
      }
    }
  );
}

/**
 * api para el pedido
 */
export const crearPedido = (formData) => {
  return axios.post(`${baseUrl}/pedido`, formData,{
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type":"multipart/form-data",
    }
  }
);
}
export const eliminarPedido = (id) => {
  return axios.delete(`${baseUrl}/pedido/${id}`,{
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
}
/** */

export const salasConJefe = () => {
  return axios.get(`${baseUrl}/salaCon`,{
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
}



export const getChats = (id) => {
  return axios.get(`${baseUrl}/mensaje/${id}`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      }
    }
  );
}


export const getConversacion = (emisorId, receptorId) => {
  return axios.get(`${baseUrl}/mensaje/${emisorId}/${receptorId}`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      }
    }
  );
}


  export const enviarMensaje = (formData) => {
    return axios.post(`${baseUrl}/mensaje`, formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      }
    );
  }
    

  



