export default function AboutUs() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm flex justify-between">
        <div className="flex-1">
          <p className="text-xl font-bold whitespace-nowrap">MessMaster</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Project Overview</h2>
          <p className="text-gray-600 leading-relaxed">
            MessMaster is a web-based Mess Management System designed to
            simplify daily meal management, member coordination, and expense
            tracking for shared mess environments such as student hostels and
            rental houses.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Purpose & Objectives</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Reduce manual and paper-based mess management</li>
            <li>Provide transparent meal and cost calculation</li>
            <li>Simplify mess creation and member joining process</li>
            <li>Offer a user-friendly digital solution</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>User registration and secure authentication</li>
            <li>Create or join a mess</li>
            <li>Meal and expense tracking</li>
            <li>Role-based dashboards</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Technology Stack</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Frontend: Next.js, React, Tailwind CSS</li>
            <li>Backend: NestJS</li>
            <li>Database: PostgreSQL</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Developer Information</h2>
          <p className="text-gray-600 leading-relaxed">
            This project was designed and developed by Al Amin Hossain Nahid
            (Student ID: 22-49627-3) as part of an academic coursework at
            American International University–Bangladesh (AIUB).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Future Enhancements</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Online payment integration</li>
            <li>Mobile application version</li>
            <li>Advanced admin controls</li>
          </ul>
        </section>
      </div>
    </>
  );
}
