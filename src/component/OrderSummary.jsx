import { useNavigate } from "react-router-dom";
import {checkout, verifyPayment} from "../Services/CartServices";
const OrderSummary = ({ cartItems }) => {

const navigate = useNavigate();
  const handlePayment = async () => {
    try {
      // Create Razorpay Order
      const response = await checkout();

      const orderid = response.data.orderId;
     
      console.log(orderid);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: total * 100,

        currency: "INR",

        name: "My E-Commerce Store",

        description: "Order Payment",

        order_id: orderid,

        handler: async function (response) {
          try {
            const verifyResponse = await verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (verifyResponse.status === 200) {
              console.log("success")
              navigate("/home");
            } else {
              console.log("failure")
              navigate("/payment-failed");
            }
          } catch (error) {
            console.error(error);
            navigate("/payment-failed");
          }
        },

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        theme: {
          color: "#000000",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.log(response.error);
        navigate("/payment-failed");
      });

      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Unable to initiate payment");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;

  const total = subtotal + tax;

  return (
    <div className="bg-white border rounded-3xl p-8 sticky top-20">

      <h2 className="text-3xl font-bold">
        Order Summary
      </h2>

      <div className="mt-8 space-y-4">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600">
            Free
          </span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>

      </div>

      <hr className="my-6" />

      <div className="flex justify-between text-xl font-bold">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      <button className="w-full mt-8 bg-black text-white py-4 rounded-xl font-semibold" onClick={handlePayment} >
        Proceed to Checkout
      </button>

    </div>
  );
};

export default OrderSummary;
