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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email : </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br />

      <div>
        <label htmlFor="password">Password : </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />

      <button type="submit">Login</button>
    </form>
  );
}
