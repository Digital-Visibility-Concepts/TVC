import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VeeraChat from "./components/VeeraChat";

export default function App() {
  return (
    <>
      <ScrollRestoration />
      <VeeraChat />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
