import ChangePasswordForm from "@/components/dashboard/changePasswordForm";

export default function SettingsPage() {
  return (
    <div className="w-full px-[8%] py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold">Settings</h1>

        <p className="text-slate-500 text-sm">
          Manage your account security and preferences.
        </p>
      </div>

      <ChangePasswordForm />
    </div>
  );
}
