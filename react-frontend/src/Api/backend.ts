import axios from "axios";
import config from "../Shared/config";
var backend = axios.create({
  baseURL: config.backend,
  withCredentials: true,
});
backend.interceptors.response.use((res) => res);
axios.interceptors.request.use((config) => {
  let token = sessionStorage.getItem("jwtToken");
  if (token) {
    if (config.headers) {
      config.headers.Authorization = token;
    }
  }
});
export default backend;
