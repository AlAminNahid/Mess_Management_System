import axios from "axios";

export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
  nid: string;
  phone: string;
}) {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/registration",
    userData
  );

  return response.data;
}
