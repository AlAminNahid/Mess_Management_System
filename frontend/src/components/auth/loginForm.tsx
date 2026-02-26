"use client";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth/user.login";
import { loginSchema } from "@/validation/loginSchema";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import HeroSection from "@/components/heroSection";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

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
    setError("");

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(result.data);

      setSuccess(true);
      setError("");
      setEmail("");
      setPassword("");
      setLoading(false);

      if (!data.member) {
        setTimeout(() => {
          router.push("/dashboards/common");
        }, 1000);

        return;
      }

      const userRole = data.member.role;
      const userID = data.user.id;

      if (userRole === "manager") {
        setTimeout(() => {
          router.push(`/dashboards/manager/${userID}`);
        }, 1000);
      } else if (userRole === "member") {
        setTimeout(() => {
          router.push(`/dashboards/member/${userID}`);
        }, 1000);
      }
    } catch (error: any) {
      console.log(error);
      setSuccess(false);

      const errorMessage = error.message || "Invalid email or password";
      setError(errorMessage);
    }
  };

  return (
    <>
      <HeroSection />

      <div className="min-h-screen flex items-center justify-center bg-white px-[8%]">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
          <h2 className="text-3xl font-extrabold text-center mb-2 tracking-tight">
            Login
          </h2>

          <p className="text-slate-500 text-sm text-center mb-8">
            Access your Mess Management dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {success && (
              <div className="fixed inset-x-0 top-6 flex justify-center z-50">
                <div
                  className="bg-green-50 border border-green-200 
                    text-green-700 px-6 py-3 rounded-xl 
                    shadow-md animate-fadeIn"
                >
                  Login successful! Redirecting...
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
              <label className="block text-sm font-semibold mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 pl-10 
                       focus:outline-none focus:ring-2 focus:ring-blue-600 
                       focus:border-blue-600 transition"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "Text" : "password"}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 pl-10 
                       focus:outline-none focus:ring-2 focus:ring-blue-600 
                       focus:border-blue-600 transition"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link
                href="/auth/forgetPassword"
                className="text-blue-600 font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold 
             hover:bg-slate-900 transition flex items-center justify-center gap-2
             disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && (
                <span
                  className="w-4 h-4 border-2 border-white border-t-transparent 
                     rounded-full animate-spin"
                ></span>
              )}
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-sm text-slate-500">
              Don’t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
