"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import JoinMess from "@/services/user.joinMess";

type JoinProps = {
  messID: number;
};

export default function JoinMessButton({ messID }: JoinProps) {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const router = useRouter();

  const handleJoin = async () => {
    try {
      await JoinMess(messID);
      setSuccess(true);
      setShowConfirm(false);
      setError("");

      setTimeout(() => {
        router.push("/auth/login");
      }, 1000);
    } catch (error: any) {
      console.log(error);
      setSuccess(false);

      const errorMessage = error.message || "An unexpected error occured";
      setError(errorMessage);
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
              <span>Are you sure you want to Join this Mess?</span>
              <div>
                <button
                  className="btn btn-sm mr-2"
                  onClick={() => setShowConfirm(false)}
                >
                  No
                </button>
                <button className="btn btn-sm btn-primary" onClick={handleJoin}>
                  Yes
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
            <span>Mess join successfully!</span>
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

      <button
        className="btn btn-neutral"
        onClick={() => setShowConfirm(true)}
        disabled={success}
      >
        Join
      </button>
    </>
  );
}
