import HomePage from "./homePage";
import ProfilePage from "../profilePage";
import UtilityCostPage from "./utilityCostPage";
import SettingsPage from "@/components/dashboard/settingsPage";

type Section = "homepage" | "profile" | "meals" | "utility" | "settings";

export default function ManagerContent({ section }: { section: Section }) {
  switch (section) {
    case "homepage":
      return <HomePage />;
    case "profile":
      return <ProfilePage />;
    case "meals":
      return <p>Manager Meal Page</p>;
    case "utility":
      return <UtilityCostPage />;
    case "settings":
      return <SettingsPage />;

    default:
      return null;
  }
}
