import backend from "./backend";

export const translate = async (translateObj: Translate) => {
  let res = await backend.post("/translate", translateObj);
  debugger;
  let result = res.data.join("\r\n") as string;
  return result;
};
