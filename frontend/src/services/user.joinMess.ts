import axios from "axios";

export default async function JoinMess(messID: number) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/mess/joinMess",
      { messID: messID },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Network Error" };
  }
}
