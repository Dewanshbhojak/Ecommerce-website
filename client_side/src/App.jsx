import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Home from "./component/Home";
import ProductPage from "./Pages/ProductPage";
import Categories from "./component/Categories";
import Cart from "./Pages/Cart";
import Error from "./Pages/Error";
import MyOrder from "./Pages/MyOrder";
import MyProfile from "./Pages/MyProfile";
import ForgetPassword from "./component/ForgetPassword";
import WishlistPage from "./Pages/WishlistPage";
import ProtectedRoute from "./component/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastProvider } from "./context/ToastContext";

const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <Routes>
              {/* Default Landing Page is Home */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotPassword" element={<ForgetPassword />} />

              {/* Public Product & Category Routes */}
              <Route path="/ProductPage/:id" element={<ProductPage />} />

              {/* Protected User Routes */}
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute>
                    <WishlistPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <MyProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-order"
                element={
                  <ProtectedRoute>
                    <MyOrder />
                  </ProtectedRoute>
                }
              />

              <Route path="/error" element={<Error />} />

              {/* Dynamic Category Route */}
              <Route path="/:category" element={<Categories />} />
            </Routes>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
