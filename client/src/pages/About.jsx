import React from "react";
import AboutImg from "../assets/image/about.png";
import { Header } from "../components/Header";

import promo2 from '../assets/sliderImg/promo2.jpeg'
import promo3 from '../assets/sliderImg/promo3.jpg'

export function AboutHero() {
  return (
    <div className="about-home bg-red flex  items-center justify-center px-4 py-6 rounded-2xl  ">
      <p className="text-white text-sm md:text-xl ">
        Di HC Churros, kami penuh semangat dalam menyediakan churros terbaik.
        Bermula pada tahun 2022, kami berhasrat untuk berkongsi cinta kami
        terhadap churros yang panas dan rangup dengan komuniti.
        <br />
        <br />
        kami membezakan diri dengan komitmen terhadap kualiti dan rasa. Setiap
        churros kami dihasilkan dengan penuh kasih sayang, menggunakan bahan
        terbaik dan sentuhan kreativiti. Kami berusaha untuk memberikan
        pengalaman churro yang luar biasa kepada anda.
      </p>

      {/* adding button here */}

      <div>
        <img src={AboutImg} alt="churros image" className="hidden md:block" />
      </div>
    </div>
  );
}


export  function About() {
  return (
    <main className="z-0 text-sm sm:text-base sm:max-w-7xl mx-auto pt-0 sm:px-6 ">
      <div className="mt-[7rem] sm:mt-[8rem] md:mt-[9rem] lg:mt-[10rem]">
        <div className="flex flex-col gap-9">
        <div className="flex flex-col md:flex-row bg-red rounded-4xl gap-16 align-center items-center">
          <img src={promo2} 
          alt="about image"
          className="max-h-[70vh] md:max-h-[60vh] max-w-[80vw] rounded-4xl "
          />
          <div className="flex flex-col items-center justify-center px-5 py-10 ">
           <h1 className="text-3xl md:text-4xl lg:text-5xl">Kenali Kami!</h1> 
           <p className="text-lg md:text-xl lg:text-2xl">Di HC Churros, kami amat bersemangat dalam menyediakan churros terbaik yang bukan sahaja memenuhi selera anda, tetapi juga mencipta kenangan manis untuk setiap pelanggan. Perjalanan kami bermula pada tahun 2022, apabila sekumpulan pencinta makanan ringan bersatu dengan satu misi: untuk berkongsi cinta kami terhadap churros yang panas, rangup, dan penuh rasa dengan komuniti kami.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse bg-red rounded-4xl gap-16 align-center items-center">
          <img src={promo3} 
          alt="about image"
          className="max-h-[70vh] md:max-h-[60vh] max-w-[80vw] rounded-4xl"
          />
          <div className="flex flex-col items-center justify-center px-5 py-10 ">
           <h1 className="text-3xl md:text-4xl lg:text-5xl">Misi Kami</h1> 
           <p className="text-lg md:text-xl lg:text-2xl">Misi kami adalah mudah: menyediakan churros berkualiti tinggi yang menggembirakan hati dan memuaskan selera. Kami percaya bahawa makanan bukan sekadar keperluan, tetapi juga satu bentuk seni yang boleh menyatukan orang. Churros kami bukan sahaja rangup di luar dan lembut di dalam, tetapi juga dihasilkan dengan penuh dedikasi dan kasih sayang.</p>
          </div>
        </div>
           <Header title="Apa Yang Membezakan Kami?" description="" />
          {/* 4 point container */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
                <div className="bg-red flex flex-col items-center justify-center h-[30vh] gap-4 rounded-2xl">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl">
                  Kualiti Terbaik
                  </h1>
                  <p className="text-md md:text-lg lg:text-xl text-center">
                  Bahan premium dipilih dengan teliti untuk rasa sempurna—tanpa kompromi.
                  </p>
                </div>

                <div className="bg-red flex flex-col items-center justify-center h-[30vh] gap-4 rounded-2xl">
                <h1 className="text-2xl md:text-3xl lg:text-4xl">
                  Resipi Tradisional & Kreatif
                  </h1>
                  <p className="text-md md:text-lg lg:text-xl text-center">
                  Churros klasik dengan sentuhan moden, seperti coklat, keju, dan matcha.
                  </p>
                </div>
                <div className="bg-red flex flex-col items-center justify-center h-[30vh] gap-4 rounded-2xl">
                <h1 className="text-2xl md:text-3xl lg:text-4xl">
                  Pengalaman Unik
                  </h1>
                  <p className="text-md md:text-lg lg:text-xl text-center">
                  Setiap pelanggan adalah keluarga kami—kami jadikan setiap lawatan istimewa.
                  </p>
                </div>
                <div className="bg-red flex flex-col items-center justify-center h-[30vh] gap-4 rounded-2xl ">
                <h1 className="text-2xl md:text-3xl lg:text-4xl">
                Komitmen Komuniti
                  </h1>
                  <p className="text-md md:text-lg lg:text-xl text-center">
                  Kami menyokong komuniti melalui amal dan kerjasama tempatan
                  </p>
                  
                </div>
          </div>


        </div>
      </div>
     </main>
  );
}

