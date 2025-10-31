import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/Button.jsx";
import { Search, Calendar, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import partsService from "@/services/parts.service";

const ReportsTable = ({ data, activeTab }) => {
  const handleViewBill = async (billNo) => {
    try {
      if (activeTab === "buy") {
        await partsService.getPurchaseBill(billNo);
      } else {
        await partsService.getSellBill(billNo);
      }
    } catch (error) {
      toast.error(error.response?.data?.messege || "Server Error", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-950">
          <tr className="px-4 py-3 text-xs font-nexar1 uppercase tracking-wider text-gray-100 ">
            <th className="px-4 py-2 border">Sr. No.</th>
            <th className="px-4 py-2 border">Invoice no.</th>
            <th className="px-4 py-2 border">
              {activeTab === "buy" ? "Vendor Name" : "Customer Name"}
            </th>
            <th className="px-4 py-2 border">Date/Time</th>
            <th className="px-4 py-2 border text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-gray-400">
          {data.map((row, index) => (
            <tr
              key={index}
              className="text-md font-nexar1  text-black even:bg-gray-300 hover:bg-blue-50/50"
            >
              {/* Sr. No.*/}
              <td className="whitespace-nowrap px-4 py-3 text-center">
                {index + 1}
              </td>

              {/* Invoice  */}
              <td className="whitespace-nowrap px-4 py-3 text-center font-nexar1">
                {row.billNo}
              </td>

              {/* Name  */}
              <td className="whitespace-nowrap px-4 py-3 text-center">
                {activeTab === "buy" ? row.vendorName : row.customerName}
              </td>

              {/* Date/Time - Left */}
              <td className="whitespace-nowrap px-4 py-3 text-center">
                {new Date(row.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>

              {/* View Bill - Center (Button) */}
              <td className="whitespace-nowrap px-4 py-3 text-center">
                <Button
                  onClick={() => handleViewBill(row.billNo)}
                  className="inline-flex items-center justify-center rounded-full bg-blue-500 p-2 text-white shadow-md transition-colors duration-150 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  title="View Bill"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No reports found for this selection.
        </div>
      )}
    </div>
  );
};

// --- Main Component ---
export default function Reports() {
  const [activeTab, setActiveTab] = useState("buy");
  const [Searchtxt, setSearchtxt] = useState(String);
  const reports = useSelector((state) => state.reports);
  const reportsData =
    activeTab === "buy" ? reports.purchaseBills : reports.sellBills;

  // Define the color classes for the active tab
  const activeClasses = "bg-indigo-950 text-white shadow-lg";
  const inactiveClasses = "bg-gray-950 text-gray-100 hover:bg-gray-900";

  const filteredReports = reportsData.filter((bill) => {
    const searchLower = Searchtxt.toLowerCase();
    return (
      bill.billNo?.toLowerCase().includes(searchLower) ||
      bill.vendorName?.toLowerCase().includes(searchLower) ||
      bill.customerName?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-black p-6 sm:p-10">
      <h1 className="text-3xl text-gray-300 font-nexar1 mb-6">Reports</h1>
      {/* Tab Navigation & Monthly Spending Chart (Layout Grid) */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tabs Container */}
        <div className="md:col-span-3 flex space-x-2">
          <Button
            onClick={() => setActiveTab("buy")}
            className={`rounded-lg px-6 py-2 font-nexar1 ${
              activeTab === "buy" ? activeClasses : inactiveClasses
            }`}
          >
            Purchase Reports
          </Button>
          <Button
            onClick={() => setActiveTab("sell")}
            className={`rounded-lg px-6 py-2 font-nexar1 transition-colors ${
              activeTab === "sell" ? activeClasses : inactiveClasses
            }`}
          >
            Sell Reports
          </Button>
        </div>
      </div>
      {/* Search & Filter Bar */}
      <div className="my-6 flex items-center space-x-4">
        <p className="text-sm font-nexar1 text-gray-600 whitespace-nowrap">
          Search & Filter Bar:
        </p>
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={Searchtxt}
            onChange={(e) => setSearchtxt(e.target.value)}
            placeholder="Search by Invoice no , vendor , customer , etc."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Reports Table Area */}
      <div className="mt-8 md:col-span-4">
        <ReportsTable data={filteredReports} activeTab={activeTab} />
      </div>
    </div>
  );
}
