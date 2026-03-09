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
        }}
      >
        {children}
        <SlideBar role={role} userName={userName} />
      </DashboardProvider>
    </>
  );
}
