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

      if (!data.member) {
        router.push("../dashboards/common");
      } else {
        router.push("../dashboards/manager");
      }
    } catch (error: any) {
      const errorMessage = error.message || "Login failed, Please try again";
      setError(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-8 shadow-xl"
      >
        <h2 className="text-center text-3xl font-bold mb-4">Login</h2>

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

        {error && <p>{error}</p>}

        <button className="btn btn-neutral mt-6 w-full" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
