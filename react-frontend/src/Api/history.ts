import backend from "./backend";

export const getHistory = async () => {
  let res = await backend.get("/history");
  let result = res.data.history as Array<TranslationHistory>;
  return result;
};
export const clearHistory = async () => {
  let res = await backend.delete("/history");
  let result = res.data.result as boolean;
  return result;
};
