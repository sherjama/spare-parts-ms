import { useSelector, useDispatch } from "react-redux";
import { fetchAllStock } from "@/store/stockSlice.js";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState, useCallback } from "react";

import {
  ViewBoxContainer,
  PieChart,
  BarChart,
  partsService,
  reportsService,
  PartAnalytics,
  CenteredLoader,
} from "../index.js";

import { BiSolidCube } from "react-icons/bi";
import { FiTrendingUp } from "react-icons/fi";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { AiFillAlert } from "react-icons/ai";

import { setLoading } from "@/store/loadSlice.js";

const Dashboard = ({ className }) => {
  const [totalSells, setTotalSells] = useState("₹ 0");
  const [totalPurchase, setTotalPurchase] = useState("₹ 0");
  const [lowStock, setLowStock] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [topSoldParts, setTopSoldParts] = useState([]);

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userdata?.userdata?.user?._id);
  const Parts = useSelector((state) => state.stock?.Parts || []);
  const Shelves = useSelector((state) => state.stock?.Shelves || []);
  const { loading, error } = useSelector((state) => state.stock);

  const formatNumber = (amount) => {
    if (!amount || isNaN(amount)) return "₹ 0";
    if (amount >= 1e7) return `₹ ${(amount / 1e7).toFixed(2)} Cr`;
    if (amount >= 1e5) return `₹ ${(amount / 1e5).toFixed(2)} L`;
    if (amount >= 1e3) return `₹ ${(amount / 1e3).toFixed(2)} K`;
    return `₹ ${amount}`;
  };

  const fetchTotals = useCallback(async () => {
    try {
      const [totalS, totalP] = await Promise.all([
        reportsService.getTotalSells(),
        reportsService.getTotalPurchase(),
      ]);

      setTotalSells(formatNumber(totalS));
      setTotalPurchase(formatNumber(totalP));
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  }, []);

  useEffect(() => {
    if (Parts.length > 0) {
      const low = Parts.filter((p) => p.Qty <= 3);
      setLowStock(low);
    }
  }, [Parts]);

  const fetchMostSold = useCallback(async () => {
    try {
      const data = await reportsService.getMostSoldParts();
      setTopSoldParts(data || []);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  }, []);

  useEffect(() => {
    async function loadShelves() {
      if (Shelves.length === 0) return;

      try {
        const requests = Shelves.map((shelf) =>
          partsService.getShelfParts(shelf.shelfName)
        );

        const results = await Promise.all(requests);

        const chart = results.map((res, index) => ({
          shelfName: Shelves[index].shelfName,
          partCount: res.data?.data?.length || 0,
        }));

        setChartData(chart);
      } catch (err) {
        toast.error(err?.response?.data?.message || err.message);
      }
    }

    loadShelves();
  }, [Shelves]);

  useEffect(() => {
    if (userId) dispatch(fetchAllStock(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    async function loadDashboard() {
      if (!userId) return;

      dispatch(setLoading(true));

      try {
        await Promise.all([fetchTotals(), fetchMostSold()]);
      } finally {
        dispatch(setLoading(false));
      }
    }

    loadDashboard();
  }, [userId, fetchTotals, fetchMostSold, dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const topAnalysis = [
    {
      title: "Total Sales",
      icon: <FiTrendingUp color="Green" />,
      data: totalSells,
    },
    {
      title: "Total Purchase",
      icon: <BiSolidPurchaseTagAlt color="Blue" />,
      data: totalPurchase,
    },
    {
      title: "Total Parts",
      icon: <BiSolidCube />,
      data: Parts.length + " items",
    },
    {
      title: "Low Stock Parts (Qty < 3)",
      icon: <AiFillAlert color="Red" />,
      data: lowStock.length,
    },
  ];

  if (!userId) return <CenteredLoader />;
  if (loading) return <CenteredLoader />;

  return (
    <main
      className={`flex mt-6 md:mt-0 flex-col space-y-6 text-white ${className} bg-[#121212] p-4`}
    >
      <ToastContainer />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3 mt-6">
        {topAnalysis.map((item, idx) => (
          <ViewBoxContainer key={idx} data={item} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full">
        <BarChart totalPurchase={totalPurchase} totalSells={totalSells} />
        <PieChart shelves={chartData} />
      </div>

      <div>
        <PartAnalytics title="Most Sold Parts" data={topSoldParts} mostSoled />
        <PartAnalytics title="Low Stock Alerts" data={lowStock} lowStock />
      </div>
    </main>
  );
};

export default Dashboard;
