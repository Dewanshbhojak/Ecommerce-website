import api from "../api/axiosConfig";

export const getCategories = async () => {
  return api.get("/categories");
};

export const getCategoryById = async (id) => {
  return api.get(`/categories/${id}`);
};
