import Logout from "@/components/auth/logout";
import SlideBar from "@/components/slidebar";

export default async function ManagerDashboard({
  params,
}: {
  params: Promise<{ data: string }>;
}) {
  const userID = (await params).data;

  return (
    <>
      <Logout />
      <SlideBar
        role="member"
        totalMeals={0}
        totalMealExpense={0}
        perHeadMeal={0}
      />
    </>
  );
}
