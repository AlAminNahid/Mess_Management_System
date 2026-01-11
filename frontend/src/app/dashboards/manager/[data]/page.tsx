import Logout from "@/component/auth/logout";
import SlideBar from "@/component/slidebar";
import { getMessData } from "@/services/manager.messTotalMeals";

export default async function ManagerDashboard({
  params,
}: {
  params: Promise<{ data: string }>;
}) {
  const userID = (await params).data;
  const totalMeals = await getMessData();

  return (
    <>
      <Logout />
      <SlideBar role="manager" messData={totalMeals} />
    </>
  );
}
