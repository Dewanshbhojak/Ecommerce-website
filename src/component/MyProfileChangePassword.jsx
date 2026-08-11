import React from "react";

const MyProfileChangePassword = () => {
  return (
    <div className="col-span-9">
      <div className="bg-white rounded-3xl shadow-sm border p-8">
        <h2 className="text-3xl font-bold">Password & Security</h2>

        <p className="text-gray-500 mt-2">
          Keep your account secure with a strong. unique password.
        </p>

        <hr className="my-8" />
        <div className=" grid grid-rows">
          <label
            htmlFor="new_password"
            className="text-gray-600 font-medium mb-2"
          >
            New Password
          </label>
          <input
            id="new_password"
            type="password"
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black bg-stone-300 mb-3"
            placeholder="Enter the Password"
          />
          <label
            htmlFor="current_password"
            className="text-gray-600 font-medium mb-2"
          >
            Confirm Password
          </label>
          <input
            id="current_password"
            type="password"
            className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black bg-stone-300"
            placeholder="Enter the Password"
          />
        </div>
        <div className="flex justify-end mt-10">
          <button className="bg-black text-white w-40 rounded-xl h-10 ">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfileChangePassword;
