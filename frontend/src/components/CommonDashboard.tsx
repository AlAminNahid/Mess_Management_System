"use client";
import Link from "next/link";
import Logout from "@/components/auth/logout";

export default function CommonDashboardForm() {
  return (
    <>
      <Logout />

      <div className="min-h-screen bg-white flex items-center justify-center px-[8%]">
        <div
          className="w-full max-w-2xl bg-white border border-slate-200 
                    rounded-2xl shadow-sm p-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Welcome 👋
          </h1>

          <p className="text-slate-600 mb-10 text-lg">
            You are not part of any mess yet. Let’s get you started.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link href="/mess/create" className="flex-1">
              <div
                className="border border-slate-200 rounded-2xl p-8 
                          hover:shadow-lg hover:-translate-y-1 
                          transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-xl font-bold mb-2">Create a Mess</h3>

                <p className="text-slate-500 text-sm mb-6">
                  Start a new mess and invite members.
                </p>

                <button
                  className="w-full bg-black text-white py-3 
                               rounded-xl font-semibold 
                               hover:bg-slate-900 transition"
                >
                  Create
                </button>
              </div>
            </Link>

            <Link href="/mess/join" className="flex-1">
              <div
                className="border border-slate-200 rounded-2xl p-8 
                          hover:shadow-lg hover:-translate-y-1 
                          transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-xl font-bold mb-2">Join a Mess</h3>

                <p className="text-slate-500 text-sm mb-6">
                  Enter an invite code to join an existing mess.
                </p>

                <button
                  className="w-full bg-black text-white py-3 
                               rounded-xl font-semibold 
                               hover:bg-slate-900 transition"
                >
                  Join
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
