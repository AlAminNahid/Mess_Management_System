"use client";
import { FormEvent, useState } from "react";
import * as z from "zod";
import { createUser } from "@/services/user.registration";

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
  const [error, setError] = useState<string>("");

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
      alert("User registered successfully");
      console.log(response);

      setName("");
      setEmail("");
      setPassword("");
      setNid("");
      setPhone("");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
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

          <label htmlFor="name" className="label font-bold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="input input-bordered w-full"
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {error && <p>{error}</p>}

          <button className="btn btn-neutral mt-6 w-full" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
