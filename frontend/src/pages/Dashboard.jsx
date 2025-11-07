import { useSelector, useDispatch } from "react-redux";
import { fetchAllStock } from "@/store/stockSlice.js";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { ViewBoxContainer } from "../index.js";

// icons
import { BiSolidCube } from "react-icons/bi";
import { FiTrendingUp } from "react-icons/fi";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import reportsService from "@/services/reports.service.js";

const Dashboard = ({ className }) => {
  const [totalSells, setTotalSells] = useState(0);
  const [totalPurchase, setTotalPurchase] = useState(0);
  const userId = useSelector((state) => state.userdata.userdata.user._id);
  const Parts = useSelector((state) => state.stock.Parts);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.stock);

  const formatNumber = (amount) => {
    if (isNaN(amount)) return "₹ 0";
    if (amount >= 1e7) return `₹ ${(amount / 1e7).toFixed(2)} Cr`;
    if (amount >= 1e5) return `₹ ${(amount / 1e5).toFixed(2)} L`;
    if (amount >= 1e3) return `₹ ${(amount / 1e3).toFixed(2)} K`;
    return `₹ ${amount}`;
  };

  useEffect(() => {
    async function getTotalSellAndPurchase() {
      try {
        const totalS = await reportsService.getTotalSells();
        const totalP = await reportsService.getTotalPurchase();
        if (totalS || totalP) {
          const formatedTotalS = formatNumber(totalS);
          const formatedTotalP = formatNumber(totalP);
          setTotalSells(formatedTotalS);
          setTotalPurchase(formatedTotalP);
          console.log(totalP);
          console.log(formatedTotalP);
        }
      } catch (error) {
        toast.error(error);
      }
    }
    getTotalSellAndPurchase();
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchAllStock(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const topAnalysis = [
    {
      title: "Total Parts",
      icon: <BiSolidCube />,
      data: Parts?.length + " " + "items",
      className: "",
    },
    {
      title: "Total Sales",
      icon: <FiTrendingUp color="Green" />,
      data: totalSells,
      className: "",
    },
    {
      title: "Total Purchase",
      icon: <BiSolidPurchaseTagAlt color="Blue" />,
      data: totalPurchase,
      className: "",
    },
  ];

  return loading ? (
    <p>Loading...</p>
  ) : (
    <main
      className={`flex mt-6 md:mt-0  flex-col space-y-6 text-white ${className} bg-[#121212]  p-4`}
    >
      <ToastContainer />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 ">
        {topAnalysis.map((item, idx) => (
          <div key={idx}>
            <ViewBoxContainer data={item} />
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        <div
          aria-label="Portfolio Overview"
          className="flex-1 bg-[#222222] rounded-xl p-6 text-xs text-white"
        >
          <h3 className="font-semibold mb-4">Portfolio Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse border border-[#3a3a3a]">
              <thead>
                <tr className="border-b border-[#3a3a3a]">
                  <th className="text-left px-3 py-2 w-1/4">Part Number</th>
                  <th className="text-left px-3 py-2 w-1/4">Description$</th>
                  <th className="text-left px-3 py-2 w-1/4">Unit Price</th>
                  <th className="text-left px-3 py-2 w-1/4">MRP</th>
                  <th className="text-left px-3 py-2 w-1/4">Qty</th>
                  <th className="text-left px-3 py-2 w-1/4">Last 7 days %</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#3a3a3a]">
                  <td className="px-3 py-2 flex items-center space-x-2">
                    <i className="fab fa-tesla text-xs"></i>
                    <span>TSLA</span>
                  </td>
                  <td className="px-3 py-2">$26,000.21</td>
                  <td className="px-3 py-2 text-[#3aff7a]">+3.4%</td>
                  <td className="px-3 py-2">$ 564.00 B</td>
                  <td className="px-3 py-2">$ 3.7B</td>
                  <td className="px-3 py-2 text-[#3aff7a]">
                    <img
                      alt="Green upward trend line chart for last 7 days"
                      className="inline-block"
                      height="20"
                      src="https://storage.googleapis.com/a1aa/image/6e357481-4625-4329-fdcf-729f6d516587.jpg"
                      width="60"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2 flex items-center space-x-2">
                    <i className="fab fa-apple text-xs"></i>
                    <span>AAPL</span>
                  </td>
                  <td className="px-3 py-2">$32,000.21</td>
                  <td className="px-3 py-2 text-[#ff4a4a]">-3.4%</td>
                  <td className="px-3 py-2">$ 564.00 B</td>
                  <td className="px-3 py-2">$ 3.7B</td>
                  <td className="px-3 py-2 text-[#ff4a4a]">
                    <img
                      alt="Red downward trend line chart for last 7 days"
                      className="inline-block"
                      height="20"
                      src="https://storage.googleapis.com/a1aa/image/1461d482-efbd-44af-cb09-baa6c30c004b.jpg"
                      width="60"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          aria-label="Watchlist"
          className="w-full md:w-72 bg-[#222222] rounded-xl p-6 text-xs text-white flex flex-col"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2 text-xs font-semibold">
              <button
                aria-label="Most Viewed"
                className="px-3 py-1 rounded-full bg-[#3a8aff] cursor-default"
              >
                Most Viewed
              </button>
              <button
                aria-label="Gainers"
                className="px-3 py-1 rounded-full bg-[#3a3a3a] hover:bg-[#4a4a4a]"
              >
                Gainers
              </button>
              <button
                aria-label="Losers"
                className="px-3 py-1 rounded-full bg-[#3a3a3a] hover:bg-[#4a4a4a]"
              >
                Losers
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Spotify</p>
                <p className="text-[#7a7a7a] text-[10px]">NYSE: SPOT</p>
              </div>
              <div className="text-[#3aff7a] font-semibold text-xs flex items-center space-x-1">
                <span>$2,310.5</span>
                <i className="fas fa-arrow-up text-[10px]"></i>
                <span>+2.38%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Amazon</p>
                <p className="text-[#7a7a7a] text-[10px]">NYSE: AMZN</p>
              </div>
              <div className="text-[#3aff7a] font-semibold text-xs flex items-center space-x-1">
                <span>$2,310.5</span>
                <i className="fas fa-arrow-up text-[10px]"></i>
                <span>+2.38%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
