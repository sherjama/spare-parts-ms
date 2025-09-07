import React, { useState } from "react";
import { IoIosCreate } from "react-icons/io";

const Inventory = () => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const inventory = [
    { partNumber: "PN-1001", description: "Brake Pad", unitPrice: "$50" },
    { partNumber: "PN-1002", description: "Air Filter", unitPrice: "$30" },
    { partNumber: "PN-1003", description: "Clutch Plate", unitPrice: "$120" },
  ];
  return (
    <div className="px-14 pt-6 bg-black min-h-screen text-white font-nexar3">
      <h1 className="text-3xl text-gray-300 font-nexar1 mb-6">Inventory</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Buy Parts */}
        <div className="md:col-span-2 bg-gray-900 rounded-2xl p-6 shadow-lg flex flex-col justify-between ">
          <div>
            <h2 className="text-2xl  mb-2 font-nexar1">Buy Parts</h2>
            <p className="text-gray-300 text-sm font-nexar1">
              Browse and purchase spare parts with ease.
            </p>
          </div>
          <button className="mt-4 bg-indigo-900 hover:bg-indigo-950 text-white rounded-xl py-2 px-4 w-fit transition font-nexar2 tracking-wide">
            Buy Now
          </button>
        </div>

        {/* Sell Parts */}
        <div className="md:col-span-2 bg-pink-900 rounded-2xl p-6 shadow-lg flex flex-col justify-between ">
          <div>
            <h2 className="text-2xl mb-2 font-nexar1">Sell Parts</h2>
            <p className="text-gray-300 text-sm font-nexar1">
              Upload your parts and manage your listings.
            </p>
          </div>
          <button className="mt-4 bg-slate-300 hover:bg-slate-500 text-gray-950 rounded-xl py-2 px-4 w-fit transition font-nexar2 tracking-wide">
            Sell Now
          </button>
        </div>

        <div className="md:col-span-1 bg-stone-900 rounded-2xl shadow-lg flex items-start justify-evenly flex-col p-4">
          <h2 className="text-2xl font-nexar1 mb-2">Create Shelve</h2>

          <p className="text-gray-300 text-sm font-nexar1">
            Create shelves to organize stock
          </p>
          <button className="bg-stone-500 hover:bg-stone-600 text-white rounded-xl py-2 px-3 transition mt-2">
            + Add Now
          </button>
        </div>

        {/* Shelves */}
        <div className="md:col-span-1 bg-indigo-950 p-6 rounded-2xl shadow">
          <h2 className="text-white text-2xl font-nexar1 text-center">
            View Shelves
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-4">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-[#1E1E1E] rounded-lg h-16 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition"
              >
                S{idx + 1}
              </div>
            ))}
          </div>
        </div>

        {/* View inventory  */}
        <div className="md:col-span-4 gap-4 bg-zinc-950 rounded-2xl shadow">
          <h2 className="text-white text-3xl font-nexar1 pt-4 pl-4">
            View Inventory
          </h2>
          <p className="text-gray-300 text-sm font-nexar1 mt-2 pl-4">
            Check and manage all available parts.
          </p>
          {/* table  */}
          <div className="overflow-x-auto rounded-lg border border-gray-700 mt-7 mx-2">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="bg-[#1E1E1E] text-gray-400 uppercase text-md">
                <tr>
                  <th scope="col" className="px-4 py-2">
                    Sr. No.
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Part Number
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-2">
                    Unit Price
                  </th>
                  <th scope="col" className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-700 hover:bg-[#2A2A2A]"
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{item.partNumber}</td>
                    <td className="px-4 py-2">{item.description}</td>
                    <td className="px-4 py-2">{item.unitPrice} </td>
                    <td className="px-4 py-2">
                      {hoveredRow === index && <IoIosCreate size={20} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
