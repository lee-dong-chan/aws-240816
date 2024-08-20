import axios from "axios";

const instance = axios.create({
  baseURL: "https://54.180.251.198/todo/api",
  withCredentials: true,
});

export default instance;
