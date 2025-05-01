import React from "react";
import AboutImg from "../assets/image/about.png";
import {  PageHeader } from "../components/Header";
import promo1 from '../assets/sliderImg/promo1.jpeg'
import promo2 from "../assets/sliderImg/promo2.jpeg";
import promo3 from "../assets/sliderImg/promo3.jpg";

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

export default function About() {
  return (
   <main className="z-0 text-sm sm:text-base sm:max-w-7xl mx-auto pt-0 sm:px-6 ">
      <div className="mt-[6.5rem] sm:mt-[7rem] md:mt-[7rem] lg:mt-[7rem]">
        <PageHeader
          title={"Tentang Kami!"}
          description={"HC Churros - Gabungan sempurna antara rasa tradisional & inovasi, satu gigitan pada satu masa!"}
          backgroundImage={promo1}
        />
        <div className="flex flex-col gap-9">
          <div className="flex flex-col md:flex-row bg-red rounded-4xl overflow-hidden shadow-lg">
            {/* Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-auto">
              <img
                src={promo2}
                alt="HC Churros"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-yellow mb-4 text-center md:text-left">
                Kenali Kami!
              </h1>

              <p className="leading-relaxed mb-6 text-center md:text-left text-lg md:text-xl lg:text-2xl">
                Di HC Churros, kami amat bersemangat dalam menyediakan churros
                terbaik yang bukan sahaja memenuhi selera anda, tetapi juga
                mencipta kenangan manis untuk setiap pelanggan. Perjalanan kami
                bermula pada tahun 2022, apabila sekumpulan pencinta makanan
                ringan bersatu dengan satu misi: untuk berkongsi cinta kami
                terhadap churros yang panas, rangup, dan penuh rasa dengan
                komuniti kami.
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-4xl  md:flex-row-reverse bg-red shadow-lg ">
            {/* image section */}
            <div className="w-full md:w-1/2 h-64 md:h-auto ">
            <img
              src={promo3}
              alt="about image"
              className="w-full h-full object-cover object-center rounded-tr-4xl rounded-tl-4xl md:rounded-tl-none md:rounded-e-4xl "
            />
            </div>
            {/* content section */}
            <div className="flex flex-col w-full md:w-1/2 p-8 md:p-12 justify-center ">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow mb-4 text-center md:text-left">Misi Kami</h1>
              <p className="leading-relaxed mb-6 text-center md:text-left  text-lg md:text-xl lg:text-2xl">
                Misi kami adalah mudah: menyediakan churros berkualiti tinggi
                yang menggembirakan hati dan memuaskan selera. Kami percaya
                bahawa makanan bukan sekadar keperluan, tetapi juga satu bentuk
                seni yang boleh menyatukan orang. Churros kami bukan sahaja
                rangup di luar dan lembut di dalam, tetapi juga dihasilkan
                dengan penuh dedikasi dan kasih sayang.
              </p>
            </div>
          </div>

          

        </div>
      </div>
    </main>
  );
}
