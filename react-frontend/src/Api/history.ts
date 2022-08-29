import backend from "./backend";
import config from "../Shared/config";
export const getHistory = async () => {
  let result: Array<TranslationHistory> = [];
  if (config.backend!=="") {
    result = JSON.parse(localStorage.getItem("history") || "[]");
    return result;
  }
  let res = await backend.get("/history");
  result = res.data.history as Array<TranslationHistory>;
  return result;
};
export const clearHistory = async () => {
  if (config.backend!=="") {
    localStorage.removeItem("history");
    return true;
  }
  let res = await backend.delete("/history");
  let result = res.data.result as boolean;
  return result;
};
