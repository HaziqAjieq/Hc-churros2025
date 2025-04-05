import React from "react";

import Hero from "../components/Hero";
import { Cardstall } from "../components/Cardstall";
// import { CustSlider } from "../components/Slider";
import { Header } from "../components/Header";
import { AboutHero } from "./About";
import Form from "../components/Form";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <div className="px-0 mx-0">
        <Hero />
      </div>
      <main className="z-0 text-sm sm:text-base sm:max-w-7xl mx-auto pt-0 sm:px-6 ">
        <Header title="About Us!" description="asdawqas" />
        <AboutHero />
        <Header title="Our stall" description="asdawqas" />

        <Cardstall />
      </main>
      
    </>
  );
}
