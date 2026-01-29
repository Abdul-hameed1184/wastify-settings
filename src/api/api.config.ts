import axios from "axios";

const api =  axios.create({
    baseURL :'https://api2staging.wasteefy.com/api/',
    headers: {
        "Content-type": "application/json",
        "Accept": "*/*"
      }
})



api.interceptors.request.use((config) => {
  const sessionToken = sessionStorage.getItem("SESSION_AUTH_TOKEN");

  if (sessionToken) {
    config.headers.Authorization = `Bearer ${sessionToken}`;
  }

  return config;
});

export default api;