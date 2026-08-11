import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCartItems, updateQuantity, removeItem as removeItemApi } from "../Services/CartServices";
import api from "../api/axiosConfig";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }
    setLoading(true);
    try {
      const response = await getCartItems();
      if (response.data && Array.isArray(response.data.body)) {
        setCartItems(response.data.body);
      } else if (Array.isArray(response.data)) {
        setCartItems(response.data);
      } else {
        const localCart = localStorage.getItem("vibe_cart");
        setCartItems(localCart ? JSON.parse(localCart) : []);
      }
    } catch (e) {
      const localCart = localStorage.getItem("vibe_cart");
      setCartItems(localCart ? JSON.parse(localCart) : []);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (product, qty = 1) => {
    const productId = product.productId || product.id || product.product?.productId;
    if (isAuthenticated) {
      try {
        await api.post(`/cart/add?productId=${productId}&quantity=${qty}`);
        await fetchCart();
        return true;
      } catch (err) {
        console.log("Cart add API error, using local fallback");
      }
    }

    // Fallback local cart update
    setCartItems((prev) => {
      const existing = prev.find((item) => (item.product?.productId || item.productId) === productId);
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          (item.product?.productId || item.productId) === productId
            ? { ...item, quantity: (item.quantity || 1) + qty }
            : item
        );
      } else {
        updated = [...prev, { product: product.product || product, quantity: qty, productId }];
      }
      localStorage.setItem("vibe_cart", JSON.stringify(updated));
      return updated;
    });
    return true;
  };

  const updateCartQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    if (isAuthenticated) {
      try {
        await updateQuantity(productId, quantity);
        await fetchCart();
        return;
      } catch (e) {
        console.log("Cart update API error");
      }
    }

    setCartItems((prev) => {
      const updated = prev.map((item) =>
        (item.product?.productId || item.productId) === productId ? { ...item, quantity } : item
      );
      localStorage.setItem("vibe_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = async (productId) => {
    if (isAuthenticated) {
      try {
        await removeItemApi(productId);
        await fetchCart();
        return;
      } catch (e) {
        console.log("Cart delete API error");
      }
    }

    setCartItems((prev) => {
      const updated = prev.filter((item) => (item.product?.productId || item.productId) !== productId);
      localStorage.setItem("vibe_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{ cartItems, loading, addToCart, updateCartQuantity, removeFromCart, fetchCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
