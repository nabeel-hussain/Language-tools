import backend from "./backend";
import config from "../Shared/config";
//THis function will get the history of translation from flask-server if running on localhost or from localstorage if running on live
export const getHistory = async () => {
  let result: Array<TranslationHistory> = [];
  if (config.backend !== "") {
    result = JSON.parse(localStorage.getItem("history") || "[]");
    return result;
  }
  let res = await backend.get("/history");
  result = res.data.history as Array<TranslationHistory>;
  return result;
};
//This function will clear the history of translation
export const clearHistory = async () => {
  if (config.backend !== "") {
    localStorage.removeItem("history");
    return true;
  }
  let res = await backend.delete("/history");
  let result = res.data.result as boolean;
  return result;
};
