import React from "react";
import { Pfp, Button } from "../index.js";
import { useSelector, useDispatch } from "react-redux";
import authservice from "../services/auth.service.js";
import { logout } from "../store/authSlice.js";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../store/loadSlice.js";
import { ToastContainer, toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";

const Profile = ({ className }) => {
  const userdata = useSelector((state) => state.userdata.userdata.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    dispatch(setLoading(true));
    try {
      const data = await authservice.Logout();
      if (data) {
        dispatch(logout());
        dispatch(setLoading(false));
        navigate("/landing");
      }
    } catch (error) {
      toast.info(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  const editHandler = async (txt) => {};

  return (
    <div className={`${className} bg-[#18191f] text-white flex `}>
      <ToastContainer />
      <div className="flex-1 p-6 sm:p-10 space-y-6 ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
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
          </div>
        </div>

        <section>
          <h1 className="text-white text-2xl font-bold">Profile</h1>
          <p className="text-gray-500 text-lg mt-1 max-w-[400px]">
            View all your profile details here.
          </p>
          <hr className="border-gray-700 mt-4" />
        </section>

        <section className="mt-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0">
            <div className="flex flex-col items-center bg-[#22232a] rounded-lg p-6 w-full sm:w-1/3 border border-gray-700">
              <h2 className="text-white font-nexar2 text-lg mb-1">
                {userdata.username}
              </h2>
              {/* <p className="text-[#7ed957] text-lg font-medium mb-4">
                  Premium User
                </p> */}
              <div
                className="rounded-full bg-[#4a4f59] p-2 border border-gray-600"
                style={{ "box-shadow": "inset 0 0 10px #3a3f49" }}
              >
                <Pfp className="size-80" />
              </div>
            </div>
            <div className="bg-[#22232a] rounded-lg p-6 w-full sm:w-2/3 border border-gray-700 relative">
              <div
                className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full bg-[#3a5a22] border border-[#2a3a12]"
                title="Online status"
              ></div>
              <h3 className="text-white font-nexar2 mb-4 text-md">
                Other details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-lg text-gray-400">
                <div>
                  <p className="mb-0.5 text-gray-500 text-sm">Ferm Name</p>
                  <div className="flex items-center justify-between ">
                    <p className="text-white font-nexar2 text-lg">
                      {userdata.fermName}
                    </p>
                    <span onClick={(e) => editHandler("fermName", e)}>
                      <FaRegEdit />
                    </span>
                  </div>
                </div>
                <div>
                  <p className="mb-0.5 text-gray-500 text-sm">State</p>
                  <div className="flex items-center justify-between ">
                    <p className="text-white font-nexar2 text-lg">
                      {userdata.state}
                    </p>
                    <span onClick={(e) => editHandler("state", e)}>
                      <FaRegEdit />
                    </span>
                  </div>
                </div>
                <div>
                  <p className="mb-0.5 text-gray-500 text-sm">Email</p>
                  <div className="flex items-center justify-between ">
                    <p className="text-white font-nexar2 text-lg">
                      {userdata.email}
                    </p>
                    <span onClick={(e) => editHandler("email", e)}>
                      <FaRegEdit />
                    </span>
                  </div>
                </div>
                <div>
                  <p className="mb-0.5 text-gray-500 text-sm">City</p>
                  <div className="flex items-center justify-between ">
                    <p className="text-white font-nexar2 text-lg">
                      {userdata.city}
                    </p>
                    <span onClick={(e) => editHandler("city", e)}>
                      <FaRegEdit />
                    </span>
                  </div>
                </div>
                <div>
                  <p className="mb-0.5 text-gray-500 text-sm">Contact no.</p>
                  <div className="flex items-center justify-between ">
                    <p className="text-white font-nexar2 text-lg">
                      {userdata.contact}
                    </p>
                    <span onClick={(e) => editHandler("contact", e)}>
                      <FaRegEdit />
                    </span>
                  </div>
                </div>
                <div>
                  <p className="mb-0.5 text-gray-500 text-sm">Region</p>
                  <div className="flex items-center justify-between ">
                    <p className="text-white font-nexar2 text-lg">
                      {userdata.region}
                    </p>
                    <span onClick={(e) => editHandler("region", e)}>
                      <FaRegEdit />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-20 flex items-start justify-end">
            <div>
              <Button
                text="Logout"
                bgColor="bg-red-500"
                textColor="text-white"
                className="uppercase font-nexar3"
                onClick={logoutHandler}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
