import React, { useState, useEffect } from "react";
import { Pfp, EditUserDetails, Heading } from "../index.js";
import { useSelector, useDispatch } from "react-redux";
import authservice from "../services/auth.service.js";
import { ToastContainer, toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { login } from "@/store/authSlice.js";

const Profile = ({ className }) => {
  const [toggle, setToggle] = useState(false);
  const [imageToggle, setImageToggle] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [field, setField] = useState("");
  const [Image, setImage] = useState(null);

  const fields = [
    { label: "Username", key: "username" },
    { label: "City", key: "city" },
    { label: "Email", key: "email" },
    { label: "State", key: "state" },
    { label: "Ferm Name", key: "fermName" },
    { label: "Region", key: "region" },
    { label: "Contact", key: "contact" },
  ];

  const userdata = useSelector((state) => state.userdata?.userdata?.user || {});

  const editHandler = (field, label) => {
    setToggle(true);
    setFieldName(label);
    setField(field);
  };

  return (
    <div
      className={`${className} dark:bg-[#18191f] text-white flex bg-gray-400`}
    >
      <ToastContainer />
      {toggle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <EditUserDetails
            field={field}
            setToggle={setToggle}
            fieldName={fieldName}
          />
        </div>
      )}
      {imageToggle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <PrevImage setImageToggle={setImageToggle} setImage={setImage} />
        </div>
      )}

      <div className="flex-1 p-6 sm:p-10 space-y-6">
        <section>
          <Heading title={"Profile"} />
          <p className="dark:text-gray-500 text-gray-950 text-lg mt-1 max-w-[400px]">
            View all your profile details here.
          </p>
          <hr className="border-gray-700 mt-4" />
        </section>

        <section className="mt-6 space-y-6">
          <div className="flex flex-col 2xl:flex-row sm:space-x-6 space-y-6 lg:space-y-0 items-center">
            <div className="flex flex-col items-center rounded-lg p-6 w-full lg:w-1/3">
              <div className="rounded-full border-2 border-gray-600">
                <Pfp className="size-80 max-[1270px]:size-70" />
              </div>
              <div
                className="w-full flex items-center justify-center font-nexar1 gap-2 mt-3 cursor-pointer hover:text-gray-300"
                onClick={() => setImageToggle(true)}
              >
                <FaRegEdit /> Change Logo
              </div>
            </div>

            <div className="dark:bg-[#22232a] bg-gray-900 rounded-lg p-6 w-full lg:w-2/3 border border-gray-700">
              <h3 className="text-white font-nexar2 mb-4 text-md">
                Other details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                {fields.map(({ label, key }) => (
                  <DataField
                    key={key}
                    label={label}
                    value={userdata[key] || "Not provided"}
                    fieldKey={key}
                    onEdit={editHandler}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const DataField = ({ label, value, fieldKey, onEdit }) => (
  <div>
    <p className="mb-0.5 text-gray-500 text-sm">{label}</p>
    <div className="flex items-center justify-between">
      <p className="text-white font-nexar2 text-lg break-words">{value}</p>
      <span
        className="hover:bg-slate-600 p-2 rounded-full cursor-pointer"
        onClick={() => onEdit(fieldKey, label)}
      >
        <FaRegEdit />
      </span>
    </div>
  </div>
);

export default Profile;

const PrevImage = ({ setImageToggle, setImage }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const pfpChangeHandler = async () => {
    if (!selectedFile) {
      toast.error("Please select an image before uploading", {
        position: "top-center",
      });
      return;
    }

    const formData = new FormData();
    formData.append("logo", selectedFile);

    try {
      setUploading(true);
      const res = await authservice.ChangeLogo(formData);

      if (res) {
        dispatch(login({ user: res.data.data }));
      }
      toast.success("Logo updated successfully!", { position: "top-center" });
      setImageToggle(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.data?.message ||
          "Something went wrong while uploading logo",
        { position: "top-center" }
      );
    } finally {
      setUploading(false);
    }
  };

  // Clean up object URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setImage("");
    };
  }, [previewUrl, setImageToggle]);

  return (
    <div className="flex flex-col bg-gray-900 p-6 rounded-2xl items-center justify-center text-white w-[25vw] px-4">
      <div
        className="w-full flex justify-end p-2 cursor-pointer"
        onClick={() => setImageToggle(false)}
      >
        <ImCross />
      </div>

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full min-h-52 object-cover rounded-md mb-4"
        />
      )}

      <h2 className="text-3xl font-nexar1 text-center">Change Logo</h2>

      <div className="flex flex-col mt-6 space-y-6">
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          onChange={handleImageChange}
          className="text-sm text-gray-300"
        />

        <button
          type="submit"
          onClick={pfpChangeHandler}
          disabled={uploading}
          className={`w-full py-2 px-4 font-semibold rounded-lg transition duration-200 ${
            uploading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};
