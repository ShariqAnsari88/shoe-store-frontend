import { API } from "@/utils/api";
import { setToken } from "@/utils/auth";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(user) {
  const { password, username } = user;

  try {
    const postRes = await API.post(`api/auth/local`, {
      identifier: username,
      password,
    });

    setToken(postRes)

    console.log("Authenticated")
  } catch (e) {
    console.log(e, 'Issue logging in')
  }
};
