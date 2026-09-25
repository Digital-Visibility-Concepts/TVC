import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VeeraChat from "./components/VeeraChat";
import SitePopups from "./components/SitePopups";

export default function App() {
  return (
    <>
      <ScrollRestoration />
      <VeeraChat />
      <SitePopups />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
