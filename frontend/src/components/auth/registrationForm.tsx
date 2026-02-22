"use client";
import { FormEvent, useEffect, useState } from "react";
import { createUser } from "@/services/user.registration";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/validation/registerSchema";
import { User, Mail, Lock, Phone, CreditCard } from "lucide-react";
import HeroSection from "@/components/heroSection";

export default function RegistrationForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nid, setNid] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const result = registerSchema.safeParse({
      name,
      email,
      password,
      nid,
      phone,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      setLoading(true);

      const response = await createUser(result.data);

      setSuccess(true);
      setError("");
      setLoading(false);
      console.log(response);

      setName("");
      setEmail("");
      setPassword("");
      setNid("");
      setPhone("");

      setTimeout(() => {
        route.push("/auth/login");
      }, 1000);
    } catch (error: any) {
      console.log(error);
      setSuccess(false);

      const errorMessage = error.message || "Registration Failed";
      setError(errorMessage);
    }
  };

  return (
    <>
      <HeroSection />

      <div className="min-h-screen flex items-center justify-center bg-white px-[8%] py-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white border border-slate-200 
               rounded-2xl shadow-sm p-10 space-y-6"
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">
              Create Your Account
            </h2>
            <p className="text-slate-500 text-sm">
              Join MessMaster and simplify your mess management
            </p>
          </div>

          {success && (
            <div className="fixed inset-x-0 top-6 flex justify-center z-50">
              <div
                className="bg-green-50 border border-green-200 
                    text-green-700 px-6 py-3 rounded-xl 
                    shadow-md animate-fadeIn"
              >
                Registration successful! Redirecting to login...
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

          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none"
              />

              <input
                type="text"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 pl-10
                 focus:outline-none focus:ring-2 focus:ring-blue-600
                 focus:border-blue-600 transition"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none"
              />

              <input
                type="email"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 pl-10
                 focus:outline-none focus:ring-2 focus:ring-blue-600
                 focus:border-blue-600 transition"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none"
              />

              <input
                type="password"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 pl-10
                 focus:outline-none focus:ring-2 focus:ring-blue-600
                 focus:border-blue-600 transition"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">NID</label>
              <div className="relative">
                <CreditCard
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none"
                />

                <input
                  type="text"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 pl-10
               focus:outline-none focus:ring-2 focus:ring-blue-600
               focus:border-blue-600 transition"
                  placeholder="Enter NID number"
                  value={nid}
                  onChange={(e) => setNid(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none"
                />

                <input
                  type="text"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 pl-10
               focus:outline-none focus:ring-2 focus:ring-blue-600
               focus:border-blue-600 transition"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl 
             font-semibold hover:bg-slate-900 transition 
             flex items-center justify-center gap-2
             disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading && (
              <span
                className="w-4 h-4 border-2 border-white border-t-transparent 
                     rounded-full animate-spin"
              ></span>
            )}

            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
