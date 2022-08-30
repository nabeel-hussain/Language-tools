import backend from "./backend";
//This function will get the token from flask-server and that token will be used in all api calls for authentication.
export const getToken = async (user: User) => {
  let res = await backend.post("/token", user);
  backend.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
  sessionStorage.setItem("jwtToken", res.data.token);
};
