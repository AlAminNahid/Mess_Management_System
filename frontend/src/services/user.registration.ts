import axios from "axios";
import { RegisterSchemaType } from "@/validation/registerSchema";

export async function createUser(userData: RegisterSchemaType) {
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
