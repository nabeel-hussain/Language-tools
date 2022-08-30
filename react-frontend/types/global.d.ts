interface Translate {
  to: string;
  from: string;
  text: string;
}
interface Action {
  type: string;
  payload: string;
}
interface TranslationHistory {
  to?: string;
  from?: string;
  text?: string;
  response?: Array;
}
interface Language {
  code: string;
  name: string;
  nativeName: string;
}
interface User{
  username: string;
  password: string;
}
interface SpellChecker {
  lang: string;
  text: string;
}
interface SpellCheckerResult {
  word: string;
  correctword: string;
  candidates: []
}
interface MenuItem {
  name: string;
  breadcrumb?: string;
  icon?: string;
  isHide?: boolean;
  subMenu?: MenuItem[];
  component: string;
  path: "";
}
