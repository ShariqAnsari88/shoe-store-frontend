import axios from "axios";
import { EMAIL_API_URL } from "./urls";

const headers = {
  "Content-Type": "text/plain;charset=utf-8",
};

const API = axios.create({
  baseURL: EMAIL_API_URL,
  headers,
});

export const sendContactEmail = async (payload) => {
  const { subject, name, email, message, phone } = payload;
  try {
    await API.post("/api/sendgrid", {
      subject,
      from: email,
      message,
      name,
      phone,
    });
  } catch (error) {
    console.log(error, "Error sending mail!");
  }
};
