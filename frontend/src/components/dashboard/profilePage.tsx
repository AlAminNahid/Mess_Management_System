"use client";

import { useState } from "react";
import { Mail, Phone, CreditCard, User } from "lucide-react";
import { useDashboard } from "@/components/dashboard/dashboardContext";

export default function ProfilePage() {
  const { role, userName, userEmail, userNID, userPhone } = useDashboard();

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(userName);
  const [phone, setPhone] = useState(userPhone);
  const [nid, setNid] = useState(userNID);

  const avatarPreview = `https://ui-avatars.com/api/?name=${
    editing ? name : userName
  }&background=0D8ABC&color=fff`;

  console.log(userName);

  const handleSave = () => {
    console.log("Saving to DB:", { name, phone, nid });

    // TODO: call your API / server action here

    setEditing(false);
  };

  const handleCancel = () => {
    setName(userName);
    setPhone(userPhone);
    setNid(userNID);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-white px-[8%] py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">User Profile</h1>
      </div>

      <div className="w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div className="flex items-center gap-6">
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-24 h-24 rounded-full border"
            />

            <div>
              <h2 className="text-2xl font-bold">
                {editing ? name : userName}
              </h2>

              <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {role}
              </span>
            </div>
          </div>

          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="btn btn-neutral"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Email */}
          <div className="flex items-start gap-4">
            <Mail className="text-blue-600 mt-1" size={20} />
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-semibold">{userEmail}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <Phone className="text-green-600 mt-1" size={20} />
            <div className="w-full">
              <p className="text-sm text-slate-500">Phone</p>

              {editing ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input input-bordered w-full"
                />
              ) : (
                <p className="font-semibold">{userPhone}</p>
              )}
            </div>
          </div>

          {/* NID */}
          <div className="flex items-start gap-4">
            <CreditCard className="text-purple-600 mt-1" size={20} />
            <div className="w-full">
              <p className="text-sm text-slate-500">NID Number</p>

              {editing ? (
                <input
                  type="text"
                  value={nid}
                  onChange={(e) => setNid(e.target.value)}
                  className="input input-bordered w-full"
                />
              ) : (
                <p className="font-semibold">{userNID}</p>
              )}
            </div>
          </div>

          {/* Full Name */}
          <div className="flex items-start gap-4">
            <User className="text-orange-600 mt-1" size={20} />
            <div className="w-full">
              <p className="text-sm text-slate-500">Full Name</p>

              {editing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full"
                />
              ) : (
                <p className="font-semibold">{userName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        {editing && (
          <div className="mt-10 flex gap-4">
            <button onClick={handleSave} className="btn btn-neutral">
              Save Changes
            </button>

            <button onClick={handleCancel} className="btn btn-outline">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
