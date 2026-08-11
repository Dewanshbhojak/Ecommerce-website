import api from "../api/axiosConfig";

export const getCartItems = () => {
  return api.get("/cart/getCart");
};

export const updateQuantity = (productId, quantity) => {
  return api.put(`/cart/updateCart?productId=${productId}&quantity=${quantity}` ,{
            
            credentials: "include"
          });
};

export const removeItem = (productId) => {
  return api.delete(`/cart/deleteCart?productId=${productId}`,{
    credentials:"include"
  });
};

export const checkout = () => {
  return api.post("/orders/checkout",{
    credentials:"include",
  });
};


export const verifyPayment = async (data) => {
  return api.post(
    "/orders/verify",
    data,
    {
      withCredentials: true
    }
  );
};