import axios from "axios";

export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
  nid: string;
  phone: string;
}) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/registration",
      userData
    );

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Network Error" };
  }
}
