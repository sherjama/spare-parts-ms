import React from "react";
import Pfp from "../components/Pfp";

const Profile = () => {
  return (
    <div className="w-full">
      <div className="bg-[#18191f] text-white min-h-screen flex w-full">
        <aside className="w-16 flex flex-col items-center py-8 space-y-8 border-r border-gray-700">
          <button aria-label="Home" className="text-gray-400 hover:text-white">
            <i className="fas fa-home text-xl"></i>
          </button>
          <button aria-label="Globe" className="text-gray-400 hover:text-white">
            <i className="fas fa-globe text-xl "></i>
          </button>
          <button
            aria-label="Settings"
            className="text-gray-400 hover:text-white"
          >
            <i className="fas fa-cog text-xl"></i>
          </button>
          <button
            aria-label="Profile"
            className="bg-white text-[#18191f] rounded-md p-2"
          >
            <i className="fas fa-user text-xl"></i>
          </button>
        </aside>
        <div className="flex-1 p-6 md:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                aria-label="Notifications"
                className="text-gray-400 hover:text-white text-lg"
              >
                <i className="far fa-bell"></i>
              </button>
              <button
                aria-label="Crown"
                className="bg-[#3a5a22] p-2 rounded-full text-white text-lg"
              >
                <i className="fas fa-crown"></i>
              </button>
              <div className="flex items-center space-x-3 bg-[#22232a] rounded-full px-3 py-1 cursor-pointer select-none">
                <Pfp />
                <div className="text-left">
                  <p className="text-white text-sm font-semibold leading-none">
                    Maria Fernanda
                  </p>
                  <p className="text-[#7ed957] text-xs leading-none font-medium">
                    Premium User
                  </p>
                </div>
                <i className="fas fa-chevron-down text-gray-400"></i>
              </div>
            </div>
          </div>

          <section>
            <h1 className="text-white text-2xl font-bold">Profile</h1>
            <p className="text-gray-500 text-xs mt-1 max-w-[400px]">
              View all your profile details here.
            </p>
            <hr className="border-gray-700 mt-4" />
          </section>

          <section className="mt-6 space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
              <div className="flex flex-col items-center bg-[#22232a] rounded-lg p-6 w-full md:w-1/3 border border-gray-700">
                <h2 className="text-white font-semibold text-lg mb-1">
                  Maria Fernanda
                </h2>
                <p className="text-[#7ed957] text-xs font-medium mb-4">
                  Premium User
                </p>
                <div
                  className="rounded-full bg-[#4a4f59] p-2 border border-gray-600"
                  style={{ "box-shadow": "inset 0 0 10px #3a3f49" }}
                >
                  <img
                    alt="Avatar of a young woman with short brown hair and blue polka dot shirt, smiling"
                    className="rounded-full w-48 h-48 object-cover"
                    height="200"
                    src="https://storage.googleapis.com/a1aa/image/03b31c60-ad1f-4db5-2fae-af04b78d9b7d.jpg"
                    width="200"
                  />
                </div>
              </div>
              <div className="bg-[#22232a] rounded-lg p-6 w-full md:w-2/3 border border-gray-700 relative">
                <div
                  className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full bg-[#3a5a22] border border-[#2a3a12]"
                  title="Online status"
                ></div>
                <h3 className="text-white font-semibold mb-4 text-sm">
                  Bio &amp; other details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs text-gray-400">
                  <div>
                    <p className="mb-0.5 text-gray-500 text-[10px]">My Role</p>
                    <p className="text-white font-semibold text-xs">
                      Beatmaker
                    </p>
                  </div>
                  <div>
                    <p className="mb-0.5 text-gray-500 text-[10px]">
                      My Experience Level
                    </p>
                    <p className="text-white font-semibold text-xs">
                      Intermediate
                    </p>
                  </div>
                  <div>
                    <p className="mb-0.5 text-gray-500 text-[10px]">
                      My 3 Favorite Artists
                    </p>
                    <p className="text-white font-semibold text-xs">
                      Ninho, Travis Scott, Metro Boomin
                    </p>
                  </div>
                  <div>
                    <p className="mb-0.5 text-gray-500 text-[10px]">
                      My Favorite Music Genre
                    </p>
                    <p className="text-white font-semibold text-xs">Trap</p>
                  </div>
                  <div>
                    <p className="mb-0.5 text-gray-500 text-[10px]">
                      The Software or Equipment I Use
                    </p>
                    <p className="text-white font-semibold text-xs">Ableton</p>
                  </div>
                  <div>
                    <p className="mb-0.5 text-gray-500 text-[10px]">
                      My Preferred Music Mood
                    </p>
                    <p className="text-white font-semibold text-xs">
                      Melancholic
                    </p>
                  </div>
                  <div>
                    <p className="mb-0.5 text-gray-500 text-[10px]">
                      My City or Region
                    </p>
                    <p className="text-white font-semibold text-xs">
                      California, USA
                    </p>
                  </div>
                  <div>
                    <p className="mb-0.5 text-gray-500 text-[10px]">
                      Availability
                    </p>
                    <div className="inline-flex items-center space-x-2 text-[10px] font-medium text-[#7ed957] bg-[#3a5a22] rounded-full px-3 py-0.5 border border-[#2a3a12]">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#3a5a22] border border-[#2a3a12] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7ed957]"></div>
                      </div>
                      <span>Available for Collaboration</span>
                    </div>
                  </div>
                  <div>
                    <p className="mb-0.5 text-gray-500 text-[10px]">Badges</p>
                    <p className="text-[#3a9ed9] text-[10px] flex items-center space-x-1 font-medium">
                      <i className="fas fa-certificate text-[10px]"></i>
                      <span>Top Collaborator</span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-0.5 text-gray-500 text-[10px]">Tags</p>
                    <p className="text-white text-xs font-semibold">
                      #Drill, #Melancholic, #Rap-US
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#22232a] rounded-lg p-6 border border-gray-700 w-full max-w-4xl">
              <h3 className="text-white font-semibold mb-4 text-sm">
                Social Media
              </h3>
              <div className="flex space-x-4">
                <a
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-[#18191f] border border-gray-700 flex items-center justify-center hover:border-red-600 transition"
                  href="#"
                >
                  <img
                    alt="YouTube logo icon in red and white"
                    className="w-5 h-5"
                    height="20"
                    src="https://storage.googleapis.com/a1aa/image/b248b2a3-802f-4be2-e418-8a4160fd3eab.jpg"
                    width="20"
                  />
                </a>
                <a
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-[#18191f] border border-gray-700 flex items-center justify-center hover:border-pink-500 transition"
                  href="#"
                >
                  <img
                    alt="Instagram logo icon in gradient pink and orange"
                    className="w-5 h-5"
                    height="20"
                    src="https://storage.googleapis.com/a1aa/image/ec575759-311e-4e3e-d171-aea31669867e.jpg"
                    width="20"
                  />
                </a>
                <a
                  aria-label="TikTok"
                  className="w-8 h-8 rounded-full bg-[#18191f] border border-gray-700 flex items-center justify-center hover:border-black transition"
                  href="#"
                >
                  <img
                    alt="TikTok logo icon in black, white, and red"
                    className="w-5 h-5"
                    height="20"
                    src="https://storage.googleapis.com/a1aa/image/8b502b14-19b2-4c69-d7e0-9c6f0c62f0dc.jpg"
                    width="20"
                  />
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
