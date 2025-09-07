import LoadingBar from "react-top-loading-bar";
import { Outlet, useLocation } from "react-router-dom";
import { Header, authservice } from "./index.js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const App = () => {
  // states
  const [ifHeadNotVisible, setifHeadNotVisible] = useState();
  const [progress, setProgress] = useState(60);

  // from store
  const dispatch = useDispatch;
  const status = useSelector((state) => state.userdata?.status);
  const accessToken = useSelector(
    (state) => state.userdata.userdata?.accessToken
  );
  const isLoading = useSelector((state) => state.Loading.isLoading);
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
    if (status) {
      const checkAuthSession = async () => {
        try {
          const session = await authservice.checkSession(accessToken, dispatch);
          if (!session) {
            window.location.reload();
          }
        } catch (error) {
          toast.info(error?.response?.data?.message || "Server Error", {
            position: "top-center",
          });
        }
      };
      checkAuthSession();
    }
  }, [status, accessToken]);

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
