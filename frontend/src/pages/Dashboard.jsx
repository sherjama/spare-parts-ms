import { partsService, shelvesService, Shelvebox } from "../index.js";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { addParts, addShelves } from "../store/stockSlice.js";
import { useEffect } from "react";

const Dashboard = () => {
  const userdata = useSelector((state) => state.userdata.userdata?.user);
  const userId = useSelector((state) => state.userdata.userdata.user._id);
  const Parts = useSelector((state) => state.stock.Parts?.data);

  const Shelves = useSelector((state) => state.stock.Shelves?.data);
  const totalMRP = Array.isArray(Parts)
    ? Parts.reduce((sum, part) => sum + (part.MRP || 0), 0)
    : 0;
  const reloadTriggerPart = useSelector(
    (state) => state.stock.reloadTriggerPart
  );
  const dispatch = useDispatch();

  // console.log("Parts from Redux:", Parts);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const userParts = await partsService.getAllParts(userId);
        const userShelves = await shelvesService.listShelves();

        if (userParts || userShelves) {
          dispatch(addParts(userParts.data));
          dispatch(addShelves(userShelves.data));
        }
      } catch (error) {
        toast.info(error?.response?.data?.message || "Error fetching stock", {
          position: "top-center",
        });
      }
    };

    if (userId) fetchStock();
  }, [reloadTriggerPart, userId, dispatch]);

  return (
    <div className="w-full h-screen  border border-[#2a3a6f] bg-[#121212] p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <aside className="flex flex-col justify-between w-full md:w-56 text-white h-[95vh]">
          <div>
            <h1 className="text-white text-xl font-nexar3 mb-1">NEXAR</h1>
            <p className="mt-6 text-white text-sm font-normal">
              Welcome,
              <span className="font-semibold"> {userdata.username}</span>
            </p>
            <p className="text-[#7a7a7a] text-xs mb-6">
              Here's your stock portfolio overview
            </p>
            <nav className="space-y-3">
              <button className="flex items-center space-x-2 w-full text-white bg-[#3a8aff] rounded-md px-4 py-2 text-sm font-semibold">
                <i className="fas fa-home text-xs"></i>
                <span>Dashboard</span>
              </button>
              <button className="flex items-center space-x-2 w-full text-[#b0b0b0] hover:text-white text-sm font-normal">
                <i className="fas fa-briefcase text-xs"></i>
                <span>Portfolio</span>
              </button>
              <button className="flex items-center space-x-2 w-full text-[#b0b0b0] hover:text-white text-sm font-normal">
                <i className="fas fa-chart-line text-xs"></i>
                <span>Analysis</span>
              </button>
              <button className="flex items-center space-x-2 w-full text-[#b0b0b0] hover:text-white text-sm font-normal">
                <i className="fas fa-store text-xs"></i>
                <span>Market</span>
              </button>
            </nav>
          </div>
          <div className="mt-10 space-y-3 text-[#7a7a7a] text-xs font-normal">
            <button className="flex items-center space-x-2 w-full hover:text-white">
              <i className="fas fa-users text-[10px]"></i>
              <span>Community</span>
            </button>
            <button className="flex items-center space-x-2 w-full hover:text-white">
              <i className="fas fa-question-circle text-[10px]"></i>
              <span>Help &amp; Support</span>
            </button>
          </div>
        </aside>
        <main className="flex-1 mt-6 md:mt-0 flex flex-col space-y-6 text-white">
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
              <div className="flex items-center space-x-2 bg-[#222222] rounded-full px-3 py-1 cursor-pointer">
                <img
                  alt="User profile picture of a person with short hair and light skin tone"
                  className="rounded-full w-6 h-6 object-cover"
                  height="24"
                  src="https://storage.googleapis.com/a1aa/image/16d8280b-ea13-4900-d540-af9636417686.jpg"
                  width="24"
                />
                <div className="text-xs leading-tight max-w-24 overflow-hidden">
                  <p className="font-nexar1">{userdata.username}</p>
                  <p className="text-[#7a7a7a]">{userdata.email}</p>
                </div>
              </div>
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
                <h2 className="text-xs text-[#7a7a7a] font-semibold">
                  Shelves
                </h2>
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
                      <th className="text-left px-3 py-2 w-1/4">Stock</th>
                      <th className="text-left px-3 py-2 w-1/4">
                        Last Price $
                      </th>
                      <th className="text-left px-3 py-2 w-1/4">Change %</th>
                      <th className="text-left px-3 py-2 w-1/4">
                        Market Cap $
                      </th>
                      <th className="text-left px-3 py-2 w-1/4">Volume $</th>
                      <th className="text-left px-3 py-2 w-1/4">
                        Last 7 days %
                      </th>
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
      </div>
    </div>
  );
};

export default Dashboard;
