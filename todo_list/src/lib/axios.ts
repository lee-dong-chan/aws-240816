import axios from "axios";

const instance = axios.create({
  baseURL: "https://lee.dsongc.com/todo/api",
  withCredentials: true,
});

export default instance;
