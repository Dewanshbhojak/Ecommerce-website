import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSearch, FaShoppingBag } from "react-icons/fa";
import { Heart, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const navData = [
  { id: 1, title: "Men", path: "/Men" },
  { id: 2, title: "Women", path: "/Women" },
  { id: 3, title: "Kids", path: "/Kids" },
  { id: 4, title: "Shoes", path: "/Shoes" },
  { id: 5, title: "Watches", path: "/Watches" },
  { id: 6, title: "Perfumes", path: "/Perfumes" },
  { id: 7, title: "Glasses", path: "/Glasses" },
  { id: 8, title: "Accessories", path: "/Accessories" },
];

const Navbar = () => {
  const { user, isAuthenticated, logoutUser } = useAuth();
  const { wishlistCount } = useWishlist();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/home");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 text-stone-900 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/home" className="inline-block shrink-0">
          <h1 className="text-2xl font-serif font-bold tracking-wider text-stone-900">
            VIBE<span className="text-[#5A6B5C] font-sans text-xs font-semibold tracking-normal uppercase ml-1">LUXE</span>
          </h1>
        </Link>

        {/* Center Categories Links */}
        <div className="hidden lg:flex items-center space-x-6">
          {navData.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="text-stone-700 text-xs font-semibold uppercase tracking-wider hover:text-[#5A6B5C] transition-colors py-1"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Search & Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="search"
              className="bg-white border border-stone-200 text-stone-800 text-xs rounded-full h-9 pl-4 pr-9 focus:outline-none focus:border-[#5A6B5C] w-40 focus:w-52 transition-all shadow-sm"
              placeholder="Search products..."
            />
            <FaSearch className="absolute right-3 top-2.5 text-stone-400 pointer-events-none" size={13} />
          </div>

          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            className="text-stone-700 hover:text-[#C85A48] transition-colors relative p-1.5"
            aria-label="View Wishlist"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C85A48] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Link */}
          <Link
            to="/cart"
            className="text-stone-700 hover:text-[#5A6B5C] transition-colors relative p-1.5"
            aria-label="View Cart"
          >
            <FaShoppingBag size={19} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#5A6B5C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Auth Profile / Login Button */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="flex items-center gap-2 bg-stone-100 border border-stone-200 text-stone-800 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-stone-200 transition-colors"
              >
                <FaUser size={12} className="text-[#5A6B5C]" />
                <span className="capitalize hidden sm:inline">{user?.name || "Account"}</span>
              </Link>
              <button
                onClick={handleLogout}
                aria-label="Logout"
                className="text-stone-500 hover:text-stone-900 transition-colors p-1"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1.5 rounded-full bg-[#5A6B5C] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#4A584C] transition-colors shadow-sm"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;