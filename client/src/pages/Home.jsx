import React from "react";

import Hero from "../components/Hero";
import { Cardstall } from "../components/Cardstall";

import { Header } from "../components/Header";
import { AboutHero } from "./About";
import Carousel from "../components/Carousel";


export default function Home() {
  return (
    <>
      <div className="px-0 mx-0">
        <Hero />
      </div>
      <main className="z-0 text-sm sm:text-base sm:max-w-7xl mx-auto pt-0 sm:px-6 ">
         <div className="my-5">
            <Carousel/>
         </div>
         
        

        <Header title="Tentang Kami!" description="asdawqas" />
        <AboutHero />

        <Header title="Apa Yang Membezakan Kami?" description="" />

        {/* 4 point container */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <div className="bg-red flex flex-col items-center justify-center h-[30vh] gap-4 rounded-2xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-yellow">
              Kualiti Terbaik
            </h1>
            <p className="text-md md:text-lg lg:text-xl text-center">
              Bahan premium dipilih dengan teliti untuk rasa sempurna—tanpa
              kompromi.
            </p>
          </div>

          <div className="bg-red flex flex-col items-center justify-center h-[30vh] gap-4 rounded-2xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-yellow">
              Resipi Tradisional & Kreatif
            </h1>
            <p className="text-md md:text-lg lg:text-xl text-center">
              Churros klasik dengan sentuhan moden, seperti coklat, keju, dan
              matcha.
            </p>
          </div>
          <div className="bg-red flex flex-col items-center justify-center h-[30vh] gap-4 rounded-2xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl  text-yellow">
              Pengalaman Unik
            </h1>
            <p className="text-md md:text-lg lg:text-xl text-center">
              Setiap pelanggan adalah keluarga kami—kami jadikan setiap lawatan
              istimewa.
            </p>
          </div>
          <div className="bg-red flex flex-col items-center justify-center h-[30vh] gap-4 rounded-2xl ">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-yellow">
              Komitmen Komuniti
            </h1>
            <p className="text-md md:text-lg lg:text-xl text-center">
              Kami menyokong komuniti melalui amal dan kerjasama tempatan
            </p>
          </div>
        </div>

        <Header title="Stall Kami!" description="asdawqas" />
        <Cardstall />
      </main>
    </>
  );
}
