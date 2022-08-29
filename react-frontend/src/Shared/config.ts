const config = {
    backend: import.meta.url.includes("127.0.0.1") ? "https://localhost:44300" : "https://language-tools.azurewebsites.net",
    username: "lang_tools",
    password: "VeDJvcvB0uiQ1Hd"
  };
  
  export default config;
