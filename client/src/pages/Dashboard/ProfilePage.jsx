import React, { useEffect, useRef, useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/UserContext";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const [form, setForm] = useState({ fullName: "", email: "" });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef(null);
  const navigate = useNavigate();

  // Base URL for images
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.PROFILE.GET_PROFILE);
        const data = res.data;
        setForm({
          fullName: data.fullName || "",
          email: data.email || "",
        });

        // Ensure full image URL
        if (data.profileImageUrl) {
          setAvatarPreview(
            data.profileImageUrl.startsWith("http")
              ? data.profileImageUrl
              : `${BASE_URL}${data.profileImageUrl}`
          );
        }

        updateUser(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let profileImageUrl = user?.profileImageUrl || null;
      const file = fileRef.current?.files?.[0];

      // Upload avatar if selected
      if (file) {
        const formData = new FormData();
        formData.append("avatar", file);
        const uploadRes = await axiosInstance.post(
          API_PATHS.PROFILE.UPLOAD_IMAGE,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        const uploadedUrl =
          uploadRes?.data?.profileImageUrl ||
          uploadRes?.data?.avatarUrl ||
          uploadRes?.data?.url ||
          uploadRes?.data?.path;

        if (uploadedUrl) {
          profileImageUrl = uploadedUrl.startsWith("http")
            ? uploadedUrl
            : `${BASE_URL}${uploadedUrl}`;
        } else {
          console.warn("No avatar URL returned from server:", uploadRes.data);
        }
      }

      // Update user info
      const payload = { fullName: form.fullName, profileImageUrl };
      const res = await axiosInstance.put(
        API_PATHS.PROFILE.UPDATE_PROFILE,
        payload
      );

      updateUser(res.data);
      setAvatarPreview(
        res.data.profileImageUrl?.startsWith("http")
          ? res.data.profileImageUrl
          : `${BASE_URL}${res.data.profileImageUrl}`
      );

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = () => {
    clearUser();
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-md bg-gray-100">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-3xl text-gray-400">
                  {form.fullName ? form.fullName[0].toUpperCase() : "U"}
                </div>
              )}
            </div>
            <label className="absolute bottom-1 right-1 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 shadow cursor-pointer transition">
              <input
                ref={fileRef}
                onChange={handleFile}
                type="file"
                accept="image/*"
                className="hidden"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7.414A2 2 0 0016.586 6L13 2.414A2 2 0 0011.586 2H4z" />
              </svg>
            </label>
          </div>

          <div className="flex-1 w-full">
            <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
            <p className="text-sm text-gray-500 mt-1">
              Joined on{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "—"}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow transition"
            >
              Back to Dashboard
            </button>
            <button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="my-6 border-t border-gray-200" />

        <form onSubmit={saveProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              disabled
              className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-2 rounded-lg text-white shadow-md ${
                saving
                  ? "bg-purple-300 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
