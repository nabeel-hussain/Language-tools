import axios from "axios";
import config from "../Shared/config";
import { getToken } from "./authentication";
var backend = axios.create({
  baseURL: config.backend,
  withCredentials: true,
});
backend.interceptors.response.use((res) => res,(error)=>{
  throw error;
});
backend.interceptors.response.use( (response)=> {
  return response;
},  (error)=> {
  debugger;
  if(error.request.status===401 || error.request.status===422){
    getToken({
      username: "lang_tools",
      password: "VeDJvcvB0uiQ1Hd",
    });
  }
});
export default backend;
