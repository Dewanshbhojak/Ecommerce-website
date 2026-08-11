import api from "../api/axiosConfig";

export const sendOtp = async (email) => {
  return api.post("/auth/send-otp", { email });
};

export const verifyOtp = async (email, otp) => {
  return api.post("/auth/verify-otp", { email, otp });
};

export const registerUser = async (data) => {
  return api.post("/users/register", data);
};

export const logoutUser = async () => {
  return api.post("/users/logout");
};

export const getProfile = async () => {
  return api.get("/users/myprofile");
};
