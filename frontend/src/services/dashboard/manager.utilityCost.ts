import axios from "axios";

export async function addUtilityCost(data: any) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_ENDPOINT + `/utility_cost/insertUtiltyCosts`,
      data,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Network Error" };
  }
}
