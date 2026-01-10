import Logout from "@/component/auth/logout";
import SlideBar from "@/component/slidebar";

export default async function ManagerDashboard({
  params,
}: {
  params: Promise<{ data: string }>;
}) {
  const userID = (await params).data;

  return (
    <>
      <Logout />
      <SlideBar role="member" />
    </>
  );
}
