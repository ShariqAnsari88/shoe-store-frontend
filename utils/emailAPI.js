import axios from "axios";
import { EMAIL_API_URL } from "./urls";

const headers = {
  "Content-Type": "application/json",
};

const API = axios.create({
  baseL: EMAIL_API_URL,
  headers,
});

export const sendContactEmail = async (payload) => {
  if (payload.type) {
    const { type, locale, email } = payload;
    try {
      await API.post("/api/sendgrid", {
        locale,
        type,
        email,
        subject: "Абонамент",
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
        email,
        message,
        name,
        phone,
      });
    } catch (error) {
      console.log(error, "Error sending mail!");
    }
  }
};
