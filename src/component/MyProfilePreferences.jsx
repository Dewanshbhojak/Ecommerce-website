import React, { useState } from "react";

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    currency: "USD",
    theme: "System Default",
  });

  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });
  };

  const savePreferences = () => {
    console.log(preferences);
    alert("Preferences Updated Successfully");
  };

  const deleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete your account?"
    );

    if (confirmDelete) {
      console.log("Delete Account");
      // Call delete account API here
    }
  };

  return (
    <div className="col-span-9">
      <div className="bg-white rounded-3xl shadow-sm border p-8">

        {/* Heading */}

        <h2 className="text-3xl font-bold">
          Preferences
        </h2>

        <p className="text-gray-500 mt-2">
          Customize your currency and display settings.
        </p>

        <hr className="my-8" />

        {/* Settings */}

        <div className="grid md:grid-cols-2 gap-8">

          {/* Currency */}

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Currency
            </label>

            <select
              name="currency"
              value={preferences.currency}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="USD">USD — US Dollar</option>
              <option value="INR">INR — Indian Rupee</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
            </select>
          </div>

          {/* Theme */}

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Theme
            </label>

            <select
              name="theme"
              value={preferences.theme}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option>System Default</option>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>

        </div>

        {/* Danger Zone */}

        <div className="mt-12 border border-red-300 bg-red-50 rounded-2xl p-6">

          <h3 className="text-red-600 text-xl font-semibold">
            Danger Zone
          </h3>

          <p className="text-gray-600 mt-2">
            Permanently delete your account and all associated data.
            This action cannot be undone.
          </p>

          <button
            onClick={deleteAccount}
            className="mt-6 border border-red-500 text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-100 transition"
          >
            Delete My Account
          </button>

        </div>

        {/* Save */}

        <div className="flex justify-end mt-10">
          <button
            onClick={savePreferences}
            className="bg-black text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default Preferences;