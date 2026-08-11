import api from "../api/axiosConfig";

export const getAllProducts = async () => {
  return api.get("/products");
};

export const getProductById = async (id) => {
  return api.get(`/products/${id}`);
};

export const getProductsByCategory = async (categoryName) => {
  return api.get(`/products/category/${encodeURIComponent(categoryName)}`);
};

export const getNewArrivals = async () => {
  return api.get("/products/new");
};

export const getBestSellers = async () => {
  return api.get("/products/best");
};

export const searchProducts = async (query) => {
  return api.get(`/products/search?query=${encodeURIComponent(query)}`);
};
