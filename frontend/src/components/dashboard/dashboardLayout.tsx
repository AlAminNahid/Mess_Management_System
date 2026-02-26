"use client";

import { DashboardProvider } from "@/components/dashboard/dashboardContext";
import SlideBar from "@/components/slidebar";

interface Props {
  role: "manager" | "member";
  userName: string;
  totalMeals: number;
  totalMealExpense: number;
  perHeadMeal: number;
  children: React.ReactNode;
}

export default function DashboardLayout({
  role,
  totalMeals,
  totalMealExpense,
  perHeadMeal,
  userName,
  children,
}: Props) {
  return (
    <>
      <DashboardProvider value={{ totalMeals, totalMealExpense, perHeadMeal }}>
        {children}
        <SlideBar role={role} userName={userName} />
      </DashboardProvider>
    </>
  );
}
