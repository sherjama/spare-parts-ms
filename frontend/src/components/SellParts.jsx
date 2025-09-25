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
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { triggerReloadPart, triggerReloadShelve } from "@/store/stockSlice";
import partsService from "@/services/parts.service";
import { useNavigate } from "react-router-dom";

export default function SellPartsPage() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, control, handleSubmit, reset, watch } = useForm({
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
    console.log("chla");

    const rawDate = new Date(dateString);

    const day = String(rawDate.getDate()).padStart(2, "0");
    const month = rawDate.toLocaleString("en-US", { month: "short" });
    const year = String(rawDate.getFullYear()).slice(-2);

    setDate(`${day}-${month}-${year}`);
  };

  const onSubmit = async (data) => {
    data.date = date;
    console.log("Buy Parts Payload:", data);
    try {
      const res = await partsService.sellParts(data);
      if (res) {
        dispatch(triggerReloadPart());
        dispatch(triggerReloadShelve());
        toast.success("Parts Added Into Inventory Successfully", {
          position: "top-center",
          autoClose: 2500,
        });
        setTimeout(() => navigate("/controls/dashboard"), 2500);
      }
    } catch (error) {
      toast.info(error?.response?.data?.message || "Server Error", {
        position: "top-center",
      });
    }
    reset();
  };

  return (
    <div className=" flex justify-center items-center">
      <ToastContainer />
      <Card className="w-full shadow-lg min-h-screen pt-2 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#27272a] via-[#52525b] to-[#a1a1aa]border-none">
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full rounded-xl min-h-[95vh] mt-2"
            autocomplete="off"
          >
            {/* Customer Details */}
            <CardHeader>
              <CardTitle className="text-2xl font-nexar1 text-gray-800 text-center w-full mx-auto py-3 [word-spacing:0.2em]   rounded-md">
                Customer Details
              </CardTitle>
            </CardHeader>
            <div
              className="flex items-start justify-between gap-5 px-2 py-5 rounded-md w-full
            "
            >
              <div className="flex flex-col  items-center justify-center gap-5 ">
                <div className="flex items-center gap-5">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    placeholder="Enter Customer Name"
                    className="w-96"
                    {...register("customerName", { required: true })}
                  />
                </div>
                <div className="flex items-center gap-5">
                  <Label htmlFor="Address">Address</Label>
                  <Input
                    id="Address"
                    placeholder="Enter Address"
                    className="w-96"
                    {...register("address", { required: true })}
                  />
                </div>
              </div>
              {/* date  */}
              <div className="flex gap-3 items-center w-[60%]">
                <Label htmlFor="date" className="px-1">
                  Date
                </Label>
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
                <div className="flex items-center gap-5">
                  <Label htmlFor="mobileNumber">Mobile</Label>
                  <Input
                    id="mobileNumber"
                    placeholder="Enter Mobile Number"
                    className="w-96"
                    {...register("mobileNumber", { required: true })}
                  />
                </div>
              </div>
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
                      <td className="px-4 py-2 border text-center text-gray-50 ">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 border">
                        <Input
                          placeholder="Part Number"
                          {...register(`parts.${index}.partNumber`, {
                            required: true,
                          })}
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <Input
                          placeholder="Part Name"
                          {...register(`parts.${index}.partName`, {
                            required: true,
                          })}
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <Input
                          type="number"
                          placeholder="Unit Price"
                          {...register(`parts.${index}.Price`, {
                            required: true,
                          })}
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <Input
                          type="number"
                          placeholder="Qty"
                          {...register(`parts.${index}.Qty`, {
                            required: true,
                          })}
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <Input
                          className="text-gray-500"
                          type="number"
                          value={
                            watch(`parts.${index}.Qty`) *
                              watch(`parts.${index}.Price`) || 0
                          }
                          readOnly="true"
                        />
                      </td>
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

            {/* Submit */}
            <div className="mt-auto flex justify-center mr-40">
              <div className="w-full flex items-center justify-end">
                <table className="w-1/6 text-sm text-left border-collapse mt-4">
                  <thead className="bg-gray-900 text-slate-50 text-xl">
                    <tr>
                      <th className="px-4 py-2 border">Discount</th>
                      <th className="px-4 py-2 border">Other</th>
                    </tr>
                  </thead>
                  <tbody className="text-lg">
                    <tr className="even:bg-gray-800">
                      <td className="px-4 py-2 border text-center text-gray-50 ">
                        <Input
                          placeholder="Discount"
                          type="number"
                          {...register(`Discount`)}
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <Input
                          placeholder="Other"
                          type="number"
                          {...register(`Other`)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
