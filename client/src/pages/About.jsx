import React from "react";
import AboutImg from "../assets/image/about.png";

export default function About() {
  return <div>about</div>;
}

export function AboutHero() {
  return (
    <div className="about-home bg-red flex  items-center justify-center px-4 py-6 rounded-2xl  ">
      
        <p className="text-white text-sm md:text-xl ">
          Di HC Churros, kami penuh semangat dalam menyediakan churros terbaik.
          Bermula pada tahun 2022, kami berhasrat untuk berkongsi cinta kami
          terhadap churros yang panas dan rangup dengan komuniti. 
          
          <br /><br /> 
          
          kami membezakan diri dengan komitmen terhadap kualiti dan rasa. Setiap
          churros kami dihasilkan dengan penuh kasih sayang, menggunakan bahan
          terbaik dan sentuhan kreativiti. Kami berusaha untuk memberikan
          pengalaman churro yang luar biasa kepada anda.
        </p>

        {/* adding button here */}
      
        <div>
        <img src={AboutImg} alt="churros image" className="hidden md:block"  />
        </div>
        
      
    </div>
  );
}
