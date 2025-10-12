import React, { useState } from "react";
import { Pfp, Button, EditUserDetails } from "../index.js";
import { useSelector, useDispatch } from "react-redux";
import authservice from "../services/auth.service.js";
import { logout } from "../store/authSlice.js";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../store/loadSlice.js";
import { ToastContainer, toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";

const Profile = ({ className }) => {
  const [toggle, setToggle] = useState(false);
  const [fieldName, setFieldName] = useState();
  const [field, setField] = useState();
  const fields = [
    { label: "Username", key: "username" },
    { label: "City", key: "city" },
    { label: "Email", key: "email" },
    { label: "State", key: "state" },
    { label: "Ferm Name", key: "fermName" },
    { label: "Region", key: "region" },
    { label: "Contact", key: "contact" },
  ];

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

  const editHandler = async (field, label) => {
    const currentValue = userdata[field];
    setToggle((prev) => !prev);
    setFieldName(label);
    setField(field);
  };

  return (
    <div className={`${className} bg-[#18191f] text-white flex `}>
      <ToastContainer />
      {toggle && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-50">
          <EditUserDetails
            field={field}
            setToggle={setToggle}
            fieldName={fieldName}
          />
        </div>
      )}
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
                {userdata?.username}
              </h2>
              <div className="rounded-full bg-[#4a4f59] p-2 border border-gray-600">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                {fields.map(({ label, key }) => (
                  <DataField
                    key={key}
                    label={label}
                    value={userdata[key]}
                    fieldKey={key}
                    onEdit={editHandler}
                  />
                ))}
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

const DataField = ({ label, value, fieldKey, onEdit }) => {
  return (
    <div>
      <p className="mb-0.5 text-gray-500 text-sm">{label}</p>
      <div className="flex items-center justify-between ">
        <p className="text-white font-nexar2 text-lg">{value}</p>
        <span
          className="hover:bg-slate-600 p-2 rounded-full"
          onClick={() => onEdit(fieldKey, label)}
        >
          <FaRegEdit />
        </span>
      </div>
    </div>
  );
};

export default Profile;
