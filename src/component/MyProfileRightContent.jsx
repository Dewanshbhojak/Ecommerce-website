import React, { useState } from "react";
import { Save } from "lucide-react";

const MyProfileRightContent = (props) => {
  const [profile, setProfile] = useState({
    userName: "",
    email: "",
    Phone: "",
    userEmail: "",
    dob: "",
    gender: "",
  });
  const handleChange = (e) => {
    setProfile({
      ...props,

      [e.target.name]: e.target.value,
    });
  };
  const saveProfile = async () => {
    try {
      await updateProfile(profile);

      alert("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <div className="grid grid-cols-12 gap-8 mt-8 max-w-7xl">
    <div className="col-span-9">
      <div className="bg-white rounded-3xl shadow-sm border p-8">
        <h2 className="text-3xl font-bold">Personal Information</h2>

        <p className="text-gray-500 mt-2">Update your personal details.</p>

        <hr className="my-8" />

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="font-medium text-gray-600">Full Name</label>

            <input
              type="text"
              name="userName"
              value={profile.userName}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-4 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="font-medium text-gray-600">Phone Number</label>

            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-4 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="col-span-2">
            <label className="font-medium text-gray-600">Email Address</label>

            <input
              type="email"
              value={profile.userEmail}
              readOnly
              className="w-full mt-2 border rounded-xl bg-gray-100 p-4"
            />
          </div>

          <div>
            <label className="font-medium text-gray-600">Date of Birth</label>

            <input
              type="date"
              name="dob"
              value={profile.dob || ""}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-4 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="font-medium text-gray-600">Gender</label>

            <select
              name="gender"
              value={profile.gender || "Male"}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-4 outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <button
            onClick={saveProfile}
            className="bg-black text-white px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-gray-800 transition"
          >
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default MyProfileRightContent;
