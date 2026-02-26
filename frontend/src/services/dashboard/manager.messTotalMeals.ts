import axios from "axios";
import { cookies } from "next/headers";

export async function getTotalMeals() {
  const token = (await cookies()).get("access_token")?.value;

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/mess/totalMeals",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.totalMeals;
  } catch (error: any) {
    throw error.response?.data || { message: "Network Error" };
  }
}
