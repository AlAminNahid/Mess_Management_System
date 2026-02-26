import axios from "axios";
import { cookies } from "next/headers";

export async function GetUserById(userID: string) {
  const token = (await cookies()).get("access_token")?.value;

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_ENDPOINT + `/shared/userById/${userID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Network Error" };
  }
}
