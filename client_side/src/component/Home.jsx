import React from "react";
import Navbar from "./Navbar";
import FooterComponent from "./FooterComponent";
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-grow">
        <div
          className=" relative w-full h-[500px] bg-[url('https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8fDA%3D')] 
bg-center bg-no-repeat bg-cover flex justify-center items-center "
        >
          <h1 className="absolute left-3 bottom-45 text-amber-900 text-5xl font-serif tracking-wider">
            Step into comfort <br /> Walk with <br />
            confidence.
          </h1>
        </div>

        <div className=" w-full p-10">
          <h1 className="font-serif text-center text-3xl">Browse The Range</h1>
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className=" text-white h-auto w-auto  rounded-3xl flex flex-col justify-between p-4 hover:scale-105">
               <img src="/image/air-jordan-1-mid-se-shoes-YdXLNukp.avif" alt="" className="rounded-t-2xl " />
              <div className="bg-black text-white font-serif text-3xl h-20 flex items-center justify-center rounded-b-2xl">
                Nike 
              </div>
            </div>

             <div className=" text-white h-auto w-auto  rounded-3xl flex flex-col justify-between p-4 hover:scale-105">
               <img src="/image/air-max-dn8-leather-shoes-bYfKK6Qb.avif" alt="" className="rounded-t-2xl " />
              <div className="bg-black text-white font-serif text-3xl h-20 flex items-center justify-center rounded-b-2xl">
                Nike 
              </div>
            </div>
            <div className=" text-white h-auto w-auto  rounded-3xl flex flex-col justify-between p-4 hover:scale-105">
               <img src="/image/ja-3-lunar-new-year-ep-basketball-shoes-s5LwQ251.avif" alt="" className="rounded-t-2xl " />
              <div className="bg-black text-white font-serif text-3xl h-20 flex items-center justify-center rounded-b-2xl">
                Nike 
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
