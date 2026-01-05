import axios from "axios";

export async function createMess(messData: { name: string; address: string }) {
  try {
    const response = await axios.post(
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
