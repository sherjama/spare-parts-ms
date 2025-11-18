import LoadingBar from "react-top-loading-bar";
import { Outlet, useLocation } from "react-router-dom";
import { Header, authservice } from "./index.js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  // states
  const [ifHeadNotVisible, setifHeadNotVisible] = useState();
  const [progress, setProgress] = useState(60);

  // from store
  const dispatch = useDispatch();
  const status = useSelector((state) => state.userdata?.status);
  const isLoading = useSelector((state) => state.Loading.isLoading);
  const theme = useSelector((state) => state.theme.theme);
  // from router
  const location = useLocation();
  const path = location.pathname;

  const headvisiblePaths = [
    "/pricing",
    "/aboutUs",
    "/contactUs",
    "/feedback",
    "/landing",
  ];

  useEffect(() => {
    if (!status) return;

    let mounted = true;
    const checkInterval = 5 * 60 * 1000; // 5 minutes

    const runCheck = async () => {
      try {
        const session = await authservice.checkSession(dispatch);
        if (!session && mounted) {
          localStorage.clear();
          window.location.reload();
        }
      } catch (error) {
        if (mounted) {
          localStorage.clear();
          window.location.reload();
        }
      }
    };

    runCheck();
    const interval = setInterval(runCheck, checkInterval);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [status]);

  useEffect(() => {
    if (headvisiblePaths.includes(path)) {
      setifHeadNotVisible(false);
    } else {
      setifHeadNotVisible(true);
    }

    if (isLoading) {
      setProgress(100);
    }
  }, [isLoading, location]);

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");

    document.documentElement.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      id="container"
      className="w-full min-h-screen  flex justify-between flex-col bg-black bg-[url('../public/assets/Posters/HeroBg.jpeg')] bg-cover bg-center overflow-hidden"
    >
      <LoadingBar
        color="#5693CF"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {!ifHeadNotVisible && <Header />}
      <main className="w-[100vw] min-h-screen flex items-center justify-center ">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
