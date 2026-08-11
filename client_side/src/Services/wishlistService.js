import api from "../api/axiosConfig";

export const getWishlist = async () => {
  return api.get("/wishlist");
};

export const addToWishlist = async (productId) => {
  return api.post(`/wishlist?productId=${productId}`);
};

export const removeFromWishlist = async (productId) => {
  return api.delete(`/wishlist/${productId}`);
};
