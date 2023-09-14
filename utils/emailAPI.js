import axios from "axios";
import { EMAIL_API_URL } from "./urls";

const headers = {
  "Content-Type": "application/json",
};

const API = axios.create({
  baseURL: EMAIL_API_URL,
  headers,
});

export const sendContactEmail = async (payload) => {
  if (payload.type) {
    const { type, email } = payload;
    try {
      await API.post("/api/sendgrid", {
        type,
        from: email,
        subject: 'Абониране'
      });
    } catch (error) {
      console.log(error, "Error sending mail!");
    }
  } else {
    const { subject, name, email, message, phone, type } = payload;

    try {
      await API.post("/api/sendgrid", {
        type,
        subject,
        from: email,
        message,
        name,
        phone,
      });
    } catch (error) {
      console.log(error, "Error sending mail!");
    }
  }
};
