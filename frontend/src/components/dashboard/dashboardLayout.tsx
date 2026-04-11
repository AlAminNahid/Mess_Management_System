"use client";

import { DashboardProvider } from "@/components/dashboard/dashboardContext";
import SlideBar from "@/components/slidebar";

interface Props {
  role: "manager" | "member";
  userName: string;
  userEmail: string;
  userNID: string;
  userPhone: string;
  totalMeals: number;
  totalMealExpense: number;
  perHeadMeal: number;
  userMeals: number;
  userSubmitMoney: number;
  userTotalCost: number;
  userInTotalCost: number;
  utilityCost: any[];
  messID: number;
  children: React.ReactNode;
}

export default function DashboardLayout({
  role,
  totalMeals,
  totalMealExpense,
  perHeadMeal,
  userName,
  userEmail,
  userNID,
  userPhone,
  userMeals,
  userSubmitMoney,
  userTotalCost,
  userInTotalCost,
  utilityCost,
  messID,
  children,
}: Props) {
  return (
    <>
      <DashboardProvider
        value={{
          role,
          totalMeals,
          totalMealExpense,
          perHeadMeal,
          userName,
          userEmail,
          userNID,
          userPhone,
          userMeals,
          userSubmitMoney,
          userTotalCost,
          userInTotalCost,
          utilityCost,
          messID,
        }}
      >
        {children}
        <SlideBar role={role} userName={userName} />
      </DashboardProvider>
    </>
  );
}
