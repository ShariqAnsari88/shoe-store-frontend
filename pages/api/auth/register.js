import { API } from "@/utils/api";
import { setToken } from "@/utils/auth";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(data) {
  const { username, password, email } = data;

  try {
    const response = await API.post("api/auth/local/register", {
      username,
      email,
      password,
    });

    setToken(response);
    
    console.log('Authenticated');
  } catch (e) {
    console.log(e, "error");
  }
}
