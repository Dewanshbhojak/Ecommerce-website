import {
  Home,
  RefreshCw,
  AlertTriangle,
  ChevronDown,
  SearchX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Error = ({
  code = "404",
  title = "Page Not Found",
  message = "The page you're looking for has been moved, deleted, or never existed.",
  description = "Double-check the URL or head back to the homepage.",
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-white flex items-center justify-center">

     

     
      <div className="relative z-10 max-w-4xl w-full px-6 text-center">

       
        <div className="w-28 h-28 rounded-3xl bg-purple-100 flex items-center justify-center mx-auto shadow-lg">
          <SearchX
            size={48}
            className="text-purple-600"
          />
        </div>

       
        <div className="mt-10 flex flex-wrap justify-center items-center gap-4">

          <span className="text-6xl md:text-7xl font-bold text-purple-600">
            {code}
          </span>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
            {title}
          </h2>

        </div>

      

        <p className="mt-8 text-xl md:text-2xl text-gray-600">
          {message}
        </p>

        <p className="mt-3 text-lg text-gray-400">
          {description}
        </p>


        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition"
          >
            <Home size={22} />
            Go Home
          </button>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-3 border border-gray-300 px-8 py-4 rounded-2xl hover:bg-gray-100 transition"
          >
            <RefreshCw size={20} />
            Try Again
          </button>

          <button
            className="flex items-center gap-3 text-gray-600 hover:text-black transition"
          >
            <AlertTriangle size={20} />
            Report Issue
          </button>

        </div>

  

        <div className="mt-14 max-w-xl mx-auto border rounded-2xl px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition">

          <span className="font-semibold">
            Advanced Details
          </span>

          <ChevronDown />

        </div>

      </div>

    </div>
  );
};

export default Error;