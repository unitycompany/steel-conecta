import { useEffect } from "react";
import Home from "./pages/home/Home";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      offset: 0,
      once: true,
    });
  })

  return (
    <>
      <Home />
    </>
  )
}
