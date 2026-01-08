"use client";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="navbar bg-base-100 shadow-sm px-6">
        <div className="flex-1">
          <p className="text-xl font-bold whitespace-nowrap">MessMaster</p>
        </div>
      </div>

      <section className="py-20 px-[8%] text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Got a technical issue? Want to send feedback about a feature? Let us
          know — we’d love to hear from you.
        </p>
      </section>

      <section className="flex items-center justify-center px-4 pb-20">
        <form className="bg-base-200 border border-base-300 rounded-box w-full max-w-lg p-8 shadow-xl space-y-4">
          <div>
            <label htmlFor="email" className="label font-semibold">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="input input-bordered w-full"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="label font-semibold">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              required
              className="input input-bordered w-full"
              placeholder="What is this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="label font-semibold">
              Your Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              className="textarea textarea-bordered w-full"
              placeholder="Write your message here..."
            />
          </div>

          <button className="btn btn-neutral w-full mt-4" type="submit">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
