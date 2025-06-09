const SessionPage = () => {
  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-md p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Your session has expired
        </h2>
        <p className="text-gray-600 mb-6">Please log in again to continue.</p>
        <button
          //   onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SessionPage;
