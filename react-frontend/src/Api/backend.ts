import axios from "axios";
import config from "../Shared/config";
import { getToken } from "./authentication";
var backend = axios.create({
  baseURL: config.backend,
});
backend.interceptors.response.use( (response)=> {
  return response;
},  (error)=> {
  if(error.request.status===401 || error.request.status===422){
    getToken({
      username: config.username,
      password: config.password,
    });
  }
});
export default backend;
