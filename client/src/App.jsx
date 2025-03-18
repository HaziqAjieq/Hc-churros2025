// import axios from "axios";
// import { useEffect } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Location from "./pages/Location";
import Contact from "./pages/Contact";
import UserLogin from './Features/Admin/UserLogin'


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
      <main className="z-0 text-sm sm:text-base sm:max-w-7xl mx-auto pt-0 sm:px-6 ">
     
        <Routes>
          {/* main */}
          <Route path="/" element={ <Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/location" element={<Location/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/login" element={<UserLogin/>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
