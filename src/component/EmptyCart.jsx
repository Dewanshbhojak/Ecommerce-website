import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
        <ShoppingCart
          size={60}
          className="text-gray-500"
        />
      </div>

      <h1 className="mt-8 text-4xl font-bold">
        Your cart is empty
      </h1>

      <p className="mt-3 text-gray-500">
        Looks like you haven't added anything yet.
      </p>

      <button
        onClick={() => navigate("/products")}
        className="mt-8 px-10 py-4 bg-black text-white rounded-xl hover:bg-gray-900"
      >
        Browse Products
      </button>
    </div>
    </>
  );
};

export default EmptyCart;