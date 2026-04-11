import axios from "axios";
import { LoginSchemaType } from "@/validation/loginSchema";

export async function loginUser(userData: LoginSchemaType) {
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
