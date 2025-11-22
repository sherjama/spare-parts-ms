import { ThreeCircles } from "react-loader-spinner";

const Button = ({
  loading = false,
  onClick,
  text = "Submit",
  fullWidth = false,
  className = "",
  bgColor = "bg-white",
  textColor = "text-slate-700",
  isActive = false,
  children,
  disabled = false,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        ${fullWidth ? "w-full" : ""}
        ${bgColor} ${textColor}
        ${isActive ? "bg-black text-white border-none" : ""}
        font-nexar1 px-8 py-2 rounded-full border-2 border-slate-200 text-md
        flex items-center justify-center gap-2
        transition-all duration-200
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {/* Hide text when loading OR fade it */}
      <span className={`${loading ? "opacity-0" : "opacity-100"}`}>
        {children || text}
      </span>

      {loading && (
        <div className="absolute">
          <ThreeCircles
            visible={true}
            height="28"
            width="28"
            color="#60A5FA"
            ariaLabel="three-circles-loading"
          />
        </div>
      )}
    </button>
  );
};

export default Button;
