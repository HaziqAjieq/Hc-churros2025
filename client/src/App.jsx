import { Routes, Route } from "react-router"; // Remove BrowserRouter import here
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Location from "./pages/Location";
import Contact from "./pages/Contact";
import Login from './components/admin/Login'
import Footer from "./components/Footer";
import Admin from "./components/admin/Admin";
import { AuthProvider } from "./components/auth-context/AuthContext";
import ProtectedRoute from "./components/auth-context/ProtectedRoute";
import { Navigate } from "react-router";


function App() {
  return (
    <>
      <Navbar />
      <AuthProvider>
      <Routes>
        {/* Main routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/location" element={<Location />} />
        <Route path="/contact" element={<Contact />} />
        
       
        <Route path="/admin/login" element={<Login />} />
         {/* Admin routes 
        create auth context only admin can access 
          */}
           <Route path="/admin/data"
            element={
            <ProtectedRoute>
            <Admin />
            </ProtectedRoute>
            } />
           
           
           <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
      </AuthProvider>
      <Footer />
    </>
  );
}

export default App;