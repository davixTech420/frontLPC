import axios from "axios";


const baseUrl = "http://localhost:3001/api/jefe";


export const activarPedido = (id) => {
  return axios.put(`${baseUrl}/pedido/${id}`,{},{
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
}
export const inactivarPedido = (id) => {
  return axios.put(`${baseUrl}/inacPedido/${id}`,{},{
    headers: {
      Authorization: localStorage.getItem("token"),
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

export const getPedidoForm = (id) => {
  return axios.get(`${baseUrl}/pedido/${id}`,{
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
}


export const getJefeIJe = (id) => {
    return axios.get(`${baseUrl}/jefe/${id}`,{
      headers: {
        Authorization: localStorage.getItem("token"),
      }
    }
  );
}

export const getSalaJefe = (id) => {
  return axios.get(`${baseUrl}/jefeShowId/${id}`,{
    headers: {
      Authorization: localStorage.getItem("token"),
    }
  }
);
}


export const getShowsSala = (id)  => {
  return axios.get(`${baseUrl}/showsMiSala/${id}`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      }
    }
  );
}

export const getChatsJe = (id) => {
  return axios.get(`${baseUrl}/mensaje/${id}`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      }
    }
  );
}


export const getConversacionJe = (emisorId, receptorId) => {
  return axios.get(`${baseUrl}/mensaje/${emisorId}/${receptorId}`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      }
    }
  );
}


  export const enviarMensajeJe = (formData) => {
    return axios.post(`${baseUrl}/mensaje`, formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      }
    );
  }
    