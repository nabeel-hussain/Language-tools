import backend from "./backend";

export const getSpellCheckResult = async (input: SpellChecker)=>{
   let res = await backend.post('/spell-checker',input)
   return res.data.result as SpellCheckerResult[]
}