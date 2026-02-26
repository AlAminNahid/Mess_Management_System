import axios from "axios";
import { forgetPassSchema } from "@/validation/forgetPassSchema";

export async function forgetPass(userData: forgetPassSchema) {
  try {
    const response = await axios.patch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/forget-password",
      userData,
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (error: any) {
    throw error.response?.data || { message: "Network Error" };
  }
}
