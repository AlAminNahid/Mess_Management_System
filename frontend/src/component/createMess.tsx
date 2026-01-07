"use client";
import { createMess } from "@/services/user.createMess";
import { FormEvent, useState } from "react";
import { messSchema } from "@/validation/messSchema";

export default function CreateMess() {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const result = messSchema.safeParse({ name, address });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      await createMess(result.data);

      setSuccess(true);
      setError("");
      setName("");
      setAddress("");
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
          <h2 className="text-center text-3xl font-bold mb-4">Create Mess</h2>

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
                <span>Mess create successfully!</span>
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
            placeholder="Anvir Neighbours"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="address" className="label font-bold">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="input input-bordered w-full"
            placeholder="Bashundhara G Block"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button className="btn btn-neutral mt-6 w-full" type="submit">
            Create
          </button>
        </form>
      </div>
    </>
  );
}
