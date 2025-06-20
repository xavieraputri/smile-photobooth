import { useEffect } from "react";

export default function AppBackground() {
  useEffect(() => {
    document.body.style.background = "url('/assets/Background.jpg') center center/cover no-repeat";
    // Remove or comment out the fallback color if you want only the image:
    // document.body.style.backgroundColor = "#faf7de";
    return () => {
      document.body.style.background = "";
      document.body.style.backgroundColor = "";
    };
  }, []);
  return null;
} 