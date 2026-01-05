import axios from "axios";

export async function loginUser(userData: { email: string; password: string }) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/login",
      userData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Network Error" };
  }
}
