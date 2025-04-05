import React from "react";
import HeroImg from "../assets/image/1000207321.png";
import Logo from "../assets/image/svgviewer-png-output.png";
import { HeroSlider } from "./Slider";
import { ButtonContact } from "./Button";

export default function Hero() {
  return (
    <div className="mx-0 px-0 ">
      <header className=" w-full relative h-[100vh] ">
        {/* Image slider for the promotion/video */}
        <div className="h-[100vh]  ">
          <HeroSlider />
        </div>
        {/* Main info about the product */}
        <div className="absolute top-0 left-0 w-full h-[100vh] flex flex-col justify-center items-center gap-4 text-center ">
          {/* Logo */}
          <img
            src={Logo}
            alt="logo-hero"
            className="h-[12rem] sm:h-[18rem] lg:h-[26rem]"
          />

          {/* Description */}
          <div className=" sm:text-2xl lg:text-3xl flex  items-center justify-center font-bold px-4 text-white tracking-wider ">
            <h1 className="text-center">" Feel the <a className="  text-yellow text-xl sm:text-3xl lg:text-4xl "> CRUNCH </a>in every bite!"</h1>
          </div>

          {/* Button */}
          <ButtonContact text="Contact Us!" />
        </div>
      </header>
    </div>
  );
}
