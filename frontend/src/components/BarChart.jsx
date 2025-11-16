import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ totalPurchase, totalSells }) => {
  const extractLakhs = (v) => {
    if (typeof v === "number") return v;
    if (!v) return 0;
    return parseFloat(v.replace(/[₹ L]/g, "")) * 100000;
  };

  const purchaseRaw = extractLakhs(totalPurchase);
  const sellsRaw = extractLakhs(totalSells);

  const data = {
    labels: ["Purchase", "Sales"],
    datasets: [
      {
        label: "Amount",
        data: [purchaseRaw, sellsRaw],
        backgroundColor: ["#6366f1", "#22c55e"],
        borderRadius: 8,
        barThickness: 50,
        maxBarThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, labels: { color: "#ccc" } },
    },
    scales: {
      y: {
        ticks: {
          color: "#bbb",
          callback: (v) => `₹ ${(v / 100000).toFixed(2)} L`,
        },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      x: {
        ticks: { color: "#bbb" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="w-full h-[320px] md:h-[360px] bg-zinc-900 p-5 rounded-xl shadow-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
