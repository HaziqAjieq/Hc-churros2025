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
import PromoInput from "./components/admin/adminComponent/PromoInput";


function App() {
  return (
    <>
      <Navbar />
      <AuthProvider>
      <Routes>
        {/* Main routes */}
        <Route path="/" element={<><Home /> <Footer title={"Give Us Your Feedback!"}/></>} />
        <Route path="/about" element={<><About /> <Footer title={"Give Us Your Feedback!"} /></>} />
        <Route path="/location" element={<><Location /> <Footer title={"Give Us Your Feedback!"} /></>} />
        <Route path="/contact" element={<Contact /> } />
        
       
        <Route path="/admin/login" element={<Login />} />
         {/* Admin routes 
        create auth context only admin can access 
          */}
           <Route path="/admin/data"
            element={
            <ProtectedRoute>
            <Admin 
              element={
                <PromoInput/>
              }
            />
            {/* add anothe page for admin to add promos */}
            </ProtectedRoute>
            } />
           
           
           <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
      </AuthProvider>
      
    </>
  );
}

export default App;