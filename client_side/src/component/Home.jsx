import React from "react";
import Navbar from "./Navbar";
import FooterComponent from "./FooterComponent";
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
  <Navbar />

  <main className="flex-grow">
    <div className="bg-amber-600 w-full h-[400px]" />

    <div className="bg-amber-700 w-full p-10">
      <h1 className="font-serif text-center text-3xl">Browse The Range</h1>
      <p className="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-black text-white h-80 rounded-3xl flex flex-col justify-between p-4">
          <div>Top Content</div>
          <div className="bg-white text-black h-1/3 flex items-center justify-center rounded-xl">
            Bottom Content
          </div>
        </div>

        <div className="bg-black text-white h-80 rounded-3xl flex flex-col justify-between p-4">
          <div>Top Content</div>
          <div className="bg-white text-black h-1/3 flex items-center justify-center rounded-xl">
            Bottom Content
          </div>
        </div>

        <div className="bg-black text-white h-80 rounded-3xl flex flex-col justify-between p-4">
          <div>Top Content</div>
          <div className="bg-white text-black h-1/3 flex items-center justify-center rounded-xl">
            Bottom Content
          </div>
        </div>
      </div>
    </div>
  </main>

  <FooterComponent />
</div>

  );
};

export default Home;
