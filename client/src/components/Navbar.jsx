import React, { useEffect, useState } from "react";
import Logo from "../assets/image/svgviewer-png-output.png";
import { Link, useLocation } from "react-router";
import {  ButtonContact } from "./Button";

export default function Navbar(props) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(false);
  }, [location])

  return (
   <div className="flex items-center justify-center ">
      <nav className="fixed w-full   z-50  grid grid-cols-8 max-h-auto max-w-7xl mx-auto bg-red lg:rounded-3xl rounded-b-2xl transform-fill mt-23 sm:mt-27 text-white ">
        {/* logoImg */}
        <div className=" col-span-2 col-start-1 flex items-center justify-center ">
          <img src={Logo} alt="" className="max-h-fit size-[7rem]" />
        </div>
        <div className="   hidden  sm:col-span-6 sm:flex sm:items-center sm:justify-center md:col-span-4 md:flex md:justify-center  cursor-pointer ">
          <ul className="grid grid-cols-3 gap-3 ">
            <Link to="/">
              <li className=" flex items-center  justify-center text-lg sm:text-xl md:text-2xl hover:text-yellow active:text-yellow">
                Home
              </li>
            </Link>

            <Link to="/about">
              <li className="  flex items-center  justify-center text-lg sm:text-xl md:text-2xl hover:text-yellow active:text-yellow">
                About
              </li>
            </Link>
            <Link to="/location">
              <li className="   flex items-center  justify-center text-lg sm:text-xl md:text-2xl hover:text-yellow active:text-yellow">
                Locations
              </li>
            </Link>
          </ul>
        </div>
        <div className="sm:col-span-2 hidden md:flex md:items-center md:justify-center">
          {/* adding button component */}
          <ButtonContact text='Contact' />
        </div>
        {/* adding menu button */}
        <button
          className="col-start-7 col-span-4 text-3xl text-yellow sm:hidden"
          onClick={toggleDropdown} // Toggle dropdown on click
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </nav>
      {/* dropdown menu */}
      {open && (
        <div className={`fixed pt-80 z-50  bg-red w-full rounded-b-2xl shadow-lg rounded-t-2xl sm:hidden `} >
          <ul className="flex flex-col items-center justify-cente gap-6 py-8 ">
            <Link to='/'>
              <li><h1 className="text-light-gray text-xl">Home</h1></li>
            </Link>
            <Link to='/about'>
              <li><h1 className="text-light-gray text-xl">About</h1></li>
            </Link>
            <Link to='/location'>
              <li><h1 className="text-light-gray text-xl">Location</h1></li>
            </Link>

            <ButtonContact text='Contact' />
          </ul>
        </div>
      )}
   </div>
  );
}
