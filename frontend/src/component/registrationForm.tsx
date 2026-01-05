"use client";
import { FormEvent, useState } from "react";
import * as z from "zod";
import { createUser } from "@/services/user.registration";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z
    .string("Name has to be a string value")
    .min(1, "Name is required")
    .max(200, "Name length can't be greater then 200")
    .regex(/^[A-Za-z ]+$/, "Name can't contain any number"),

  email: z
    .string("Email has to be a string value")
    .min(1, "Email is required")
    .regex(
      /^[a-z0-9.]+@gmail.com$/,
      "Email must contain @gmail.com at the end and all the character should be in lower case"
    ),

  password: z
    .string("Password has to be a string value")
    .min(1, "Password is required")
    .regex(
      /^.*(?=[@#$&]).*$/,
      "Password must contain any of this (@ or # or $ or &) speical characters"
    ),

  nid: z
    .string("NID has to be a string value")
    .min(1, "NID is required")
    .regex(/^\d{14}$/, "Nid must contain 14 digits & only numbers"),

  phone: z
    .string("Phone Number has to be a string value")
    .min(1, "Phone Number is required")
    .max(11, "Phone number should be only 11 digits")
    .regex(
      /^01[0-9]+$/,
      "Phone number should only contain numbers & should start with 01"
    ),
});

export default function RegistrationForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nid, setNid] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const route = useRouter();

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
      const response = await createUser(result.data);

      setSuccess(true);
      setError("");
      console.log(response);

      setName("");
      setEmail("");
      setPassword("");
      setNid("");
      setPhone("");

      setTimeout(() => {
        route.push("../auth/login");
      }, 3000);
    } catch (error) {
      console.error(error);
      setSuccess(false);
      setError("Registration failed");
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-8 shadow-xl"
        >
          <h2 className="text-center text-3xl font-bold mb-4">Register</h2>

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
                <span>User registered successfully!</span>
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

          <label htmlFor="name" className="label font-bold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="input input-bordered w-full"
            placeholder="MD. Al Amin"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email" className="label font-bold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input input-bordered w-full"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="label font-bold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input input-bordered w-full"
            placeholder="example@"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="nid" className="label font-bold">
            NID:
          </label>
          <input
            type="text"
            id="nid"
            name="nid"
            className="input input-bordered w-full"
            placeholder="12345678912345"
            value={nid}
            onChange={(e) => setNid(e.target.value)}
          />

          <label htmlFor="phone" className="label font-bold">
            Phone Number:
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="input input-bordered w-full"
            placeholder="01712345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button className="btn btn-neutral mt-6 w-full" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
