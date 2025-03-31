import axios from "axios";

const productionUrl = "/api";

export const customFetch = axios.create({
  baseURL: productionUrl,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});
