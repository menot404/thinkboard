import axios from "axios";
import { config } from "./config/env";

const api = axios.create({
    baseURL: config.apiUrl,
});

export default api;