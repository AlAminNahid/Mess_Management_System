"use client";

import { createContext, useContext } from "react";

interface DashboardContextType {
  totalMeals: number;
  totalMealExpense: number;
  perHeadMeal: number;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: DashboardContextType;
}) {
  return (
    <>
      <DashboardContext.Provider value={value}>
        {children}
      </DashboardContext.Provider>
    </>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used inside DashboardProvider");
  }

  return context;
}
