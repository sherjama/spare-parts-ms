import React, { useEffect, useState } from "react";
import { IoIosCreate } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AddShelve,
  EditPartDetails,
  partsService,
  ViewShelve,
  Heading,
} from "../index.js";
import { fetchAllStock } from "@/store/stockSlice.js";

const Inventory = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [updateablePart, setUpdateablePart] = useState();
  const [partsInShelf, setPartsInShelf] = useState();
  const [viewShelfName, setViewShelfName] = useState();
  // PopUps toggles
  const [shelveToggle, setShelveToggle] = useState(false);
  const [partToggle, setPartToggle] = useState(false);
  const [shelveInView, setShelveInView] = useState(false);

  const { Parts, Shelves, loading, error } = useSelector(
    (state) => state.stock
  );
  const userId = useSelector((state) => state.userdata.userdata.user._id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdatePart = (partNumber) => {
    let part = Parts.find((part) => part.partNumber == partNumber);

    setUpdateablePart(part);
    setPartToggle(true);
  };

  const partsInShelveHandler = async (shelf) => {
    try {
      const parts = await partsService.getShelfParts(shelf?.shelfName);
      if (parts) {
        setShelveInView(true);
        setPartsInShelf(parts?.data?.data);
        setViewShelfName(shelf?.shelfName);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if ((!Parts.length || !Shelves.length) && userId) {
      dispatch(fetchAllStock(userId));
    }
  }, [Parts.length, Shelves.length, userId, dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className="px-14 pt-6 dark:bg-black bg-slate-400 min-h-screen text-white font-nexar3">
      {/* PopUps  */}
      <div className={`w-min absolute top-[35%] left-[40%] z-30`}>
        {shelveToggle && <AddShelve setShelveToggle={setShelveToggle} />}
        {partToggle && (
          <EditPartDetails
            setPartToggle={setPartToggle}
            partDetails={updateablePart}
          />
        )}
        {shelveInView && (
          <ViewShelve
            setShelveInView={setShelveInView}
            title={viewShelfName}
            parts={partsInShelf}
          />
        )}
      </div>

      <Heading title={"Inventory"} />
      <div
        className={`grid grid-cols-1 md:grid-cols-5 gap-6 ${
          partToggle || shelveToggle ? "opacity-25" : "opacity-100"
        }`}
      >
        {/* Buy Parts */}
        <div className="md:col-span-2 dark:bg-gray-900  bg-gray-600 rounded-2xl p-6 shadow-lg flex flex-col justify-between ">
          <div>
            <h2 className="text-2xl  mb-2 font-nexar1">Purchase Parts</h2>
            <p className="text-gray-300 text-sm font-nexar1">
              purchase spare parts with ease.
            </p>
          </div>
          <button
            onClick={() => navigate("/controls/purchase-parts")}
            className="mt-4 bg-indigo-900 hover:bg-indigo-950 text-white rounded-xl py-2 px-4 w-fit transition font-nexar2 tracking-wide"
          >
            Buy Now
          </button>
        </div>

        {/* Sell Parts */}
        <div className="md:col-span-2 dark:bg-pink-900 bg-red-400 rounded-2xl p-6 shadow-lg flex flex-col justify-between ">
          <div>
            <h2 className="text-2xl mb-2 font-nexar1">Sell Parts</h2>
            <p className="text-gray-300 text-sm font-nexar1">
              Turn your parts into profit — list them for sale today.
            </p>
          </div>
          <button
            className="mt-4 bg-slate-300 hover:bg-slate-500 text-gray-950 rounded-xl py-2 px-4 w-fit transition font-nexar2 tracking-wide"
            onClick={() => navigate("/controls/sell-parts")}
          >
            Sell Now
          </button>
        </div>

        {/* creaete shelve  */}
        <div className="md:col-span-1 dark:bg-stone-900 bg-stone-500 rounded-2xl shadow-lg flex items-start justify-evenly flex-col p-4">
          <h2 className="text-2xl font-nexar1 mb-2">Create Shelve</h2>

          <p className="text-gray-300 text-sm font-nexar1">
            Create shelves to organize stock
          </p>
          <button
            className="dark:bg-stone-500 bg-stone-800 hover:bg-stone-600 text-white rounded-xl py-2 px-3 transition mt-2"
            onClick={() => setShelveToggle((prev) => !prev)}
          >
            + Add Now
          </button>
        </div>

        {/* Shelves */}
        <div className="md:col-span-5 bg-gradient-to-br from-indigo-950 via-indigo-900 to-gray-900 p-6 rounded-2xl shadow-lg border border-indigo-800/40">
          <h2 className="text-indigo-100 text-3xl font-nexar1 text-center mb-4 tracking-wide">
            View Shelves
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
            {Shelves.map((item, idx) => (
              <div
                key={idx}
                onClick={() => partsInShelveHandler(item)}
                className="relative group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl h-20 flex items-center justify-center 
                   text-gray-300 font-medium shadow-md border border-gray-700/50 cursor-pointer 
                   hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 ease-out"
              >
                <span className="z-10 group-hover:text-indigo-300 transition-colors duration-300">
                  {item.shelfName}
                </span>

                {/* Soft glowing background effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 blur-xl transition duration-500"></div>
              </div>
            ))}
          </div>
        </div>

        {/* View inventory  */}
        <div className="md:col-span-5 bg-gradient-to-br from-zinc-950 via-indigo-950 to-gray-900 rounded-2xl shadow-lg border border-indigo-800/40 overflow-hidden">
          <div className="px-6 pt-6">
            <h2 className="text-indigo-100 text-3xl font-nexar1 text-center md:text-left">
              Inventory Overview
            </h2>
            <p className="text-gray-400 text-sm font-nexar1 mt-1 text-center md:text-left">
              Manage and track all available parts with ease.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-800/70 mt-6 mx-4 mb-6 shadow-inner shadow-indigo-950/20 backdrop-blur-sm">
            <table className="w-full text-left text-gray-300 border-collapse">
              <thead className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-indigo-300 text-base font-semibold uppercase tracking-wider">
                <tr className="text-center">
                  <th className="px-3 py-3 text-sm sm:text-base">#</th>
                  <th className="px-3 py-3 text-sm sm:text-base text-left">
                    Part No.
                  </th>
                  <th className="px-3 py-3 text-sm sm:text-base text-left">
                    Part Name
                  </th>
                  <th className="px-3 py-3 text-sm sm:text-base text-left">
                    Shelf
                  </th>
                  <th className="px-3 py-3 text-sm sm:text-base">Qty</th>
                  <th className="px-3 py-3 text-sm sm:text-base">Price</th>
                  <th className="px-3 py-3 text-sm sm:text-base text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm sm:text-base">
                {Parts.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-800/60 hover:bg-gradient-to-r hover:from-indigo-950/50 hover:to-gray-900/40 transition-all duration-300 ease-out cursor-pointer text-center"
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="px-3 py-3 text-gray-400">{index + 1}</td>
                    <td className="px-3 py-3 text-left">{item.partNumber}</td>
                    <td className="px-3 py-3 text-left">{item.partName}</td>
                    <td className="px-3 py-3 text-left text-indigo-300">
                      {Shelves.find((shelf) => shelf._id === item.shelf)
                        ?.shelfName || "Not Found"}
                    </td>
                    <td className="px-3 py-3">{item.Qty}</td>
                    <td className="px-3 py-3">{item.Price}</td>
                    <td className="px-3 py-3 flex justify-center items-center">
                      {hoveredRow === index && (
                        <IoIosCreate
                          onClick={() => handleUpdatePart(item.partNumber)}
                          size={22}
                          className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
                        />
                      )}
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
