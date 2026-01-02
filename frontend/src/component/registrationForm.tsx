"use client";
import { FormEvent, useState } from "react";
import * as z from "zod";

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const result = registerSchema.safeParse({
      name,
      email,
      password,
      nid,
      phone,
    });

    if (!result.success) {
      setError(result.error.message);
      alert(`The error is ${result.error}`);
      return;
    }

    alert(
      `The input Name: ${result.data.name}, Email: ${result.data.email}, Password: ${result.data.password}, Phone: ${result.data.phone}`
    );
    setName("");
    setEmail("");
    setPassword("");
    setNid("");
    setPhone("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br />

        <div>
          <label htmlFor="email">Email: </label>
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
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />

        <div>
          <label htmlFor="nid">NID: </label>
          <input
            type="text"
            id="nid"
            name="nid"
            value={nid}
            onChange={(e) => setNid(e.target.value)}
          />
        </div>
        <br />

        <div>
          <label htmlFor="phone">Phone Number: </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
