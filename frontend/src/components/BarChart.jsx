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

    // Remove currency symbol and spaces
    v = v.replace(/₹|\s/g, "");

    let num = parseFloat(v);

    // Detect units
    if (/k$/i.test(v)) {
      return num * 1000; // Thousand
    } else if (/l$/i.test(v) || /lac/i.test(v) || /lakh/i.test(v)) {
      return num * 100000; // Lakh
    } else if (/cr$/i.test(v)) {
      return num * 10000000; // Crore
    }

    return num; // If no unit, return number as is
  };

  const purchaseRaw = extractLakhs(totalPurchase);
  const sellsRaw = extractLakhs(totalSells);

  console.log("purchase :", purchaseRaw);
  console.log("Sells :", sellsRaw);

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
