import axios from "axios";

const API = axios.create({
  baseURL: "https://order-management-app-10.onrender.com",
});

export default API;