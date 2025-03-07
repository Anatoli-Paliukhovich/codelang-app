import axios from "axios";

const productionUrl = "https://codelang.vercel.app/api";

export const customFetch = axios.create({
  baseURL: productionUrl,
  headers: {
    Accept: "application/json",
   //  "Access-Control-Allow-Credentials": true,
   //  "Access-Control-Allow-Origin": "http://localhost:5173",
  },
});
