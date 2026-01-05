"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CommonDashboardForm() {
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
        }
      );
      setSuccess(true);
      setShowConfirm(false);
      setError("");

      setTimeout(() => {
        route.push("../auth/login");
      }, 2000);
    } catch (error) {
      console.log("Logout failed", error);
      setError("Logout failed. Please try again.");
      setShowConfirm(false);
    }
  };

  return (
    <>
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
        {showConfirm && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4">
            <div
              role="alert"
              className="alert alert-vertical sm:alert-horizontal shadow-2xl border border-base-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info h-6 w-6 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Are you sure you want to log out of your account?</span>
              <div>
                <button
                  className="btn btn-sm mr-2"
                  onClick={() => setShowConfirm(false)}
                >
                  Deny
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleLogout}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div role="alert" className="alert alert-success shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Logged out successfully!</span>
          </div>
        )}

        {error && (
          <div role="alert" className="alert alert-error shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setShowConfirm(true)}
          className="btn btn-neutral"
          disabled={success}
        >
          Logout
        </button>
      </div>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome User</h1>
            <p className="py-6">
              You are not in any mess. Would you like to join one or create one?
            </p>
            <Link href={"../mess/create"}>
              <button className="btn btn-neutral mr-2.5">Create Mess</button>
            </Link>
            <button className="btn btn-neutral">Join Mess</button>
          </div>
        </div>
      </div>
    </>
  );
}
