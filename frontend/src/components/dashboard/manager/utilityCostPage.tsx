"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

export default function UtilityCostPage() {
  const [utilities, setUtilities] = useState([
    {
      month: "March 2026",
      rent: 15000,
      internet: 1000,
      electricity: 2500,
      maid: 2000,
      gas: 1200,
    },
  ]);

  const [form, setForm] = useState({
    month: "",
    rent: "",
    internet: "",
    electricity: "",
    maid: "",
    gas: "",
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (editingIndex !== null) {
      const updated = [...utilities];
      updated[editingIndex] = form as any;
      setUtilities(updated);
      setEditingIndex(null);
    } else {
      setUtilities([...utilities, form as any]);
    }

    setForm({
      month: "",
      rent: "",
      internet: "",
      electricity: "",
      maid: "",
      gas: "",
    });
  };

  const handleEdit = (index: number) => {
    setForm(utilities[index] as any);
    setEditingIndex(index);
  };

  const resetForm = () => {
    setForm({
      month: "",
      rent: "",
      internet: "",
      electricity: "",
      maid: "",
      gas: "",
    });

    setEditingIndex(null);
  };

  return (
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
            placeholder="Month (e.g. March 2026)"
            className="input input-bordered"
            value={form.month}
            onChange={(e) => handleChange("month", e.target.value)}
          />

          <input
            placeholder="Rent"
            className="input input-bordered"
            value={form.rent}
            onChange={(e) => handleChange("rent", e.target.value)}
          />

          <input
            placeholder="Internet"
            className="input input-bordered"
            value={form.internet}
            onChange={(e) => handleChange("internet", e.target.value)}
          />

          <input
            placeholder="Electricity"
            className="input input-bordered"
            value={form.electricity}
            onChange={(e) => handleChange("electricity", e.target.value)}
          />

          <input
            placeholder="Maid"
            className="input input-bordered"
            value={form.maid}
            onChange={(e) => handleChange("maid", e.target.value)}
          />

          <input
            placeholder="Gas"
            className="input input-bordered"
            value={form.gas}
            onChange={(e) => handleChange("gas", e.target.value)}
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={handleSubmit} className="btn btn-neutral">
            {editingIndex !== null ? "Update Utility" : "Add Utility"}
          </button>

          {editingIndex !== null && (
            <button onClick={resetForm} className="btn btn-outline">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Rent</th>
              <th>Internet</th>
              <th>Electricity</th>
              <th>Maid</th>
              <th>Gas</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {utilities.map((item, index) => (
              <tr key={index}>
                <td>{item.month}</td>
                <td>৳ {item.rent}</td>
                <td>৳ {item.internet}</td>
                <td>৳ {item.electricity}</td>
                <td>৳ {item.maid}</td>
                <td>৳ {item.gas}</td>

                <td>
                  <button
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
  );
}
