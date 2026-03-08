"use client";

import { useState } from "react";
import { Mail, Phone, CreditCard, User } from "lucide-react";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);

  const [user, setUser] = useState({
    name: "Al Amin Hossain Nahid",
    email: "alamin@gmail.com",
    nid: "1234567890",
    phone: "01712345678",
    role: "Manager",
    avatar: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(
    `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`,
  );

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);
  };

  const handleChange = (field: string, value: string) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setEditing(false);

    // here you can call backend API
    console.log("Updated user:", user);
  };

  return (
    <div className="min-h-screen bg-white px-[8%] py-10">
      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">User Profile</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage and view your personal account information.
        </p>
      </div>

      {/* Profile Container */}
      <div className="w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src={avatarPreview}
                alt="avatar"
                className="w-24 h-24 rounded-full border object-cover"
              />

              <label className="absolute bottom-0 right-0 bg-black text-white p-1 rounded-full cursor-pointer">
                📷
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>
            </div>

            {/* Name + Role */}
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>

              <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {user.role}
              </span>
            </div>
          </div>

          {/* Edit Button */}
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="btn btn-neutral mt-6 md:mt-0"
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

            <div className="w-full">
              <p className="text-sm text-slate-500">Email</p>

              <p className="font-semibold">{user.email}</p>
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
                  value={user.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="input input-bordered w-full mt-1"
                />
              ) : (
                <p className="font-semibold">{user.phone}</p>
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
                  value={user.nid}
                  onChange={(e) => handleChange("nid", e.target.value)}
                  className="input input-bordered w-full mt-1"
                />
              ) : (
                <p className="font-semibold">{user.nid}</p>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="flex items-start gap-4">
            <User className="text-orange-600 mt-1" size={20} />

            <div className="w-full">
              <p className="text-sm text-slate-500">Full Name</p>

              {editing ? (
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="input input-bordered w-full mt-1"
                />
              ) : (
                <p className="font-semibold">{user.name}</p>
              )}
            </div>
          </div>
        </div>

        {/* Save Section */}
        {editing && (
          <div className="mt-10 flex gap-4">
            <button onClick={handleSave} className="btn btn-neutral">
              Save Changes
            </button>

            <button
              onClick={() => setEditing(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
