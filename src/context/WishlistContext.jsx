import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { getWishlist, addToWishlist as apiAddToWishlist, removeFromWishlist as apiRemoveFromWishlist } from "../Services/wishlistService";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Compute storage key for unauthenticated fallback
  const getStorageKey = useCallback(() => {
    if (isAuthenticated && user) {
      const userId = user.userId || user.id || user.email;
      return `vibe_wishlist_user_${userId}`;
    }
    return "vibe_wishlist_guest";
  }, [isAuthenticated, user]);

  // Fetch wishlist from backend if authenticated, otherwise use local storage
  const fetchWishlist = useCallback(async () => {
    if (isAuthenticated) {
      setLoading(true);
      try {
        const response = await getWishlist();
        if (response && response.data && Array.isArray(response.data)) {
          setWishlistItems(response.data);
        }
      } catch (err) {
        console.log("Failed to fetch backend wishlist, checking localStorage fallback");
        const key = getStorageKey();
        const saved = localStorage.getItem(key);
        setWishlistItems(saved ? JSON.parse(saved) : []);
      } finally {
        setLoading(false);
      }
    } else {
      const key = getStorageKey();
      const saved = localStorage.getItem(key);
      setWishlistItems(saved ? JSON.parse(saved) : []);
    }
  }, [isAuthenticated, getStorageKey]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const isInWishlist = useCallback(
    (productId) => {
      if (!productId) return false;
      const idStr = productId.toString();
      return wishlistItems.some((item) => {
        const itemId = (item.productId || item.id || item.product?.productId)?.toString();
        return itemId === idStr;
      });
    },
    [wishlistItems]
  );

  const toggleWishlist = async (product) => {
    const productId = product.productId || product.id || product.product?.productId;
    if (!productId) return false;

    const exists = isInWishlist(productId);

    if (isAuthenticated) {
      try {
        if (exists) {
          await apiRemoveFromWishlist(productId);
        } else {
          await apiAddToWishlist(productId);
        }
        await fetchWishlist();
        return !exists;
      } catch (err) {
        console.log("Wishlist API sync error", err);
      }
    }

    // Local state fallback
    let updated;
    const idStr = productId.toString();
    if (exists) {
      updated = wishlistItems.filter((item) => {
        const itemId = (item.productId || item.id || item.product?.productId)?.toString();
        return itemId !== idStr;
      });
    } else {
      updated = [...wishlistItems, product];
    }

    setWishlistItems(updated);
    localStorage.setItem(getStorageKey(), JSON.stringify(updated));
    return !exists;
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        loading,
        toggleWishlist,
        isInWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
