import axios from "axios";

const baseUrl = "http://localhost:3001/api/auth";

export const SrcImagen = (path)=>{
    return `http://localhost:3001${path}`
}
export const Login = (formData) => {
    return axios.post(`${baseUrl}/login`,formData);
    }
export const getShows = () => {
return axios.get(`${baseUrl}/shows`);
}

export const getSalas = () => {
    return axios.get(`${baseUrl}/teatros`);
}
    
export const getSalasId = (id) => {
    return axios.get(`${baseUrl}/salas/${id}`);
}
   


export const getJefeId = (id) => {
    return axios.get(`${baseUrl}/jefe/${id}`);
}
   