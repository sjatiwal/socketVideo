import axios from "axios";

const backend = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5555",
});

export default backend;
