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
      <Hero />
      <Header
       title="About Us!"
        description="asdawqas" />
      <AboutHero/>
      <Header
       title="Our stall"
        description="asdawqas" />
     
         <Cardstall />
        <Footer/>
    </>
  );
}
