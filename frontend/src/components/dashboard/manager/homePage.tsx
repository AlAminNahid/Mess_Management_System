"use client";

import { useDashboard } from "@/components/dashboard/dashboardContext";
import { Utensils, Wallet, TrendingUp } from "lucide-react";

export default function HomePage() {
  const { totalMeals, totalMealExpense, perHeadMeal } = useDashboard();

  return (
    <div className="min-h-[60vh] px-6 py-6 bg-white">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight mb-2">
          Mess Overview
        </h2>
        <p className="text-slate-500 text-sm">
          Summary of total meals, bazaar expenses and per head meal cost.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div
          className="bg-white border border-slate-200 
                        rounded-2xl p-8 shadow-sm 
                        hover:shadow-xl hover:-translate-y-2 
                        transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-500">
              Total Meals
            </h3>
            <Utensils className="text-blue-600" size={22} />
          </div>

          <p className="text-4xl font-extrabold tracking-tight">{totalMeals}</p>
        </div>

        <div
          className="bg-white border border-slate-200 
                        rounded-2xl p-8 shadow-sm 
                        hover:shadow-xl hover:-translate-y-2 
                        transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-500">
              Total Bazar Cost
            </h3>
            <Wallet className="text-green-600" size={22} />
          </div>

          <p className="text-4xl font-extrabold tracking-tight">
            ৳ {totalMealExpense}
          </p>
        </div>

        <div
          className="bg-white border border-slate-200 
                        rounded-2xl p-8 shadow-sm 
                        hover:shadow-xl hover:-translate-y-2 
                        transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-500">
              Per Meal Cost
            </h3>
            <TrendingUp className="text-purple-600" size={22} />
          </div>

          <p className="text-4xl font-extrabold tracking-tight">
            ৳ {perHeadMeal}
          </p>
        </div>
      </div>

      <div className="mb-8 mt-10">
        <h2 className="text-3xl font-extrabold tracking-tight mb-2">
          Mess Overview
        </h2>
        <p className="text-slate-500 text-sm">
          Summary of total meals, bazaar expenses and per head meal cost.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div
          className="bg-white border border-slate-200 
                        rounded-2xl p-8 shadow-sm 
                        hover:shadow-xl hover:-translate-y-2 
                        transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-500">
              Total Meals
            </h3>
            <Utensils className="text-blue-600" size={22} />
          </div>

          <p className="text-4xl font-extrabold tracking-tight">{totalMeals}</p>
        </div>

        <div
          className="bg-white border border-slate-200 
                        rounded-2xl p-8 shadow-sm 
                        hover:shadow-xl hover:-translate-y-2 
                        transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-500">
              Total Submitted Money
            </h3>
            <Wallet className="text-green-600" size={22} />
          </div>

          <p className="text-4xl font-extrabold tracking-tight">
            ৳ {totalMealExpense}
          </p>
        </div>

        <div
          className="bg-white border border-slate-200 
                        rounded-2xl p-8 shadow-sm 
                        hover:shadow-xl hover:-translate-y-2 
                        transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-500">Total Cost</h3>
            <TrendingUp className="text-purple-600" size={22} />
          </div>

          <p className="text-4xl font-extrabold tracking-tight">
            ৳ {perHeadMeal}
          </p>
        </div>
      </div>
    </div>
  );
}
