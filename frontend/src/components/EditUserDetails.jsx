import React from "react";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import authservice from "@/services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/authSlice";

const EditUserDetails = ({ setToggle, field, fieldName }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const userdata = useSelector((state) => state.userdata.userdata.user);
  const dispatch = useDispatch();

  const onSubmit = async ({ updatedField }) => {
    const currentValue = userdata[field];

    if (!updatedField || updatedField === currentValue) {
      toast.error("Please enter a new value different from the current one", {
        position: "top-center",
      });
      setTimeout(() => {
        setToggle(false);
      }, 1000);
      return;
    }

    try {
      const res = await authservice.UpdateUserDetail({
        [field]: updatedField,
      });

      if (res?.data?.data) {
        dispatch(login({ user: res.data.data }));
        reset();
        setToggle(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Error", {
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
          onClick={() => setToggle(false)}
        >
          <ImCross />
        </div>
        <h2 className="text-3xl font-nexar1 text-center ">Edit {fieldName}</h2>

        <div className="flex flex-col mt-6">
          <div className="flex flex-col space-y-6 ">
            <input
              id="newField"
              {...register("updatedField", {
                required: "Field name is required",
                maxLength: {
                  value: 15,
                  message: "Field name must be under 15 characters",
                },
              })}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={`Enter new ${fieldName}`}
            />
            {errors.updatedField && (
              <p className="text-red-500 text-sm mt-1">
                {errors.updatedField.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200"
            >
              Update field
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUserDetails;
