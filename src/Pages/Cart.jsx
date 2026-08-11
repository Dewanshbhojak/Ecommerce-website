import React from "react";
import CartItem from "../component/CartItem";
import EmptyCart from "../component/EmptyCart";
import OrderSummary from "../component/OrderSummary";
import Navbar from "../component/Navbar";
import FooterComponent from "../component/FooterComponent";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, updateCartQuantity, removeFromCart, totalItems } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900">
      <Navbar />
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 sm:px-12 lg:px-20 py-10">
        <h1 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 mb-8">
          Shopping Cart
          <span className="text-stone-400 text-lg font-sans font-normal ml-3">
            ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, idx) => {
              const productId = item.productId || item.product?.productId || item.id;
              return (
                <CartItem
                  key={productId || idx}
                  item={item}
                  increaseQuantity={() => updateCartQuantity(productId, (item.quantity || 1) + 1)}
                  decreaseQuantity={() => updateCartQuantity(productId, (item.quantity || 1) - 1)}
                  deleteItem={() => removeFromCart(productId)}
                />
              );
            })}
          </div>

          <OrderSummary cartItems={cartItems} />
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default Cart;
