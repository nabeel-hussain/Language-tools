import backend from "./backend";

export const getToken = async (user: User) => {
  let res = await backend.post("/token", user);
  backend.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
  sessionStorage.setItem("jwtToken", res.data.token);

};
