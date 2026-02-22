interface HomePageProps {
  totalMeals: number;
  totalMealExpense: number;
  perHeadMeal: number;
}

export default function HomePage({
  totalMeals,
  totalMealExpense,
  perHeadMeal,
}: HomePageProps) {
  return (
    <>
      <div className="stats shadow flex items-center justify-center">
        <div className="stat place-items-center">
          <div className="stat-title">Total Meals</div>
          <div className="stat-value">{totalMeals}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Total Cost</div>
          <div className="stat-value">{totalMealExpense}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Per Meal</div>
          <div className="stat-value">{perHeadMeal}</div>
        </div>
      </div>
    </>
  );
}
