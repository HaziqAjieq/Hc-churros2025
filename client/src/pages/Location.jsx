import React from "react";
import { CardStallLocation } from "../components/Cardstall";
import { PageHeader } from "../components/Header";
import promo3 from '../assets/sliderImg/promo3.jpg'

export default function Location() {
  return (
    <main className="z-0 text-sm sm:text-base sm:max-w-7xl mx-auto pt-0 sm:px-6 ">
      <div className="mt-[6.5rem] sm:mt-[7rem] md:mt-[7rem] lg:mt-[7rem]">
        <PageHeader
         title={"Jejaki Kami!"}
          description={"Gerai kami sedia memenuhi cravings churros anda. Lihat di mana kami berada dan jom bertemu!"}
          backgroundImage={promo3}
        />
        <CardStallLocation />
      </div>
    </main>
  );
}
