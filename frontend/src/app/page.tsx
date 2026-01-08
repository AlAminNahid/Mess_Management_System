import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm flex justify-between">
        <div className="flex-1">
          <p className="text-xl font-bold whitespace-nowrap">
            Welcome To MessMaster
          </p>
        </div>

        <div className="flex-1 flex justify-end"></div>
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/contact" className="btn btn-outline mr-1.5">
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/about" className="btn btn-outline">
              About Us
            </Link>
          </li>
        </ul>
      </div>

      <header className="py-18 px-[8%] text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          The Ultimate Mess Solution <br />
          <span className="text-blue-600 text-4xl md:text-5xl">
            for Bachelors
          </span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-12">
          A specialized system designed to simplify meal tracking, automate
          utility expense calculations, and streamline communication between
          roommates.
        </p>

        <ul className="menu menu-horizontal px-1 mar">
          <li>
            <Link href="/auth/login" className="btn btn-neutral mr-1 w-30">
              Login
            </Link>
          </li>
          <li>
            <Link href="/auth/register" className="btn btn-neutral w-30">
              Registration
            </Link>
          </li>
        </ul>
      </header>

      <section className="py-20 px-[8%] grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <span className="inline-block bg-green-100 text-green-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Manager Only
          </span>
          <h3 className="text-xl font-bold mb-3">Meal & Expense Management</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Effortlessly insert or update daily meal counts and meal expenses
            for every member in the system.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <span className="inline-block bg-green-100 text-green-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            Manager Only
          </span>
          <h3 className="text-xl font-bold mb-3">Automated Utility Costs</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Keep track of common bills including Rent, Internet, Electricity,
            Maid, Gas, and more in one central place.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <span className="inline-block bg-purple-100 text-purple-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            All Members
          </span>
          <h3 className="text-xl font-bold mb-3">Shopping & Announcements</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Send instant "Shopping Requests" (like "Khala boleche murgi lagbe")
            or mess-wide announcements to everyone.
          </p>
        </div>
      </section>
    </>
  );
}
