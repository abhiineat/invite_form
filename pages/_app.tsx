import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import {useThemeStore} from ".././store/useThemeStore"; // adjust path if needed

export default function App({ Component, pageProps }: AppProps) {
  const darkMode = useThemeStore((state) => state.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return <Component {...pageProps} />;
}
