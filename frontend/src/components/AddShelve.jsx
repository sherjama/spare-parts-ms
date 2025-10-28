import React from "react";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { triggerReloadShelve } from "@/store/stockSlice";
import shelvesService from "@/services/shelves.service";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

const AddShelve = ({ setShelveToggle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log("Creating shelf:", data.shelfName);
    try {
      const res = await shelvesService.createShelve(data.shelfName);
      if (res) {
        dispatch(triggerReloadShelve());
        reset();
        setShelveToggle(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.messege || "Server Error", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center text-white w-[25vw] px-4">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900 p-8 rounded-xl shadow-xl w-full "
        autoComplete="off"
      >
        <div
          className="w-full flex justify-end p-2 "
          onClick={() => setShelveToggle(false)}
        >
          <ImCross />
        </div>
        <h2 className="text-3xl font-nexar1 text-center ">Create Shelf</h2>

        {/* Shelf Name Input */}
        <div className="flex flex-col">
          <label htmlFor="shelfName" className="mb-1 text-sm font-medium">
            Shelf Name
          </label>
          <div className="flex flex-col space-y-6 ">
            <input
              id="shelfName"
              {...register("shelfName", {
                required: "Shelf name is required",
                maxLength: {
                  value: 50,
                  message: "Shelf name must be under 50 characters",
                },
              })}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter shelf name"
            />
            {errors.shelfName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.shelfName.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Create Shelf
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddShelve;
