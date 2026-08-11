import { useEffect, useState } from "react";
import {
  User,
  Lock,
  MapPin,
  CreditCard,
  Bell,
  SlidersHorizontal,
  Package,
  LogOut,
  Mail,
  Calendar,
  Heart,
  Save,
} from "lucide-react";

import { getProfile } from "../Services/UserProfile";
import { useNavigate } from "react-router-dom";
import MyProfileRightContent from "../component/MyProfileRightContent";
import MyProfileChangePassword from "../component/MyProfileChangePassword";
import MyProfilePreferences from "../component/MyProfilePreferences";
import Navbar from "../component/Navbar";

const MyProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [rightContent, setRightContent] = useState("PersonalInformation");

  const [profile, setProfile] = useState({
    userName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    createdAt: "",
    totalOrders: 0,
    totalWishlist: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      console.log(response.data);
      setProfile(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,

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

  if (loading) {
    return (
        
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-5">
        {/* HEADER */}

        <div className="bg-white rounded-3xl shadow-sm border p-8 flex justify-between items-center">
          <div className="flex gap-6 items-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex justify-center items-center text-4xl font-bold">
              {profile.userName?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-4xl font-bold">{profile.userName}</h1>

              <p className="text-gray-500 flex gap-2 items-center mt-2">
                <Mail size={18} />

                {profile.userEmail}
              </p>

              <p className="text-gray-400 mt-2">
                Member Since {new Date(profile.createdAt).getFullYear()}
              </p>
            </div>
          </div>

          <div className="flex gap-14">
            <div className="text-center">
              <Package className="mx-auto" />

              <h2 className="font-bold text-2xl">{profile.quantity}</h2>

              <p className="text-gray-500">Orders</p>
            </div>

            <div className="text-center">
              <Heart className="mx-auto" />

              <h2 className="font-bold text-2xl">
                {profile.totalWishlist || 0}
              </h2>

              <p className="text-gray-500">Wishlist</p>
            </div>

            <div className="text-center">
              <Calendar className="mx-auto" />

              <h2 className="font-bold text-2xl">
                {profile.totalReviews || 0}
              </h2>

              <p className="text-gray-500">Reviews</p>
            </div>

            <div className="text-center">
              <User className="mx-auto" />

              <h2 className="font-bold text-2xl">
                {new Date(profile.createdAt).getFullYear()}
              </h2>

              <p className="text-gray-500">Member Since</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 mt-8">
          {/* LEFT SIDEBAR */}

          <div className="col-span-3">
            <div className="bg-white rounded-3xl shadow-sm border p-5">
              <button
                onClick={() => setRightContent("PersonalInformation")}
                className={`flex items-center gap-3 w-full rounded-xl px-5 py-3 transition ${
                  rightContent === "PersonalInformation"
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <User />
                Personal Information
              </button>
              <button
                onClick={() => setRightContent("PasswordSecurity")}
                className={`flex items-center gap-3 w-full rounded-xl px-5 py-3 transition ${
                  rightContent === "PasswordSecurity"
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <Lock />
                Password & Security
              </button>

            

              <button
                onClick={() => setRightContent("Preferences")}
                className={`flex items-center gap-3 w-full rounded-xl px-5 py-3 transition ${
                  rightContent === "Preferences"
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <SlidersHorizontal />
                Preferences
              </button>

              <hr className="my-5" />

              <button
                onClick={() => navigate("/my-order")}
                className="flex items-center gap-3 w-full px-5 py-3 hover:bg-gray-100 rounded-xl"
              >
                <Package />
                My Orders
              </button>

              <button className="flex items-center gap-3 w-full px-5 py-3 text-red-600 hover:bg-red-50 rounded-xl">
                <LogOut />
                Logout
              </button>
            </div>
          </div>
          {rightContent === "PersonalInformation" && <MyProfileRightContent />}
          {rightContent === "PasswordSecurity" && <MyProfileChangePassword />}
          {rightContent === "Preferences" && <MyProfilePreferences/>}
        </div>
      </div>
    </div>
    </>
  );
};

export default MyProfile;
