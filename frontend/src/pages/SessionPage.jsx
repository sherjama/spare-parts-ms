import { useSelector } from "react-redux";
import { authservice, Button } from "../index.js";
import { toast, ToastContainer } from "react-toastify";

const SessionPage = () => {
  const refreshToken = useSelector(
    (state) => state.userdata.userdata?.refreshToken
  );

  const handleClick = async () => {
    try {
      const session = await authservice.RefreshToken(refreshToken);

      if (session) {
        console.log(session);
      }
    } catch (error) {
      toast.info(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-gray-100 px-4">
      <ToastContainer />
      <div className="flex items-center justify-center flex-col bg-white shadow-md rounded-md p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Your session has expired
        </h2>
        <p className="text-gray-600 mb-6">Please log in again to continue.</p>
        <Button text="Login" onClick={handleClick} />
      </div>
    </div>
  );
};

export default SessionPage;
