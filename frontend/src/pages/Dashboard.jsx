import { useSelector, useDispatch } from "react-redux";
import { fetchAllStock } from "@/store/stockSlice.js";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { Shelvebox } from "../index.js";

const Dashboard = ({ className }) => {
  const userId = useSelector((state) => state.userdata.userdata.user._id);
  const Parts = useSelector((state) => state.stock.Parts?.data);

  const Shelves = useSelector((state) => state.stock.Shelves?.data);
  const totalMRP = Array.isArray(Parts)
    ? Parts.reduce((sum, part) => sum + (part.MRP || 0), 0)
    : 0;

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.stock);

  useEffect(() => {
    if (userId) dispatch(fetchAllStock(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <main
      className={`flex mt-6 md:mt-0  flex-col space-y-6 text-white ${className} bg-[#121212]  p-4`}
    >
      <ToastContainer />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex space-x-2">
          <button className="bg-[#222222] rounded-full px-4 py-1 text-xs font-semibold hover:bg-[#3a3a3a]">
            Market
          </button>
          <button className="bg-[#3a3a3a] rounded-full px-4 py-1 text-xs font-semibold hover:bg-[#4a4a4a]">
            Wallets
          </button>
          <button className="bg-[#3a3a3a] rounded-full px-4 py-1 text-xs font-semibold hover:bg-[#4a4a4a]">
            Tools
          </button>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <input
            className="flex-1 bg-[#222222] rounded-full px-4 py-2 text-xs placeholder-[#7a7a7a] focus:outline-none"
            placeholder="Ask stocks anything"
            type="text"
          />
          <button
            aria-label="Search"
            className="bg-[#222222] rounded-full p-2 hover:bg-[#3a3a3a]"
          >
            <i className="fas fa-search text-xs"></i>
          </button>
          <button
            aria-label="Settings"
            className="bg-[#222222] rounded-full p-2 hover:bg-[#3a3a3a]"
          >
            <i className="fas fa-cog text-xs"></i>
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        <div className="flex-1 bg-[#222222] rounded-xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs text-[#7a7a7a] font-semibold">
              Total Parts Value
            </h2>
          </div>
          <div>
            <p className="text-3xl font-semibold">₹ {totalMRP}</p>
            <p className="text-xs text-[#3aff7a] flex items-center space-x-1 mt-1 font-semibold">
              <i className="fas fa-arrow-up text-[10px]"></i>
              <span>+4.85% ($ 530)</span>
            </p>
          </div>
        </div>
        <div className="flex-1 bg-[#222222] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs text-[#7a7a7a] font-semibold">Shelves</h2>
            <button
              aria-label="See all portfolio"
              className="flex items-center space-x-1 text-xs text-[#7a7a7a] hover:text-white"
            >
              <span>See all</span>
              <i className="fas fa-chevron-right text-[10px]"></i>
            </button>
          </div>
          <div className="flex">
            {Parts &&
              Shelves.map((shelf, idx) => (
                <div className="flex h-ful w-full" key={shelf._id}>
                  <Shelvebox Shelve={shelf} />
                </div>
              ))}
          </div>
        </div>
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
