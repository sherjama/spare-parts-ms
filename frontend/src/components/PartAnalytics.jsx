import React from "react";

const PartAnalytics = ({ title, data, mostSoled, lowStock }) => {
  return (
    <div className="w-full bg-[#181818] rounded-xl p-5 mt-5">
      <h2 className="text-indigo-500 font-nexar3 text-lg mb-4">{title}</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-300">
          <thead>
            <tr className="bg-[#222] text-white text-[13px]">
              <th className="px-3 py-2">Part Number</th>
              <th className="px-3 py-2">Part Name</th>
              {mostSoled && <th className="px-3 py-2">Total Soled</th>}
              {lowStock && <th className="px-3 py-2">Qty left</th>}
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b border-gray-700 ${
                  index % 2 === 0 ? "bg-[#1f1f1f]" : "bg-[#181818]"
                } hover:bg-[#2a2a2a] transition`}
              >
                <td className="px-3 py-2 text-[13px]">{item.partNumber}</td>
                <td className="px-3 py-2 text-[13px]">{item.partName}</td>
                {mostSoled && (
                  <td className="px-3 py-2 text-[13px] text-green-600">
                    {item.totalSold}
                  </td>
                )}
                {lowStock && (
                  <td className="px-3 py-2 text-[13px] text-red-600">
                    {item.Qty}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartAnalytics;
