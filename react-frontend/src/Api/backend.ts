import axios from "axios";
import config from "../Shared/config";
import { getToken } from "./authentication";
var backend = axios.create({
  baseURL: config.backend,
});
//Setting generic response.
//If any api return the unauthorized error then it will generate a new token so that next api calls gets authenticated.
backend.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.request.status === 401 || error.request.status === 422) {
      getToken({
        username: config.username,
        password: config.password,
      });
    }
  }
);
export default backend;
