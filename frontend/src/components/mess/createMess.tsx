"use client";
import { createMess } from "@/services/user.createMess";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { messSchema } from "@/validation/messSchema";

export default function CreateMess() {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const result = messSchema.safeParse({ name, address });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      const data = await createMess(result.data);

      setSuccess(true);
      setError("");
      setName("");
      setAddress("");

      setTimeout(() => {
        router.push("/auth/login");
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
      <div className="min-h-screen flex items-center justify-center bg-white px-[8%] py-16">
        <div
          className="w-full max-w-lg bg-white border border-slate-200 
                    rounded-2xl shadow-sm p-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">
              Create a New Mess
            </h2>
            <p className="text-slate-500 text-sm">
              Set up your mess and start managing meals efficiently
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Mess Name
              </label>
              <input
                type="text"
                className="w-full border border-slate-300 rounded-xl px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-blue-600
                       focus:border-blue-600 transition"
                placeholder="Anvir Neighbours"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Address
              </label>
              <input
                type="text"
                className="w-full border border-slate-300 rounded-xl px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-blue-600
                       focus:border-blue-600 transition"
                placeholder="Bashundhara G Block"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl 
                     font-semibold hover:bg-slate-900 
                     transition duration-200"
            >
              Create Mess
            </button>
          </form>
        </div>
      </div>

      {success && (
        <div className="fixed inset-x-0 top-6 flex justify-center z-50">
          <div
            className="bg-green-50 border border-green-200 
                      text-green-700 px-6 py-3 rounded-xl 
                      shadow-md animate-fadeIn"
          >
            Mess created successfully!
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
    </>
  );
}
