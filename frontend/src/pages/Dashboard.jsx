import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const userdata = useSelector((state) => state.userdata.userdata?.user);

  return (
    <div class="w-full h-screen rounded-xl border border-[#2a3a6f] bg-[#121212] p-6 md:p-8">
      <div class="flex flex-col md:flex-row md:space-x-8">
        <aside class="flex flex-col justify-between w-full md:w-56 text-white h-[95vh]">
          <div>
            <h1 class="text-white text-xl font-nexar3 mb-1">NEXAR</h1>
            <p class="mt-6 text-white text-sm font-normal">
              Welcome,
              <span class="font-semibold"> {userdata.username}</span>
            </p>
            <p class="text-[#7a7a7a] text-xs mb-6">
              Here's your stock portfolio overview
            </p>
            <nav class="space-y-3">
              <button class="flex items-center space-x-2 w-full text-white bg-[#3a8aff] rounded-md px-4 py-2 text-sm font-semibold">
                <i class="fas fa-home text-xs"></i>
                <span>Dashboard</span>
              </button>
              <button class="flex items-center space-x-2 w-full text-[#b0b0b0] hover:text-white text-sm font-normal">
                <i class="fas fa-briefcase text-xs"></i>
                <span>Portfolio</span>
              </button>
              <button class="flex items-center space-x-2 w-full text-[#b0b0b0] hover:text-white text-sm font-normal">
                <i class="fas fa-chart-line text-xs"></i>
                <span>Analysis</span>
              </button>
              <button class="flex items-center space-x-2 w-full text-[#b0b0b0] hover:text-white text-sm font-normal">
                <i class="fas fa-store text-xs"></i>
                <span>Market</span>
              </button>
            </nav>
          </div>
          <div class="mt-10 space-y-3 text-[#7a7a7a] text-xs font-normal">
            <button class="flex items-center space-x-2 w-full hover:text-white">
              <i class="fas fa-users text-[10px]"></i>
              <span>Community</span>
            </button>
            <button class="flex items-center space-x-2 w-full hover:text-white">
              <i class="fas fa-question-circle text-[10px]"></i>
              <span>Help &amp; Support</span>
            </button>
          </div>
        </aside>
        <main class="flex-1 mt-6 md:mt-0 flex flex-col space-y-6 text-white">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div class="flex space-x-2">
              <button class="bg-[#222222] rounded-full px-4 py-1 text-xs font-semibold hover:bg-[#3a3a3a]">
                Market
              </button>
              <button class="bg-[#3a3a3a] rounded-full px-4 py-1 text-xs font-semibold hover:bg-[#4a4a4a]">
                Wallets
              </button>
              <button class="bg-[#3a3a3a] rounded-full px-4 py-1 text-xs font-semibold hover:bg-[#4a4a4a]">
                Tools
              </button>
            </div>
            <div class="flex items-center space-x-3 w-full md:w-auto">
              <input
                class="flex-1 bg-[#222222] rounded-full px-4 py-2 text-xs placeholder-[#7a7a7a] focus:outline-none"
                placeholder="Ask stocks anything"
                type="text"
              />
              <button
                aria-label="Search"
                class="bg-[#222222] rounded-full p-2 hover:bg-[#3a3a3a]"
              >
                <i class="fas fa-search text-xs"></i>
              </button>
              <button
                aria-label="Settings"
                class="bg-[#222222] rounded-full p-2 hover:bg-[#3a3a3a]"
              >
                <i class="fas fa-cog text-xs"></i>
              </button>
              <div class="flex items-center space-x-2 bg-[#222222] rounded-full px-3 py-1 cursor-pointer">
                <img
                  alt="User profile picture of a person with short hair and light skin tone"
                  class="rounded-full w-6 h-6 object-cover"
                  height="24"
                  src="https://storage.googleapis.com/a1aa/image/16d8280b-ea13-4900-d540-af9636417686.jpg"
                  width="24"
                />
                <div class="text-xs leading-tight max-w-24 overflow-hidden">
                  <p class="font-nexar1">{userdata.username}</p>
                  <p class="text-[#7a7a7a]">{userdata.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
            <div class="flex-1 bg-[#222222] rounded-xl p-6 flex flex-col justify-between">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xs text-[#7a7a7a] font-semibold">
                  Total Holding
                </h2>
                <div class="flex items-center space-x-1 text-xs text-[#7a7a7a] cursor-pointer select-none">
                  <span>6M</span>
                  <i class="fas fa-chevron-down text-[8px]"></i>
                </div>
              </div>
              <div>
                <p class="text-3xl font-semibold">$ 12 304.11</p>
                <p class="text-xs text-[#3aff7a] flex items-center space-x-1 mt-1 font-semibold">
                  <i class="fas fa-arrow-up text-[10px]"></i>
                  <span>+4.85% ($ 530)</span>
                </p>
              </div>
            </div>
            <div class="flex-1 bg-[#222222] rounded-xl p-4 flex flex-col justify-between">
              <div class="flex justify-between items-center mb-3">
                <h2 class="text-xs text-[#7a7a7a] font-semibold">
                  My Portfolio
                </h2>
                <button
                  aria-label="See all portfolio"
                  class="flex items-center space-x-1 text-xs text-[#7a7a7a] hover:text-white"
                >
                  <span>See all</span>
                  <i class="fas fa-chevron-right text-[10px]"></i>
                </button>
              </div>
              <div class="grid grid-cols-3 md:grid-cols-6 gap-2">
                <div class="bg-[#121212] rounded-md p-2 flex flex-col text-xs font-semibold">
                  <p class="text-[#3aff7a]">$ 1,721.3</p>
                  <p class="text-[#3aff7a] text-[8px] font-normal">+3.25%</p>
                  <p class="mt-1">AAPL</p>
                  <p class="text-[#7a7a7a] text-[8px] font-normal">Units 104</p>
                </div>
                <div class="bg-[#121212] rounded-md p-2 flex flex-col text-xs font-semibold">
                  <p class="text-[#ff4a4a]">$ 1,521.3</p>
                  <p class="text-[#ff4a4a] text-[8px] font-normal">-1.25%</p>
                  <p class="mt-1">TSLA</p>
                  <p class="text-[#7a7a7a] text-[8px] font-normal">Units 124</p>
                </div>
                <div class="bg-[#121212] rounded-md p-2 flex flex-col text-xs font-semibold">
                  <p class="text-[#3aff7a]">$ 1,721.3</p>
                  <p class="text-[#3aff7a] text-[8px] font-normal">+3.25%</p>
                  <p class="mt-1">MSFT</p>
                  <p class="text-[#7a7a7a] text-[8px] font-normal">Units 110</p>
                </div>
                <div class="bg-[#121212] rounded-md p-2 flex flex-col text-xs font-semibold">
                  <p class="text-[#3aff7a]">$ 1,721.3</p>
                  <p class="text-[#3aff7a] text-[8px] font-normal">+3.25%</p>
                  <p class="mt-1">GOOG</p>
                  <p class="text-[#7a7a7a] text-[8px] font-normal">Units 110</p>
                </div>
                <div class="bg-[#121212] rounded-md p-2 flex flex-col text-xs font-semibold">
                  <p class="text-[#3aff7a]">$ 1,721.3</p>
                  <p class="text-[#3aff7a] text-[8px] font-normal">+3.25%</p>
                  <p class="mt-1">TSLA</p>
                  <p class="text-[#7a7a7a] text-[8px] font-normal">Units 110</p>
                </div>
                <div class="bg-[#121212] rounded-md p-2 flex flex-col text-xs font-semibold">
                  <p class="text-[#3aff7a]">$ 1,721.3</p>
                  <p class="text-[#3aff7a] text-[8px] font-normal">+3.25%</p>
                  <p class="mt-1">NVDA</p>
                  <p class="text-[#7a7a7a] text-[8px] font-normal">Units 104</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
            <div
              aria-label="Portfolio Overview"
              class="flex-1 bg-[#222222] rounded-xl p-6 text-xs text-white"
            >
              <h3 class="font-semibold mb-4">Portfolio Overview</h3>
              <div class="overflow-x-auto">
                <table class="w-full table-fixed border-collapse border border-[#3a3a3a]">
                  <thead>
                    <tr class="border-b border-[#3a3a3a]">
                      <th class="text-left px-3 py-2 w-1/4">Stock</th>
                      <th class="text-left px-3 py-2 w-1/4">Last Price $</th>
                      <th class="text-left px-3 py-2 w-1/4">Change %</th>
                      <th class="text-left px-3 py-2 w-1/4">Market Cap $</th>
                      <th class="text-left px-3 py-2 w-1/4">Volume $</th>
                      <th class="text-left px-3 py-2 w-1/4">Last 7 days %</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-[#3a3a3a]">
                      <td class="px-3 py-2 flex items-center space-x-2">
                        <i class="fab fa-tesla text-xs"></i>
                        <span>TSLA</span>
                      </td>
                      <td class="px-3 py-2">$26,000.21</td>
                      <td class="px-3 py-2 text-[#3aff7a]">+3.4%</td>
                      <td class="px-3 py-2">$ 564.00 B</td>
                      <td class="px-3 py-2">$ 3.7B</td>
                      <td class="px-3 py-2 text-[#3aff7a]">
                        <img
                          alt="Green upward trend line chart for last 7 days"
                          class="inline-block"
                          height="20"
                          src="https://storage.googleapis.com/a1aa/image/6e357481-4625-4329-fdcf-729f6d516587.jpg"
                          width="60"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="px-3 py-2 flex items-center space-x-2">
                        <i class="fab fa-apple text-xs"></i>
                        <span>AAPL</span>
                      </td>
                      <td class="px-3 py-2">$32,000.21</td>
                      <td class="px-3 py-2 text-[#ff4a4a]">-3.4%</td>
                      <td class="px-3 py-2">$ 564.00 B</td>
                      <td class="px-3 py-2">$ 3.7B</td>
                      <td class="px-3 py-2 text-[#ff4a4a]">
                        <img
                          alt="Red downward trend line chart for last 7 days"
                          class="inline-block"
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
              class="w-full md:w-72 bg-[#222222] rounded-xl p-6 text-xs text-white flex flex-col"
            >
              <div class="flex justify-between items-center mb-4">
                <div class="flex space-x-2 text-xs font-semibold">
                  <button
                    aria-label="Most Viewed"
                    class="px-3 py-1 rounded-full bg-[#3a8aff] cursor-default"
                  >
                    Most Viewed
                  </button>
                  <button
                    aria-label="Gainers"
                    class="px-3 py-1 rounded-full bg-[#3a3a3a] hover:bg-[#4a4a4a]"
                  >
                    Gainers
                  </button>
                  <button
                    aria-label="Losers"
                    class="px-3 py-1 rounded-full bg-[#3a3a3a] hover:bg-[#4a4a4a]"
                  >
                    Losers
                  </button>
                </div>
              </div>
              <div class="flex flex-col space-y-3">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-semibold">Spotify</p>
                    <p class="text-[#7a7a7a] text-[10px]">NYSE: SPOT</p>
                  </div>
                  <div class="text-[#3aff7a] font-semibold text-xs flex items-center space-x-1">
                    <span>$2,310.5</span>
                    <i class="fas fa-arrow-up text-[10px]"></i>
                    <span>+2.38%</span>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <div>
                    <p class="font-semibold">Amazon</p>
                    <p class="text-[#7a7a7a] text-[10px]">NYSE: AMZN</p>
                  </div>
                  <div class="text-[#3aff7a] font-semibold text-xs flex items-center space-x-1">
                    <span>$2,310.5</span>
                    <i class="fas fa-arrow-up text-[10px]"></i>
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
