"use client";

import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { changePasswordSchema } from "@/validation/changePasswordSchema";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = changePasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      //await changePassword(result.data);
      setSuccess(true);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white border border-slate-200 rounded-xl p-10 shadow-sm"
      >
        <h2 className="text-xl font-bold mb-8">Change Password</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-semibold">Current Password</label>

            <div className="relative mt-1">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showCurrentPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 pr-10"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />

              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold">New Password</label>

            <div className="relative mt-1">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showNewPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 pr-10"
                placeholder="New password (@ # $ & required)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold">Confirm Password</label>

            <div className="relative mt-1">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 pr-10"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>
        </div>

        <button className="btn btn-neutral mt-8">Update Password</button>
      </form>

      {success && (
        <div className="fixed inset-x-0 top-6 flex justify-center">
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-xl shadow">
            Password updated successfully!
          </div>
        </div>
      )}

      {error && (
        <div className="fixed inset-x-0 top-6 flex justify-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-3 rounded-xl shadow">
            {error}
          </div>
        </div>
      )}
    </>
  );
}
