import { API_URL, STRAPI_API_TOKEN } from "./urls";
import axios from "axios";

const APIHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${STRAPI_API_TOKEN}`,
};

export const API = axios.create({
  baseL: API_URL,
  headers: APIHeaders,
});

export const fetchDataFromApi = async (endpoint) => {
  const res = await API.get(`${'http://localhost:1337'}${endpoint}`);
  return res?.data;
};

export const sendSubscriptionEmail = async(endpoint, email) => {
  const res = await API.post(`${API_URL}${endpoint}`, email);
  return res?.data;
}

export const makePaymentRequest = async (endpoint, payload) => {
  const res = await API.post(`${API_URL}${endpoint}`, payload);
  return res?.data;
};

export const sendResetEmail = async (payload) => {
  const res = await API.post(`${API_URL}/api/auth/forgot-password`, {
    email: payload,
  });
  return res?.data;
};

export const changePassword = async (payload) => {
  const { code, password, passwordConfirmation } = payload;

  const res = await API.post(`${API_URL}/api/auth/reset-password`, {
    code, // code contained in the reset link of step 3.
    password,
    passwordConfirmation,
  });

  return res?.data;
};
