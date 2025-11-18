import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTheme, selectTheme } from "../store/themeSlice.js";
export function useTheme() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    if (!theme) {
      const savedTheme = localStorage.getItem("theme") || "dark";
      dispatch(setTheme(savedTheme));
    }
  }, [theme, dispatch]);

  const setAppTheme = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  return { theme, setTheme: setAppTheme };
}
