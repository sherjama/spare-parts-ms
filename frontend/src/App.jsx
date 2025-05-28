import LoadingBar from "react-top-loading-bar";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./index.js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "./store/loadSlice.js";

const App = () => {
  const [progress, setProgress] = useState(60);
  const isLoading = useSelector((state) => state.Loading.isLoading);
  const userStatus = useSelector((state) => state.userdata.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
    }
    return () => {
      dispatch(setLoading(true));
    };
  }, [isLoading]);

  return (
    <div
      id="container"
      className="w-full min-h-screen  flex justify-between flex-col bg-black bg-[url('../public/assets/Posters/HeroBg.jpeg')] bg-cover bg-center overflow-hidden"
    >
      <Header />
      <LoadingBar
        color="#5693CF"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <main className="w-[100vw] min-h-screen flex items-center justify-center ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default App;
