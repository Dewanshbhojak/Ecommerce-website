import {
    Search,
    SlidersHorizontal
} from "lucide-react";

import { useEffect, useState } from "react";
 import { fetch } from "../Services/MyorderServices";
import OrderCard from "../component/OrderCard";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {

    const [orders, setOrders] = useState([]);

    const [filteredOrders, setFilteredOrders] = useState([]);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("ALL");

    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const response = await fetch();
                console.log(response.data)
            setOrders(response.data);


            setFilteredOrders(response.data);

        } catch (e) {

            console.log(e);

        }

    };

    useEffect(() => {

        let data = [...orders];

        if (status !== "ALL") {

            data = data.filter(
                order => order.status === status
            );

        }

        if (search !== "") {

            data = data.filter(order =>

                order.orderId
                    .toLowerCase()
                    .includes(search.toLowerCase())

            );

        }

        setFilteredOrders(data);

    }, [search, status, orders]);

    return (

        <div className="max-w-7xl mx-auto py-10">

            <div className="flex justify-between">

                <div>

                    <h1 className="text-4xl font-bold">

                        My Orders

                    </h1>

                    <p className="text-gray-500 mt-2">

                        {orders.length} Orders

                    </p>

                </div>

                <button
                    onClick={() => navigate("/home")}
                    className="border rounded-xl px-6"
                >

                    Continue Shopping

                </button>

            </div>

            <div className="flex gap-4 mt-10">

                <div className="flex-1 relative">

                    <Search
                        className="absolute left-4 top-4"
                        size={20}
                    />

                    <input
                        placeholder="Search Order..."
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        className="w-full border rounded-xl pl-12 py-4"
                    />

                </div>

                <button className="flex gap-2 items-center border rounded-xl px-5">

                    <SlidersHorizontal/>

                    Filter

                </button>

            </div>

            <div className="flex gap-4 mt-8 flex-wrap">

                {[
                    "ALL",
                    "PENDING",
                    "PROCESSING",
                    "SHIPPED",
                    "DELIVERED",
                    "CANCELLED"
                ].map((item)=>(
                    <button

                        key={item}

                        onClick={()=>setStatus(item)}

                        className={`px-6 py-3 rounded-full border ${
                            status===item
                            ? "bg-black text-white"
                            : ""
                        }`}

                    >

                        {item}

                    </button>
                ))}

            </div>

            {filteredOrders.length===0 ?

                <div className="text-center mt-20 text-gray-500">

                    No Orders Found

                </div>

            :

                filteredOrders.map(order=>(

                    <OrderCard
                        key={order.orderId}
                        order={order}
                    />

                ))

            }

        </div>

    );

};

export default MyOrders;