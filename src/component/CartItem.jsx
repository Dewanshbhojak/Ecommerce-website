import { Trash2 } from "lucide-react";

const CartItem = ({
  item,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
}) => {
  return (
    <div className="bg-white border rounded-2xl p-6 flex items-center justify-between">

      <div className="flex gap-6">

        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-32 h-32 rounded-xl object-cover"
        />

        <div>

          <h2 className="text-2xl font-semibold">
            {item.name}
          </h2>

          <p className="text-gray-500 mt-2">
            {item.color}
          </p>

          <div className="flex mt-5 border rounded-lg w-fit">

            <button
              onClick={() =>
                decreaseQuantity(item.id)
              }
              className="px-4 py-2"
            >
              -
            </button>

            <span className="px-6 py-2">
              {item.quantity}
            </span>

            <button
              onClick={() =>
                increaseQuantity(item.id)
              }
              className="px-4 py-2"
            >
              +
            </button>

          </div>

        </div>
      </div>

      <div className="flex flex-col items-end gap-8">

        <Trash2
          size={20}
          className="cursor-pointer text-gray-500"
          onClick={() => deleteItem(item.id)}
        />

        <h2 className="text-3xl font-semibold">
          ₹{item.price}
        </h2>

      </div>
    </div>
  );
};

export default CartItem;