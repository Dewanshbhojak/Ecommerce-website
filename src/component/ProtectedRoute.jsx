import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const { showInfo } = useToast();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      showInfo("Please log in to continue");
    }
  }, [loading, isAuthenticated, showInfo]);

  // Prevent flash redirect while validating session
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl border border-stone-200/80 shadow-md">
          <Loader2 className="w-8 h-8 text-[#5A6B5C] animate-spin" />
          <p className="text-sm font-medium text-stone-600 tracking-wide">Validating session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
