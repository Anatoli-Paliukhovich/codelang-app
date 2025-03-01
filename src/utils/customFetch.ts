import axios from "axios";

const productionUrl = "https://codelang.vercel.app/api";

export const customFetch = axios.create({
  baseURL: productionUrl,
});
