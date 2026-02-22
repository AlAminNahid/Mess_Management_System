"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Logout() {
  const route = useRouter();
  const [success, setSuccess] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogout = async () => {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
      setSuccess(true);
      setShowConfirm(false);
      setError("");

      setTimeout(() => {
        route.push("/auth/login");
      }, 1000);
    } catch (error) {
      console.log("Logout failed", error);
      setError("Logout failed. Please try again.");
      setShowConfirm(false);
    }
  };

  return (
    <>
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setShowConfirm(true)}
          disabled={success}
          className="bg-black text-white px-5 py-2 rounded-xl 
                 hover:bg-slate-900 transition duration-200"
        >
          Logout
        </button>
      </div>

      {showConfirm && (
        <div
          className="fixed inset-0 flex items-center justify-center 
                    bg-black/40 backdrop-blur-sm z-50 animate-fadeIn"
        >
          <div
            className="bg-white w-full max-w-md p-8 rounded-2xl 
                      shadow-xl transform transition-all scale-100"
          >
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>

            <p className="text-slate-600 mb-6">
              Are you sure you want to log out of your account?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 
                       hover:bg-slate-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-black text-white 
                       hover:bg-slate-900 transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="fixed inset-x-0 top-6 flex justify-center z-50">
          <div
            className="bg-green-50 border border-green-200 
                    text-green-700 px-6 py-3 rounded-xl 
                    shadow-md animate-fadeIn"
          >
            Logged out successfully!
          </div>
        </div>
      )}

      {error && (
        <div className="fixed inset-x-0 top-6 flex justify-center z-50">
          <div
            className="bg-red-50 border border-red-200 
                    text-red-700 px-6 py-3 rounded-xl 
                    shadow-md animate-fadeIn"
          >
            {error}
          </div>
        </div>
      )}
    </>
  );
}
