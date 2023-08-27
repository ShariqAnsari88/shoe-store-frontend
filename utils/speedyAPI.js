import axios from "axios";

const APIHeaders = {
  "Content-Type": "application/json",
};

export const API = axios.create({
  baseURL: process.env.SPEEDY_API_URL,
  headers: APIHeaders,
});

export const getAllOffices = async () => {
  try {
    const result = await API.get(
      `/location/office/?username=tsvetomir.uzunoff@gmail.com&password=9908113506Narutos22&country_id=100`
    );
    return result.data
    
  } catch (error) {
    return error;
  }
};
