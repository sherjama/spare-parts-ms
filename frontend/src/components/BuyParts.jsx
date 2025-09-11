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

import partsService from "@/services/parts.service";

export default function BuyPartsPage() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      vendorBillNo: "",
      vendorName: "",
      date: "",
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

    const day = String(rawDate.getDate()).padStart(2, "0"); // 11
    const month = rawDate.toLocaleString("en-US", { month: "short" }); // Sep
    const year = String(rawDate.getFullYear()).slice(-2); // 25

    setDate(`${day}-${month}-${year}`);
  };

  const onSubmit = async (data) => {
    data.date = date;
    console.log("Buy Parts Payload:", data);
    try {
      const res = await partsService.buyParts(data);
      console.log(res);
    } catch (error) {
      throw error;
    }
    reset();
  };

  return (
    <div className=" flex justify-center py-2 bg-black">
      <Card className="w-full shadow-lg min-h-screen pt-2 rounded-2xl  bg-gradient-to-b from-[#8d8daa] via-[#dfdfde] to-[#f7f5f2]border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-normal font-nexar1 text-slate-200 ">
            Purchase Inventory
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mt-5 w-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg rounded-xl min-h-[85vh] "
          >
            {/* Vendor Details */}
            <CardHeader>
              <CardTitle className="text-2xl font-nexar1 text-indigo-900 text-center w-full mx-auto py-3 [word-spacing:0.2em]   rounded-md">
                Vendor Details
              </CardTitle>
            </CardHeader>
            <div
              className="flex items-center justify-evenly gap-5 px-2 py-5 rounded-md w-full
            "
            >
              <div className="flex items-center gap-5">
                <Label htmlFor="vendorBillNo">Vendor Bill No</Label>
                <Input
                  id="vendorBillNo"
                  placeholder="Enter vendor bill no"
                  className="w-96"
                  {...register("vendorBillNo", { required: true })}
                />
              </div>
              <div className="flex items-center gap-3  ">
                <Label htmlFor="vendorName ">Vendor Name :</Label>
                <Input
                  id="vendorName"
                  placeholder="Enter vendor name"
                  className="w-96"
                  {...register("vendorName", { required: true })}
                />
              </div>
              {/* date  */}
              <div className="flex gap-3 items-center">
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
              </div>
            </div>

            {/* Parts Section */}
            <div className="pt-4 px-10 flex flex-col items-center border-t">
              <table className="w-full text-sm text-left border-collapse mt-4">
                <thead className="bg-indigo-100 text-indigo-900">
                  <tr>
                    <th className="px-4 py-2 border">Sr. No.</th>
                    <th className="px-4 py-2 border">Part Number</th>
                    <th className="px-4 py-2 border">Part Name</th>
                    <th className="px-4 py-2 border">Unit Price</th>
                    <th className="px-4 py-2 border">Qty</th>
                    <th className="px-4 py-2 border text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
                    <tr key={field.id} className="even:bg-gray-50">
                      <td className="px-4 py-2 border text-center">
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
                          step="0.01"
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
            <div className="mt-auto flex justify-center py-6">
              <Button type="submit" className="">
                Generate Invoice
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
