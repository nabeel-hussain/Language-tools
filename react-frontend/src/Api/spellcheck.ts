import backend from "./backend";
//THis function will ge tthe spell check result
export const getSpellCheckResult = async (input: SpellChecker) => {
  let res = await backend.post("/spell-checker", input);
  return res.data.result as SpellCheckerResult[];
};
