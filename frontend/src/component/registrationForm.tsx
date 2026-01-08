"use client";
import { FormEvent, useState } from "react";
import { createUser } from "@/services/user.registration";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/validation/registerSchema";

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
        route.push("/auth/login");
      }, 1000);
    } catch (error: any) {
      console.log(error);
      setSuccess(false);

      const errorMessage = error.message || "An unexpected error occured";
      setError(errorMessage);
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
            placeholder="Enter your name here"
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
            placeholder="Enter your email here"
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
            placeholder="Enter your password here"
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
            placeholder="Enter your NID number here"
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
            placeholder="Enter your phone number here"
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
