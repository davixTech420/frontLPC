import axios from "axios";
//produccion
/* const baseUrl = "https://backlpc-production.up.railway.app/api/auth"; */
/* export const SrcImagen = (path)=>{
    return `https://backlpc-production.up.railway.app${path}`
} */

    
//local
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

export const forgetPass = (email) => {
    return axios.post(`${baseUrl}/forPass`,email);
}
export const resetPass = () => {

}