"use client";
import { FormEvent, useState } from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/user.login";

const loginSchema = z.object({
  email: z
    .string("It is not a String")
    .min(1, "Email is required")
    .email("Invalid Email Address"),

  password: z
    .string("It is not a String")
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 character"),
});

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      const data = await loginUser(result.data);

      setSuccess(true);
      setError("");
      setEmail("");
      setPassword("");

      if (!data.member) {
        setTimeout(() => {
          router.push("../dashboards/common");
        }, 1000);

        return;
      }

      const userRole = data.member.role;

      if (userRole === "manager") {
        setTimeout(() => {
          router.push("../dashboards/manager");
        }, 1000);
      } else if (userRole === "member") {
        setTimeout(() => {
          router.push("../dashboards/member");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setError("login failed");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-8 shadow-xl"
      >
        <h2 className="text-center text-3xl font-bold mb-4">Login</h2>

        <div className="mb-4">
          {success && (
            <div role="alert" className="alert alert-success shadow-lg mb-2">
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
              <span>User login successfully!</span>
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

        <label htmlFor="email" className="label font-bold">
          Email :
        </label>
        <input
          type="email"
          id="email"
          className="input input-bordered w-full"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password" className="label mt-4 font-bold">
          Password :
        </label>
        <input
          type="password"
          id="password"
          className="input input-bordered w-full"
          placeholder="example@"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral mt-6 w-full" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
