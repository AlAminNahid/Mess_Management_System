"use client";
import HeroSection from "@/components/heroSection";

export default function ContactUs() {
  return (
    <>
      <HeroSection />

      <section className="py-20 px-[8%] text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Got a technical issue? Want to send feedback about a feature? Let us
          know — we’d love to hear from you.
        </p>
      </section>

      <section className="flex items-center justify-center px-[8%] pb-24">
        <form
          className="w-full max-w-xl bg-white border border-slate-200 
                   rounded-2xl shadow-sm p-10 space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold mb-2">
              Your Email
            </label>
            <input
              type="email"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-3 
                   focus:outline-none focus:ring-2 focus:ring-blue-600 
                   focus:border-blue-600 transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Subject</label>
            <input
              type="text"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-3 
                   focus:outline-none focus:ring-2 focus:ring-blue-600 
                   focus:border-blue-600 transition"
              placeholder="What is this about?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Your Message
            </label>
            <textarea
              required
              rows={5}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 
                   focus:outline-none focus:ring-2 focus:ring-blue-600 
                   focus:border-blue-600 transition resize-none"
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl 
                 font-semibold hover:bg-slate-900 
                 transition duration-200"
          >
            Send Message
          </button>
        </form>
      </section>
    </>
  );
}
