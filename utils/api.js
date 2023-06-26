import { API_URL, STRAPI_API_TOKEN } from "./urls";
import axios from "axios";

const APIHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${STRAPI_API_TOKEN}`,
};

export const API = axios.create({
  baseURL: API_URL,
  headers: APIHeaders,
});

export const fetchDataFromApi = async (endpoint) => {
  const res = await API.get(`${API_URL}${endpoint}`);
  return res?.data;
};

export const makePaymentRequest = async (endpoint, payload) => {
  const res = await API.post(`${API_URL}${endpoint}`, payload);
  return res?.data;
};
