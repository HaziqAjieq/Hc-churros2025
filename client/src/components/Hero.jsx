import React from "react";
import HeroImg from '../assets/image/1000207321.png'
import Logo from '../assets/image/svgviewer-png-output.png'
import { HeroSlider } from "./Slider";
import {  ButtonContact } from "./Button";

export default function Hero() {
  return (
    <header className=" w-full flex flex-col lg:h-[100vh]  lg:flex-row py-10 gap-2
    ">
      {/* Main info about the product */}
      <div className="hero-1 flex flex-col justify-center items-center gap-4 h-screen rounded-2xl sm:rounded-b-3xl lg:rounded-b-4xl lg:h-[90vh]">
          <img 
          src={Logo} 
          alt="logo-hero"
          className="h-[16rem] sm:h-[26rem] lg:h-[14rem] "
          />

        <h1 className="text-2xl font-bold text-center text-yellow ">
          "HC Churros: Rangup, Sedap, Penuh Kualiti – Cinta Kami Sejak 2022!"
        </h1>
        {/* Button to linktr learn-btn */}
        <ButtonContact text="Contact Us!"/>
      </div>

      {/* Image slider for the promotion/video */}
        <div className="h-[60vh] md:h-[100vh] lg:h-[90vh] w-full lg:w-[55vw]   ">
          <HeroSlider/>
        </div>
    </header>
    
  );
}
