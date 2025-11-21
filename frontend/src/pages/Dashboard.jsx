import { useSelector, useDispatch } from "react-redux";
import { fetchAllStock } from "@/store/stockSlice.js";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import {
  ViewBoxContainer,
  PieChart,
  BarChart,
  partsService,
  reportsService,
  PartAnalytics,
} from "../index.js";

// icons
import { BiSolidCube } from "react-icons/bi";
import { FiTrendingUp } from "react-icons/fi";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { AiFillAlert } from "react-icons/ai";
import { setLoading } from "@/store/loadSlice.js";

const Dashboard = ({ className }) => {
  const [totalSells, setTotalSells] = useState(0);
  const [totalPurchase, setTotalPurchase] = useState(0);
  const [lowStock, setLowStock] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [topSoledParts, setTopSoledParts] = useState([]);
  const userId = useSelector((state) => state.userdata?.userdata?.user?._id);
  const Parts = useSelector((state) => state.stock.Parts);
  const Shelves = useSelector((state) => state.stock.Shelves);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.stock);

  const formatNumber = (amount) => {
    if (isNaN(amount)) return "₹ 0";
    if (amount >= 1e7) return `₹ ${(amount / 1e7).toFixed(2)} Cr`;
    if (amount >= 1e5) return `₹ ${(amount / 1e5).toFixed(2)} L`;
    if (amount >= 1e3) return `₹ ${(amount / 1e3).toFixed(2)} K`;
    return `₹ ${amount}`;
  };

  const lowStockFinder = () => {
    const low = Parts.filter((part) => part.Qty <= 3);
    setLowStock(low);
  };

  const partsInShelves = async () => {
    const obj = [];

    for (let index = 0; index < Shelves.length; index++) {
      try {
        let data = await partsService.getShelfParts(Shelves[index].shelfName);
        obj.push({
          shelfName: Shelves[index].shelfName,
          partCount: data.data.data?.length,
        });
      } catch (error) {
        toast.error(error);
      }
    }
    setChartData(obj);
  };

  const getMostSoldParts = async () => {
    try {
      let data = await reportsService.getMostSoldParts();
      if (data) setTopSoledParts(data);
      dispatch(setLoading(false));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    async function getTotalSellAndPurchase() {
      try {
        dispatch(setLoading(true));
        const totalS = await reportsService.getTotalSells();
        const totalP = await reportsService.getTotalPurchase();
        if (totalS || totalP) {
          const formatedTotalS = formatNumber(totalS);
          const formatedTotalP = formatNumber(totalP);
          setTotalSells(formatedTotalS);
          setTotalPurchase(formatedTotalP);
          dispatch(setLoading(false));
        }
      } catch (error) {
        toast.error(error);
        dispatch(setLoading(false));
      }
    }

    getTotalSellAndPurchase();
    lowStockFinder();
    partsInShelves();
    getMostSoldParts();
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchAllStock(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const topAnalysis = [
    {
      title: "Total Sales",
      icon: <FiTrendingUp color="Green" />,
      data: totalSells,
      className: "col-span-1",
    },
    {
      title: "Total Purchase",
      icon: <BiSolidPurchaseTagAlt color="Blue" />,
      data: totalPurchase,
      className: "col-span-1",
    },
    {
      title: "Total Parts",
      icon: <BiSolidCube />,
      data: Parts?.length + " " + "items",
      className: "col-span-1",
    },
    {
      title: "Low Stock Parts (Qty<3)",
      icon: <AiFillAlert color="Red" />,
      data: lowStock?.length,
      className: "col-span-1",
    },
  ];

  return loading ? (
    <p>Loading...</p>
  ) : (
    <main
      className={`flex mt-6 md:mt-0  flex-col space-y-6 text-white ${className} bg-[#121212]  p-4`}
    >
      <ToastContainer />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3 mt-6">
        {topAnalysis.map((item, idx) => (
          <ViewBoxContainer key={idx} data={item} className={item.className} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full">
        <BarChart totalPurchase={totalPurchase} totalSells={totalSells} />

        <PieChart shelves={chartData} />
      </div>

      <div>
        <PartAnalytics
          title="Most Sold Parts"
          data={topSoledParts}
          mostSoled={true}
        />
        <PartAnalytics
          title="Low Stock Alerts"
          data={lowStock}
          lowStock={true}
        />
      </div>
    </main>
  );
};

export default Dashboard;
