"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import JoinMess from "@/services/user.joinMess";
import JoinMessButton from "@/components/mess/joinMessButton";

interface Mess {
  id: number;
  name: string;
  address: string;
}

interface JoinMessProps {
  messes: Mess[];
}

export default function Messtable({ messes }: JoinMessProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMess, setSelectedMess] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const filteredMesses = messes.filter(
    (mess) =>
      mess.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mess.address.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleJoin = async () => {
    if (!selectedMess) return;

    try {
      setLoading(true);

      await JoinMess(selectedMess);

      console.log("Selected Mess ID:", selectedMess);

      setSuccess(true);
      setError("");
      setLoading(false);

      setTimeout(() => {
        router.push("/auth/login");
      }, 1200);
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Failed to join mess");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white px-[8%] py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">
            Available <span className="text-blue-600">Messes</span>
          </h1>
          <p className="text-slate-500">
            Find and join the mess that suits you.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search by mess name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-slate-300 rounded-xl 
                       pl-12 pr-4 py-3 
                       focus:outline-none focus:ring-2 focus:ring-blue-600 
                       focus:border-blue-600 transition"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMesses.length === 0 ? (
            <div className="col-span-full text-center py-16 text-slate-500">
              No matching mess found.
            </div>
          ) : (
            filteredMesses.map((mess, index) => (
              <div
                key={mess.id}
                className="group bg-white border border-slate-200 
                         rounded-2xl p-8 shadow-sm 
                         hover:shadow-xl hover:-translate-y-2 
                         transition-all duration-300"
              >
                <span
                  className="inline-block mb-4 text-xs font-bold 
                               bg-blue-100 text-blue-700 
                               px-3 py-1 rounded-full"
                >
                  #{index + 1}
                </span>

                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition">
                  {mess.name}
                </h3>

                <p className="text-slate-500 text-sm mb-6">{mess.address}</p>

                <div className="flex justify-end">
                  <JoinMessButton onClick={() => setSelectedMess(mess.id)} />
                </div>
              </div>
            ))
          )}
        </div>

        {selectedMess && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSelectedMess(null)}
            ></div>

            <div
              className="relative bg-white w-full max-w-md 
                          rounded-2xl shadow-2xl p-8 animate-fadeIn"
            >
              <h2 className="text-xl font-bold mb-3">Confirm Join</h2>

              <p className="text-slate-600 mb-6">
                Are you sure you want to join this mess?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedMess(null)}
                  className="px-4 py-2 rounded-lg border border-slate-300 
                           hover:bg-slate-100 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleJoin}
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-black text-white 
                           hover:bg-slate-900 transition 
                           flex items-center gap-2"
                >
                  {loading && (
                    <span
                      className="w-4 h-4 border-2 border-white 
                                   border-t-transparent rounded-full 
                                   animate-spin"
                    ></span>
                  )}
                  {loading ? "Joining..." : "Yes, Join"}
                </button>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="fixed inset-x-0 top-6 flex justify-center z-[999]">
            <div
              className="bg-green-50 border border-green-200 
                          text-green-700 px-6 py-3 rounded-xl 
                          shadow-md animate-fadeIn"
            >
              Successfully joined! Redirecting...
            </div>
          </div>
        )}

        {error && (
          <div className="fixed inset-x-0 top-6 flex justify-center z-[999]">
            <div
              className="bg-red-50 border border-red-200 
                          text-red-700 px-6 py-3 rounded-xl 
                          shadow-md animate-fadeIn"
            >
              {error}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
