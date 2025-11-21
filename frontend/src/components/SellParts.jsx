import { useForm, useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDownIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "./ui/calendar";
import { Plus, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllStock } from "@/store/stockSlice";

import partsService from "@/services/parts.service";
import { toast, ToastContainer } from "react-toastify";

export default function SellPartsPage() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.stock.Parts);
  const userId = useSelector((state) => state.userdata?.userdata?.user?._id);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      customerName: "",
      address: "",
      mobileNumber: "",
      date: "",
      discount: 0,
      other: 0,
      parts: [{ partName: "", partNumber: "", Qty: 0, Price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "parts",
  });

  // date formater
  const dateFormater = (dateString) => {
    const rawDate = new Date(dateString);

    const day = String(rawDate.getDate()).padStart(2, "0");
    const month = rawDate.toLocaleString("en-US", { month: "short" });
    const year = String(rawDate.getFullYear()).slice(-2);

    setDate(`${day}-${month}-${year}`);
  };

  // Part Name Finder
  const handlePartName = (e, index) => {
    let part = inventory.filter((part) => part.partNumber === e.target.value);
    let partName = part?.length < 1 ? "" : part[0].partName;

    setValue(`parts.${index}.partName`, `${partName}`);
  };

  //On Submit
  const onSubmit = async (data) => {
    data.date = date;
    console.log("load", data);

    try {
      const res = await partsService.sellParts(data);
      if (res) {
        dispatch(fetchAllStock(userId));
        toast.success("Parts sell Successfully", {
          position: "top-center",
          autoClose: 2500,
        });
      }
    } catch (error) {
      toast.info(error?.response?.data?.message || "Server Error", {
        position: "top-center",
      });
    }
    reset();
    setDate("Select date");
  };

  const allFields = watch();

  useEffect(() => {
    const parts = allFields.parts || [];
    const discount = parseFloat(allFields.discount) || 0;
    const other = parseFloat(allFields.other) || 0;

    let partsTotal = 0;
    parts.forEach((part) => {
      const qty = parseFloat(part.Qty) || 0;
      const price = parseFloat(part.Price) || 0;
      partsTotal += qty * price;
    });

    const finalTotal = partsTotal + other - discount;
    setTotal(finalTotal >= 0 ? finalTotal : 0);
  }, [allFields]);

  return (
    <div className=" flex justify-center items-center">
      <ToastContainer />
      <Card className="w-full shadow-lg min-h-screen pt-2 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#27272a] via-[#52525b] to-[#a1a1aa] border-none">
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full rounded-xl min-h-[95vh] mt-2 items-center"
            autoComplete="off"
          >
            {/* Customer Details */}
            <CardHeader>
              <CardTitle className="text-2xl font-nexar1 text-gray-800 text-center w-full mx-auto py-3 [word-spacing:0.2em]   rounded-md">
                Customer Details
              </CardTitle>
            </CardHeader>

            <div className="px-2 py-5 rounded-md w-full">
              <table>
                <tbody>
                  {/* Name  */}
                  <tr>
                    <th>
                      <Label htmlFor="customerName">Customer Name : </Label>
                    </th>
                    <td>
                      <Input
                        id="customerName"
                        placeholder="Enter Customer Name"
                        className="w-96"
                        {...register("customerName", { required: true })}
                      />
                    </td>
                  </tr>
                  {/* Address  */}
                  <tr>
                    <th className="text-right">
                      <Label htmlFor="Address">Address : </Label>
                    </th>
                    <td>
                      <Input
                        id="Address"
                        placeholder="Enter Address"
                        className="w-96"
                        {...register("address", { required: true })}
                      />
                    </td>
                  </tr>

                  {/* mobileNumber  */}
                  <tr>
                    <th className="text-right">
                      <Label htmlFor="mobileNumber">Mobile : </Label>
                    </th>
                    <td>
                      <Input
                        id="mobileNumber"
                        placeholder="Enter Mobile Number"
                        className="w-96"
                        {...register("mobileNumber", { required: true })}
                      />
                    </td>
                  </tr>
                  {/* date  */}
                  <tr>
                    <th className="text-right">
                      <Label htmlFor="date" className="px-1">
                        Invoice Date :
                      </Label>
                    </th>
                    <td>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="date"
                            className="w-48 justify-between font-normal bg-gray-200 text-black"
                          >
                            {date ? date : "Select date"}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            className={"bg-slate-300"}
                            onSelect={(date) => {
                              dateFormater(date);
                              setOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Parts Section */}
            <div className="pt-4 px-10 flex flex-col items-center border-t">
              <table className="w-full text-sm text-left border-collapse mt-4">
                <thead className="bg-gray-900 text-slate-50 text-xl">
                  <tr>
                    <th className="px-4 py-2 border">Sr. No.</th>
                    <th className="px-4 py-2 border">Part Number</th>
                    <th className="px-4 py-2 border">Part Name</th>
                    <th className="px-4 py-2 border">Unit Price</th>
                    <th className="px-4 py-2 border">Qty</th>
                    <th className="px-4 py-2 border">Amount</th>
                    <th className="px-4 py-2 border text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-lg">
                  {fields.map((field, index) => (
                    <tr key={field.id} className="even:bg-gray-800">
                      {/* Sr No */}
                      <td className="px-4 py-2 border text-center text-gray-50">
                        {index + 1}
                      </td>

                      {/* Part Number */}
                      <td className="px-4 py-2 border">
                        <Input
                          placeholder="Part Number"
                          className={`${
                            errors?.parts?.[index]?.partNumber
                              ? "border-red-500"
                              : ""
                          }`}
                          {...register(`parts.${index}.partNumber`, {
                            required: "Part Number is required",
                            validate: (value) => {
                              const found = inventory.find(
                                (p) => p.partNumber === value
                              );
                              return found
                                ? true
                                : "Part not found in inventory";
                            },
                          })}
                          onChange={(e) => handlePartName(e, index)}
                        />
                        {errors?.parts?.[index]?.partNumber && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.parts[index].partNumber.message}
                          </p>
                        )}
                      </td>

                      {/* Part Name */}
                      <td className="px-4 py-2 border">
                        <Input
                          placeholder="Part Name"
                          readOnly
                          className={`${
                            errors?.parts?.[index]?.partName
                              ? "border-red-500"
                              : ""
                          }`}
                          {...register(`parts.${index}.partName`, {
                            required: "Part Name is required",
                          })}
                        />
                        {errors?.parts?.[index]?.partName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.parts[index].partName.message}
                          </p>
                        )}
                      </td>

                      {/* Unit Price */}
                      <td className="px-4 py-2 border">
                        <Input
                          type="number"
                          placeholder="Unit Price"
                          min="0"
                          className={`${
                            errors?.parts?.[index]?.Price
                              ? "border-red-500"
                              : ""
                          }`}
                          {...register(`parts.${index}.Price`, {
                            required: "Unit Price is required",
                            min: {
                              value: 1,
                              message: "Unit Price must be greater than 0",
                            },
                          })}
                        />
                        {errors?.parts?.[index]?.Price && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.parts[index].Price.message}
                          </p>
                        )}
                      </td>

                      {/* Quantity */}
                      <td className="px-4 py-2 border">
                        <Input
                          type="number"
                          placeholder="Qty"
                          min="0"
                          className={`${
                            errors?.parts?.[index]?.Qty ? "border-red-500" : ""
                          }`}
                          {...register(`parts.${index}.Qty`, {
                            required: "Quantity is required",
                            min: {
                              value: 1,
                              message: "Quantity must be at least 1",
                            },
                            validate: (value) => {
                              const partNumber = watch(
                                `parts.${index}.partNumber`
                              );
                              const part = inventory.find(
                                (p) => p.partNumber === partNumber
                              );
                              if (!part) return true;
                              const qty = parseFloat(value);
                              const availableQty = parseFloat(part.Qty);
                              return (
                                qty <= availableQty ||
                                `Available Qty: ${availableQty} only`
                              );
                            },
                          })}
                        />
                        {errors?.parts?.[index]?.Qty && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.parts[index].Qty.message}
                          </p>
                        )}
                      </td>

                      {/* Amount (Auto-calculated) */}
                      <td className="px-4 py-2 border">
                        <Input
                          className="text-gray-500"
                          type="number"
                          value={
                            (watch(`parts.${index}.Qty`) || 0) *
                            (watch(`parts.${index}.Price`) || 0)
                          }
                          readOnly
                        />
                      </td>

                      {/* Delete Button */}
                      <td className="px-4 py-2 border text-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 flex justify-start items-start  w-full">
                <Button
                  type="button"
                  onClick={() =>
                    append({ partName: "", partNumber: "", Qty: 0, Price: 0 })
                  }
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Part
                </Button>
              </div>
            </div>

            <div className="mt-auto ">
              <div className="w-96 flex flex-col items-center justify-center">
                <table className="w-2/3 text-sm text-left border-collapse">
                  <tbody className="text-lg">
                    <tr className="even:bg-gray-800 border">
                      <th className="px-4  bg-gray-900 text-slate-50 text-xl text-left">
                        Discount
                      </th>
                      <td className=" text-center text-gray-50 bg-gray-900">
                        <Input
                          placeholder="Discount"
                          type="number"
                          {...register("discount")}
                          min="0"
                        />
                      </td>
                    </tr>
                    <tr className="even:bg-gray-800 border">
                      <th className="px-4  bg-gray-900 text-slate-50 text-xl text-left">
                        Other
                      </th>
                      <td className=" text-center text-gray-50">
                        <Input
                          placeholder="Other"
                          type="number"
                          {...register("other")}
                          min="0"
                        />
                      </td>
                    </tr>
                    <tr className="even:bg-gray-800 border">
                      <th className="px-4  bg-gray-900 text-slate-50 text-xl text-left">
                        Total
                      </th>
                      <td className=" text-center text-gray-50">
                        <Input
                          value={total.toFixed(2)}
                          placeholder="other"
                          type="number"
                          readOnly
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex ">
              <Button
                className="w-28 mt-4 text-lg font-nexar2 bg-gray-900 font-normal  text-white"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
