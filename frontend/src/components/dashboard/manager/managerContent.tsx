import HomePage from "./homePage";

type Section = "homepage" | "profile" | "meals" | "utility" | "settings";

export default function ManagerContent({ section }: { section: Section }) {
  switch (section) {
    case "homepage":
      return <HomePage />;
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
