import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ shelves }) => {
  const labels = shelves.map((s) => s.shelfName);
  const values = shelves.map((s) => s.partCount);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#6366F1",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#3B82F6",
          "#8B5CF6",
        ],
        borderWidth: 1,
        borderColor: "#111",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "white",
          padding: 12,
          font: { family: "nexar1", size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.raw} parts`,
        },
      },
    },
  };

  return (
    <div className="w-full h-[320px] md:h-[360px] bg-zinc-900 p-5 rounded-xl shadow-lg">
      <h2 className="text-white font-nexar3 text-xl mb-3">Parts by Shelves</h2>

      <div className="w-full h-[260px] flex items-center justify-center">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
