// import axios from "axios";
// import { useEffect } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { About }from "./pages/About";
import Location from "./pages/Location";
import Contact from "./pages/Contact";
import UserLogin from "./Features/Admin/UserLogin";
import Footer from "./components/Footer";

function App() {
  // const fetchAPI = async () => {
  //   const response = await axios.get("http://localhost:3000/api");
  //   console.log(response.data.message);
  // };

  // useEffect(() => {
  //   fetchAPI();
  // }, []);

  return (
    <>
      <Navbar />

      <Routes>
        {/* main */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/location" element={<Location />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<UserLogin />} />
      </Routes>
    <Footer  />
    </>
  );
}

export default App;
