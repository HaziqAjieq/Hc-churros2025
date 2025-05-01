import { Routes, Route } from "react-router"; // Remove BrowserRouter import here
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Location from "./pages/Location";
import Contact from "./pages/Contact";
import Login from "./Features/Admin/Login";
import Footer from "./components/Footer";
import Admin from "./Features/Admin/Admin";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Main routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/location" element={<Location />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Admin routes */}
        <Route path="/admin/login" element={<Login />} />
        {/* create auth context only admin can access */}
           {/*  */}
           <Route path="/admin/data" element={<Admin />} />
           {/*  */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;