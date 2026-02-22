"use client";

import { useState, FormEvent, useEffect } from "react";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { forgetPasswordSchema } from "@/validation/forgetPassSchema";
import { forgetPass } from "@/services/user.forgetPass";
import { useRouter } from "next/navigation";

export default function ForgetPasswordForm() {
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/auth/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const result = forgetPasswordSchema.safeParse({
      email,
      newPassword,
      confirmPassword,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      setLoading(true);
      await forgetPass(result.data);
      setSuccess(true);
      setLoading(false);

      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setLoading(false);
      setSuccess(false);

      const errorMessage = error.message || "Something went wrong";
      setError(errorMessage);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white border border-slate-200 
                   rounded-2xl shadow-sm p-10 space-y-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Reset Password
          </h2>
          <p className="text-slate-500 text-sm">
            Enter your email and new password
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="email"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 pl-10
                         focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            New Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="password"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 pl-10
                         focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 z-10"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="password"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 pl-10
                         focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder="Enter the new password again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 z-10"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl 
                     font-semibold hover:bg-slate-900 
                     flex justify-center items-center gap-2
                     disabled:opacity-70"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>

      {/* Toast */}
      {success && (
        <div className="fixed inset-x-0 top-6 flex justify-center z-50">
          <div
            className="bg-green-50 border border-green-200 
                          text-green-700 px-6 py-3 rounded-xl shadow-md animate-fadeIn"
          >
            Password updated successfully! Redirecting to login...
          </div>
        </div>
      )}

      {error && (
        <div className="fixed inset-x-0 top-6 flex justify-center z-50">
          <div
            className="bg-red-50 border border-red-200 
                          text-red-700 px-6 py-3 rounded-xl shadow-md animate-fadeIn"
          >
            {error}
          </div>
        </div>
      )}
    </>
  );
}
