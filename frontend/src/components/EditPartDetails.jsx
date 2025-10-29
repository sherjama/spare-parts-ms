import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import partsService from "@/services/parts.service";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStock } from "@/store/stockSlice";

const EditPartDetails = ({ setPartToggle, partDetails }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      updatedPartName: partDetails.partName,
      updatedPrice: partDetails.Price,
      updatedShelve: partDetails.shelf,
    },
  });

  const [editableFields, setEditableFields] = useState({
    name: false,
    price: false,
  });
  const userId = useSelector((state) => state.userdata.userdata.user._id);
  const Shelves = useSelector((state) => state.stock.Shelves);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const updatedPart = {
        partNumber: partDetails.partNumber,
        partName: data.updatedPartName.trim() || partDetails.partName,
        shelf: data.updatedShelve || partDetails.shelf,
        Price: data.updatedPrice || partDetails.Price,
      };

      const res = await partsService.updatePart(updatedPart);

      if (res?.data?.success) {
        dispatch(fetchAllStock(userId));
        setPartToggle(false);
        reset();
        toast.success("Part details updated successfully!");
      } else {
        toast.error(res?.response?.data?.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating part details");
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
          onClick={() => setPartToggle(false)}
        >
          <ImCross />
        </div>
        <h2 className="text-3xl font-nexar1 text-center ">Edit Part Details</h2>

        <div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col space-y-1 mt-5">
              <label>Part Name</label>
              <input
                {...register("updatedPartName")}
                readOnly={!editableFields.name}
                onFocus={() =>
                  setEditableFields((prev) => ({ ...prev, name: true }))
                }
                className={`px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  !editableFields.name ? "cursor-pointer" : ""
                }`}
              />

              {errors.updatedPartName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.updatedPartName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <label>Unit Price</label>
              <input
                {...register("updatedPrice")}
                readOnly={!editableFields.price}
                onFocus={() =>
                  setEditableFields((prev) => ({ ...prev, price: true }))
                }
                className={`px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  !editableFields.price ? "cursor-pointer" : ""
                }`}
              />

              {errors.updatedPrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.updatedPrice.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <label>Shelf Name</label>
              <select
                id="Shelf"
                {...register("updatedShelve")}
                className={`px-1 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 `}
                defaultValue={partDetails.shelf}
              >
                {Shelves.map((shelf, idx) => (
                  <option key={idx} value={shelf._id}>
                    {shelf.shelfName}
                  </option>
                ))}
              </select>

              {errors.updatedShelve && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.updatedShelve.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200 mt-5"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPartDetails;
