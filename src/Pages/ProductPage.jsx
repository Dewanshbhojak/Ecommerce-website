import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductImage from "../component/ProductImage.jsx";
import ProductInfo from "../component/ProductInfo";
import ProductTabs from "../component/ProductTabs";
import Navbar from "../component/Navbar.jsx";
import FooterComponent from "../component/FooterComponent.jsx";
import { getProductById } from "../Services/productService";

export default function ProductPage() {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const response = await getProductById(id);
        if (response && response.data) {
          // Handle DTO response shape
          const data = response.data;
          setProductData(data);
        } else {
          setErrorMsg("Product not found");
        }
      } catch (error) {
        console.error("Failed to load product details", error);
        setErrorMsg("Unable to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-20 w-full animate-pulse space-y-8">
          <div className="h-96 bg-white rounded-3xl border border-stone-200" />
        </div>
      </div>
    );
  }

  if (errorMsg || !productData) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
        <Navbar />
        <div className="max-w-md mx-auto px-6 py-24 text-center">
          <h2 className="text-2xl font-serif text-stone-900">{errorMsg || "Product Not Found"}</h2>
          <button
            onClick={() => navigate("/home")}
            className="mt-6 px-6 py-2.5 rounded-xl bg-[#5A6B5C] text-white text-xs uppercase tracking-wider font-semibold"
          >
            Back to Home
          </button>
        </div>
        <FooterComponent />
      </div>
    );
  }

  const product = productData.product || productData;
  const images = productData.list || (productData.list === null ? [] : [productData]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 w-full">
        <div className="flex flex-col lg:flex-row gap-12">
          <ProductImage product={images} />
          <ProductInfo product={product} />
        </div>
        <ProductTabs />
      </main>
      <FooterComponent />
    </div>
  );
}