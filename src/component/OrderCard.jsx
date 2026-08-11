import {
  Truck,
  PackageCheck,
  RotateCcw,
  Download,
  Box,
  ChevronDown
} from "lucide-react";

const OrderCard = ({ order }) => {

  const statusColor = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PROCESSING: "bg-yellow-100 text-yellow-700",
    SHIPPED: "bg-blue-100 text-blue-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700"
  };

  return (
    <div className="bg-white rounded-3xl border mt-8 overflow-hidden">

      <div className="flex justify-between items-center border-b p-6">

        <div className="flex gap-14">

          <div>
            <p className="text-gray-500 text-sm">
              Order
            </p>

            <h3 className="font-semibold">
              {order.orderId}
            </h3>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Placed
            </p>

            <h3>
              {new Date(order.createdAt).toLocaleDateString()}
            </h3>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Total
            </p>

            <h3 className="font-bold">
              ₹{order.totalAmount}
            </h3>
          </div>

        </div>

        <div className="flex items-center gap-4">

          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              statusColor[order.status]
            }`}
          >
            {order.status}
          </span>

          <ChevronDown />

        </div>

      </div>

      {order.items.map((item) => (

        <div
          key={item.id}
          className="flex justify-between items-center p-6 border-b"
        >

          <div className="flex gap-5">

            <img
              src={item.image}
              className="w-24 h-24 rounded-xl object-cover"
            />

            <div>

              <h3 className="font-bold text-lg">
                {item.productName}
              </h3>

              <p className="text-gray-500 mt-2">
                Qty : {item.quantity}
              </p>

            </div>

          </div>

          <div className="font-semibold text-lg">
            ₹{item.totalPrice}
          </div>

        </div>

      ))}

      <div className="p-6 flex gap-4 flex-wrap">

        <button className="border rounded-xl px-5 py-3 flex items-center gap-2">
          <Truck size={18}/>
          Track Package
        </button>

        <button className="border rounded-xl px-5 py-3 flex items-center gap-2">
          <Download size={18}/>
          Invoice
        </button>

        <button className="border rounded-xl px-5 py-3 flex items-center gap-2">
          <RotateCcw size={18}/>
          Cancel Order
        </button>

        <button className="ml-auto border rounded-xl px-5 py-3 flex items-center gap-2">
          <Box size={18}/>
          Buy Again
        </button>

      </div>

    </div>
  );
};

export default OrderCard;