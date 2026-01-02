"use client";
import { FormEvent, useState } from "react";
import * as z from "zod";

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setError(result.error.message);
      alert(`The error is ${result.error}`);
      return;
    }

    alert(
      `The input Email : ${result.data.email} & Password : ${result.data.password}`
    );
    setEmail("");
    setPassword("");
    setError("");
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
          className="input input-bordered w-full" /* Added border & width */
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password" className="label mt-4 font-bold">
          Password :
        </label>
        <input
          type="password"
          id="password"
          className="input input-bordered w-full" /* Added border & width */
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Display the error message if it exists */}
        {error && <p className="text-error text-sm mt-2">{error}</p>}

        <button className="btn btn-neutral mt-6 w-full" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
