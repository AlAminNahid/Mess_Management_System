"use client";
import Link from "next/link";

export default function CommonDashboardForm() {
  return (
    <>
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
