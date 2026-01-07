import axios from "axios";
import { MessSchemaType } from "@/validation/messSchema";

export async function createMess(messData: MessSchemaType) {
  try {
    await axios.post(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/mess/createMess",
      messData,
      {
        withCredentials: true,
      }
    );
  } catch (error: any) {
    throw error.response?.data || { message: "Network Error" };
  }
}
