import Logout from "@/components/auth/logout";
import SlideBar from "@/components/slidebar";
import { getTotalMeals } from "@/services/dashboard/manager.messTotalMeals";
import { getTotalMealExpense } from "@/services/dashboard/manager.messTotalMealExpense";

export default async function ManagerDashboard({
  params,
}: {
  params: Promise<{ data: string }>;
}) {
  const userID = (await params).data;
  const totalMeals = await getTotalMeals();
  const totalMealExpense = await getTotalMealExpense();
  const perHeadMeal = Math.round(totalMealExpense / totalMeals);

  return (
    <>
      <Logout />
      <SlideBar
        role="manager"
        totalMeals={totalMeals}
        totalMealExpense={totalMealExpense}
        perHeadMeal={perHeadMeal}
      />
    </>
  );
}
