import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://showcase.leantechniques.com",
  headers: {
    "Content-Type": "application/json",
    lt_api_key: "lt_tech_showcase",
  },
});

export default baseApi;
