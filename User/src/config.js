const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://smart-farming-advisory-system.onrender.com";

export default API_URL;