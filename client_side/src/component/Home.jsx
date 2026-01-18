import React from "react";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />

      <div className="bg-amber-600 w-full h-[400px] overflow-hidden"></div>
      <div className="bg-amber-700 w-full p-10">
        <h1 className="font-serif text-center text-3xl">Browse The Range</h1>
        <p className="text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim,
          dolorem!
        </p>

        <div className="flex justify-center items-center mt-6 gap-4">
          <div className="w-1/3 bg-black text-white h-80 rounded-3xl flex flex-col justify-between p-4">
            <div>Top Content</div>

            <div className="bg-white text-black h-1/3 flex items-center justify-center rounded-xl">
              Bottom Content
            </div>
          </div>

          <div className="w-1/3 bg-black text-white h-80 rounded-3xl flex flex-col  justify-between p-4">
            <div>Top content</div>
            <div className="bg-white w-full h-1/3 rounded-xl flex justify-center items-center text-black ">
              Bottom Content
            </div>
          </div>
          <div className="w-1/3 bg-black text-white h-80 rounded-3xl flex flex-col justify-between p-4">
            <div>Top Content</div>

            <div className="bg-white text-black h-1/3 flex items-center justify-center rounded-xl">
              Bottom Content
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
