import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import FooterComponent from "./FooterComponent";
import ProductCard from "./ProductCard";
import { ChevronRight, ShoppingBag, ArrowRight } from "lucide-react";
import { getProductsByCategory } from "../Services/productService";

const Categories = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const response = await getProductsByCategory(category);
        if (response && response.data) {
          const list = Array.isArray(response.data) ? response.data : response.data.body || [];
          setProducts(list);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch category products", error);
        setErrorMsg("Unable to load products for this category. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchData();
    }
  }, [category]);

  const displayCategoryTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "Collection";

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900">
      <Navbar />

      {/* Category Banner */}
      <div className="bg-white border-b border-stone-200/80 py-12 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">
            <Link to="/home" className="hover:text-[#5A6B5C] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#5A6B5C]">{displayCategoryTitle}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-serif font-medium text-stone-900 capitalize">
                {displayCategoryTitle} Collection
              </h1>
              <p className="text-stone-500 text-sm mt-1 font-light max-w-xl">
                Explore handpicked luxury pieces in {displayCategoryTitle.toLowerCase()}. Crafted with premium materials for everyday sophistication.
              </p>
            </div>
            <div className="text-xs font-semibold text-stone-600 bg-stone-100 px-4 py-2 rounded-full w-fit">
              {products.length} {products.length === 1 ? "Product" : "Products"} Available
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 sm:px-12 lg:px-20 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-4 border border-stone-200 animate-pulse h-96" />
            ))}
          </div>
        ) : errorMsg ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 max-w-md mx-auto">
            <p className="text-stone-600 text-sm">{errorMsg}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-stone-200/80 p-8 my-8 max-w-md mx-auto">
            <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-xl font-serif text-stone-900">No Products Found</h3>
            <p className="text-stone-500 text-xs mt-1">Check back soon for new additions to this collection.</p>
            <Link
              to="/home"
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5A6B5C] text-white text-xs font-semibold uppercase tracking-wider"
            >
              <span>Back to Home</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <ProductCard key={product.productId || product.id || idx} product={product} />
            ))}
          </div>
        )}
      </main>

      <FooterComponent />
    </div>
  );
};

export default Categories;
