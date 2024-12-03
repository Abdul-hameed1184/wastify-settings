import axios from "axios";

export default axios.create({
    baseURL :'https://api2.wasteefy.com/api',
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem(
          "SESSION_AUTH_TOKEN"
        )}`,
        "Accept": "*/*"
      }
})