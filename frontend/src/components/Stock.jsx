import { useSelector } from "react-redux";
import { Button, Box } from "../index.js";
import { TiPlus } from "react-icons/ti";
import { MdShelves } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { HiTrendingDown } from "react-icons/hi";

const StockPage = ({ className }) => {
  const shelveData = useSelector((state) => state.stock.Shelves?.data);
  const partsData = useSelector((state) => state.stock.Parts?.data);

  const lowStock = partsData?.filter((val) => val.Qty <= 3);

  return (
    <div>
      <div
        className={`bg-[#121212] rounded-tl-[24px] rounded-tr-[24px] rounded-br-[24px] rounded-bl-[0px] p-4 ${className}`}
      >
        <header className="flex justify-between  pr-3 mb-5">
          <h1 className="text-gray-300 text-xl ">Inventory</h1>

          <Button
            text={
              <span className="flex gap-1 font-nexar1 items-center ">
                <TiPlus size={10} />
                Stock
              </span>
            }
            bgColor="bg-white"
            textColor="text-black py-0"
            className="rounded-lg py-0 px-2"
          />
        </header>
        <section className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 mb-8 ">
          <Box
            Heading="Shelves"
            headingColor="text-amber-700"
            Data={{
              totalShelves: shelveData.length,
              icon: <MdShelves size={23} />,
              data: shelveData,
            }}
          />
          <Box
            Heading="Parts"
            headingColor="text-white"
            Data={{
              totalShelves: partsData.length,
              icon: <FaTools size={21} />,
              data: partsData,
            }}
          />
          <Box
            Heading="Low stock"
            headingColor="text-red-500"
            Data={{
              totalShelves: lowStock.length,
              icon: <HiTrendingDown size={23} />,
              data: lowStock,
            }}
          />
        </section>
        <section className="bg-[#222222] rounded-md p-4 shadow-sm  ">
          <h3 className="text-gray-400 font-nexar1 text-sm mb-3">
            Inventory Items
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-4">
            <input
              className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              placeholder="Search"
              type="search"
            />
            <div className="flex space-x-2 mt-3 sm:mt-0">
              <button
                className="inline-flex items-center border border-gray-300 rounded-md px-3 py-1 text-xs text-gray-700 hover:bg-gray-100"
                type="button"
              >
                <i className="fas fa-filter mr-1"></i>
                Filter
              </button>
              <button
                className="inline-flex items-center border border-gray-300 rounded-md px-3 py-1 text-xs text-gray-700 hover:bg-gray-100"
                type="button"
              >
                <i className="far fa-calendar-alt mr-1"></i>
                Date
              </button>
              <button
                className="inline-flex items-center bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-md px-3 py-1 text-xs font-medium"
                type="button"
              >
                <i className="fas fa-arrow-down mr-1"></i>
                Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-600 text-xs border-separate border-spacing-y-1">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pl-4 pr-2 py-2 w-6"></th>
                  <th className="py-2 pr-4 font-nexar1">Product Name</th>
                  <th className="py-2 pr-4 font-nexar1">Category</th>
                  <th className="py-2 pr-4 font-nexar1">SKU</th>
                  <th className="py-2 pr-4 font-nexar1">Incoming row</th>
                  <th className="py-2 pr-4 font-nexar1">Unit Price</th>
                  <th className="py-2 pr-4 font-nexar1">In-Stock</th>
                  <th className="py-2 pr-4 font-nexar1">Total Value</th>
                  <th className="py-2 pr-4 font-nexar1">Status</th>
                  <th className="py-2 pr-4 font-nexar1 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#222222] rounded-md shadow-sm  ">
                  <td className="pl-4 pr-2 py-2 align-middle"></td>
                  <td className="py-2 pr-4 flex items-center space-x-2">
                    <span className="text-gray-900 text-xs font-normal">
                      Wool Felt Sheets
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-xs font-normal">Texture</td>
                  <td className="py-2 pr-4 text-xs font-normal">TS121321</td>
                  <td className="py-2 pr-4 text-xs font-normal">14</td>
                  <td className="py-2 pr-4 text-xs font-normal">$15</td>
                  <td className="py-2 pr-4 text-xs font-normal">32</td>
                  <td className="py-2 pr-4 text-xs font-nexar1">$200,00</td>
                  <td className="py-2 pr-4 text-xs font-normal text-green-600 flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                    <span>In-Stock</span>
                  </td>
                  <td className="py-2 pr-4 text-center text-gray-400 cursor-pointer">
                    <i className="fas fa-ellipsis-h"></i>
                  </td>
                </tr>
                <tr className="bg-[#222222] rounded-md shadow-sm  ">
                  <td className="pl-4 pr-2 py-2 align-middle"></td>
                  <td className="py-2 pr-4 flex items-center space-x-2">
                    <span className="text-gray-900 text-xs font-normal">
                      Wool Felt Sheets
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-xs font-normal">Texture</td>
                  <td className="py-2 pr-4 text-xs font-normal">TS121321</td>
                  <td className="py-2 pr-4 text-xs font-normal">21</td>
                  <td className="py-2 pr-4 text-xs font-normal">$00</td>
                  <td className="py-2 pr-4 text-xs font-normal">00</td>
                  <td className="py-2 pr-4 text-xs font-nexar1">$00,00</td>
                  <td className="py-2 pr-4 text-xs font-normal text-red-600 flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                    <span>out of stock</span>
                  </td>
                  <td className="py-2 pr-4 text-center text-gray-400 cursor-pointer">
                    <i className="fas fa-ellipsis-h"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StockPage;
