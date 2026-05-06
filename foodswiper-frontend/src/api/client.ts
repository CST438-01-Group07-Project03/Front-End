import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const LOGIN_GOOGLE = `${BASE_URL}/oauth2/authorization/google`;
export const LOGIN_GITHUB = `${BASE_URL}/oauth2/authorization/github`;

const client = axios.create({ baseURL: BASE_URL, withCredentials: true });

export default client;
