import { API_URL, STRAPI_API_TOKEN } from "./urls";
import axios from "axios";

export const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
  },
});

export const fetchDataFromApi = async (endpoint) => {
  const res = await API.get(`${API_URL}${endpoint}`);
  return res?.data;
};

export const makePaymentRequest = async (endpoint, payload) => {
  const res = await API.post(`${API_URL}${endpoint}`, payload);
  return res?.data;
};
