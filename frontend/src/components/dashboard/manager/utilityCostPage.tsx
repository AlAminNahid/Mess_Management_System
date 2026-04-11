"use client";

import { FormEvent, useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { useDashboard } from "../dashboardContext";
import { addUtilityCost } from "@/services/dashboard/manager.utilityCost";

export default function UtilityCostPage() {
  const { utilityCost, messID } = useDashboard();

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [rent, setRent] = useState<number | null>(null);
  const [internet, setInternet] = useState<number | null>(null);
  const [electricity, setElectricity] = useState<number | null>(null);
  const [maid, setMaid] = useState<number | null>(null);
  const [gas, setGas] = useState<number | null>(null);

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const resetForm = () => {
    setRent(null);
    setInternet(null);
    setElectricity(null);
    setMaid(null);
    setGas(null);
    setEditingIndex(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      await addUtilityCost({
        mess_id: messID,
        rent: Number(rent),
        internet: Number(internet),
        electricity: Number(electricity),
        maid: Number(maid),
        gas: Number(gas),
      });

      setSuccess(true);
      resetForm();
    } catch (error: any) {
      setSuccess(false);
      const errorMessage = error.message || "Can't insert information";
      setError(errorMessage);
    }
  };

  const handleEdit = (index: number) => {
    const item = utilityCost[index];

    setRent(item.rent);
    setInternet(item.internet);
    setElectricity(item.electricity);
    setMaid(item.maid);
    setGas(item.gas);

    setEditingIndex(index);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-[8%] py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold">Utility Cost</h1>
          <p className="text-slate-500 text-sm">
            Manage monthly utility expenses of the mess.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-8 mb-10 shadow-sm">
          <h2 className="text-lg font-semibold mb-6">
            {editingIndex !== null ? "Edit Utility Cost" : "Add Utility Cost"}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <input
              placeholder="Rent"
              className="input input-bordered"
              value={rent ?? ""}
              onChange={(e) => setRent(Number(e.target.value))}
            />

            <input
              placeholder="Internet"
              className="input input-bordered"
              value={internet ?? ""}
              onChange={(e) => setInternet(Number(e.target.value))}
            />

            <input
              placeholder="Electricity"
              className="input input-bordered"
              value={electricity ?? ""}
              onChange={(e) => setElectricity(Number(e.target.value))}
            />

            <input
              placeholder="Maid"
              className="input input-bordered"
              value={maid ?? ""}
              onChange={(e) => setMaid(Number(e.target.value))}
            />

            <input
              placeholder="Gas"
              className="input input-bordered"
              value={gas ?? ""}
              onChange={(e) => setGas(Number(e.target.value))}
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button type="submit" className="btn btn-neutral">
              {editingIndex !== null ? "Update Utility" : "Add Utility"}
            </button>

            {editingIndex !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-outline"
              >
                Cancel
              </button>
            )}
          </div>

          {success && (
            <p className="text-green-500 mt-3">Utility added successfully</p>
          )}
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Rent</th>
                <th>Internet</th>
                <th>Electricity</th>
                <th>Maid</th>
                <th>Gas</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody>
              {utilityCost.map((item, index) => (
                <tr key={index}>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>৳ {item.rent}</td>
                  <td>৳ {item.internet}</td>
                  <td>৳ {item.electricity}</td>
                  <td>৳ {item.maid}</td>
                  <td>৳ {item.gas}</td>

                  <td>
                    <button
                      type="button"
                      onClick={() => handleEdit(index)}
                      className="btn btn-sm btn-outline"
                    >
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </form>
  );
}
