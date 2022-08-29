import backend from "./backend";
import config from "../Shared/config";
export const translate = async (translateObj: Translate) => {
  let res = await backend.post("/translate", translateObj);
  let result = res.data.join("\r\n") as string;
  if (config.backend!=="") {
    let history: Array<TranslationHistory>  = JSON.parse(localStorage.getItem("history") || "[]");
    history.unshift({ ...translateObj,response:res.data})
    localStorage.setItem("history",JSON.stringify(history))
  }
  return result;
};