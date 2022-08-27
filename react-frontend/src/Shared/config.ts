const config = {
    backend: import.meta.url.includes("127.0.0.1") ? "https://localhost:44300" : ""
  };
  
  export default config;