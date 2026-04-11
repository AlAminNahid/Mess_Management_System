import HeroSection from "@/components/heroSection";

export default function AboutUs() {
  return (
    <>
      <HeroSection />

      <div className="px-[8%] py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              About <span className="text-blue-600">MessMaster</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto">
              A modern digital solution designed to simplify shared mess
              management, improve transparency, and enhance coordination among
              members.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 mb-10">
            <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
            <p className="text-slate-600 leading-relaxed">
              MessMaster is a web-based Mess Management System built to
              streamline daily meal tracking, expense calculation, and
              communication in shared living environments such as student
              hostels and rental apartments.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 mb-10">
            <h2 className="text-2xl font-bold mb-6">Purpose & Objectives</h2>
            <div className="grid md:grid-cols-2 gap-4 text-slate-600">
              <div className="p-4 rounded-xl bg-slate-50">
                Reduce manual and paper-based mess management
              </div>
              <div className="p-4 rounded-xl bg-slate-50">
                Provide transparent meal and cost calculation
              </div>
              <div className="p-4 rounded-xl bg-slate-50">
                Simplify mess creation and member joining
              </div>
              <div className="p-4 rounded-xl bg-slate-50">
                Offer a user-friendly digital solution
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 mb-10">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 border border-slate-200 rounded-xl hover:shadow-md transition">
                User registration & secure authentication
              </div>
              <div className="p-5 border border-slate-200 rounded-xl hover:shadow-md transition">
                Create or join a mess
              </div>
              <div className="p-5 border border-slate-200 rounded-xl hover:shadow-md transition">
                Meal and expense tracking
              </div>
              <div className="p-5 border border-slate-200 rounded-xl hover:shadow-md transition">
                Role-based dashboards
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 mb-10">
            <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                Next.js
              </span>
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                React
              </span>
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                Tailwind CSS
              </span>
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">
                NestJS
              </span>
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                PostgreSQL
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 mb-10">
            <h2 className="text-2xl font-bold mb-4">Developer</h2>
            <p className="text-slate-600 leading-relaxed">
              Designed and developed by <strong>Al Amin Hossain Nahid</strong>
              (Student ID: 22-49627-3) as part of academic course-work at
              American International University–Bangladesh (AIUB).
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-4">Future Enhancements</h2>
            <ul className="space-y-2 text-slate-600">
              <li>• Online payment integration</li>
              <li>• Mobile application version</li>
              <li>• Advanced admin controls</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
