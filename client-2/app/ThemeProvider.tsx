"use client";

import { AppTheme } from "@/config/theme";
import { setTheme } from "@/lib/feature/app/appSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ReactNode, useEffect } from "react";

export interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({
  children,
}: Readonly<ThemeProviderProps>) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadTheme = localStorage.getItem("theme");
    console.log("theme", loadTheme);
    if (loadTheme) {
      const theme = loadTheme as AppTheme;
      dispatch(setTheme(theme));
    } else {
      localStorage.setItem("theme", "light");
      dispatch(setTheme("light"));
    }
  }, [dispatch]);

  return children;
}
