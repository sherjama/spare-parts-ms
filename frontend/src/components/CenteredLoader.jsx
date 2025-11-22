import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const CenteredLoader = ({
  message = "Loading...",
  color = "#60A5FA",
  size = 80,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center bg-gray-900/90 rounded-2xl p-8 shadow-xl">
        <ThreeCircles
          height={size}
          width={size}
          color={color}
          visible={true}
          ariaLabel="three-circles-loading"
        />
        <p className="mt-4 text-lg font-semibold text-white">{message}</p>
      </div>
    </div>
  );
};

export default CenteredLoader;
