import { useState } from "react";

export default function ProductTabs() {
  const [tab, setTab] = useState("description");

  return (
    <div className="mt-20">
      <div className="flex gap-12 border-b pb-4">
        <button
          onClick={() => setTab("description")}
          className={
            tab === "description"
              ? "font-bold border-b-2 border-black"
              : ""
          }
        >
          Description
        </button>

        <button
          onClick={() => setTab("specifications")}
        >
          Specifications
        </button>

        <button
          onClick={() => setTab("reviews")}
        >
          Reviews (128)
        </button>
      </div>

      <div className="mt-8">
        {tab === "description" && (
          <>
            <h2 className="text-3xl font-bold">
              Product Description
            </h2>

            <p className="mt-4 text-gray-600 leading-8">
              Experience exceptional sound quality
              with active noise cancellation and
              premium comfort.
            </p>
          </>
        )}
      </div>
    </div>
  );
}