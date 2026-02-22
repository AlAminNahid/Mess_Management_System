import HomePage from "./homePage";

type ManagerContentProps = {
  section: "homepage" | "profile" | "meals" | "utility" | "settings";
  totalMeals: number;
  totalMealExpense: number;
  perHeadMeal: number;
};

export default function ManagerContent({
  section,
  totalMeals,
  totalMealExpense,
  perHeadMeal,
}: ManagerContentProps) {
  switch (section) {
    case "homepage":
      return (
        <HomePage
          totalMeals={totalMeals}
          totalMealExpense={totalMealExpense}
          perHeadMeal={perHeadMeal}
        />
      );
    case "profile":
      return <p>Manager Profile Page</p>;
    case "meals":
      return <p>Manager Meal Page</p>;
    case "utility":
      return <p>Manager Utility Page</p>;
    case "settings":
      return <p>Manager Settings Page</p>;

    default:
      return null;
  }
}
