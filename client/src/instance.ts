import axios from "axios";
const instance = axios.create({
  baseURL: "https://coligo-1vh2.onrender.com/api/coligo",
  withCredentials: true,
});

export default instance;
