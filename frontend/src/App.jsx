import LoadingBar from "react-top-loading-bar";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./index.js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const [progress, setProgress] = useState(60);
  const [ifHeadNotVisible, setifHeadNotVisible] = useState();
  const location = useLocation();
  const isLoading = useSelector((state) => state.Loading.isLoading);
  const path = location.pathname;

  useEffect(() => {
    if (path == "/dashboard") {
      setifHeadNotVisible(true);
    } else {
      setifHeadNotVisible(false);
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
      <Header className={`${ifHeadNotVisible ? "hidden" : ""}`} />
      <LoadingBar
        color="#5693CF"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <main className="w-[100vw] min-h-screen flex items-center justify-center ">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
