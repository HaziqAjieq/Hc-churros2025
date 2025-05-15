import React from "react";
import { PageHeader } from "../components/Header";
import promo4 from "../assets/sliderImg/promo4.jpg";
import promo3 from "../assets/sliderImg/promo3.jpg"
import promo2 from "../assets/sliderImg/promo2.jpeg"
import Form from "../components/Form";

export default function Contact() {
  return (
    <main className="z-0 text-sm sm:text-base sm:max-w-7xl mx-auto pt-0 sm:px-6 ">
      <div className="mt-[6.5rem] sm:mt-[7rem] md:mt-[7rem] lg:mt-[7rem]">
        <PageHeader
          title={"Hubungi Kami!"}
          description={
            "Kami suka dengar dari anda – sama ada untuk tempahan, feedback, atau sekadar kongsi cerita churros!"
          }
          backgroundImage={promo4}
        />
        <div className="flex flex-col rounded-4xl  md:flex-row-reverse bg-red shadow-lg min-h-[50vh]">
          {/* image section */}

          <div className="w-full md:w-1/2 h-64 md:h-auto ">
            <img
            src={promo2}
              alt="about image"
              className="w-full h-full object-cover object-center rounded-tr-4xl rounded-tl-4xl md:rounded-tl-none md:rounded-e-4xl "
            />
          </div>
          {/* content section */}
          <div className="flex flex-col w-full md:w-1/2 p-8 md:p-12 justify-center ">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow mb-4 text-center md:text-left">
              Media Social
            </h1>
           
            <ul className="flex flex-col gap-3 justify-center text-center md:items-start   ">
              <li className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl hover:cursor-pointer text-white hover:text-yellow items-start ">
                <a
                  href="https://www.instagram.com/hcchurros.official/?locale=en&hl=am-et"
                  target="_blank"
                >
                  <h1>
                    <i className="fa fa-instagram px-3 " aria-hidden="true"></i>
                  Instagram
                  </h1>
                  
                </a>
              </li>
              <li className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl hover:cursor-pointer text-white hover:text-yellow">
                <a
                  href="https://www.facebook.com/profile.php?id=61550071262381"
                  target="_blank"
                >
                  <h1>
                    <i className="fa fa-facebook px-3" aria-hidden="true"></i>
                  Facebook
                  </h1>
                  
                </a>
              </li>
              <li className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl hover:cursor-pointer text-white hover:text-yellow">
                <a
                  href="https://www.tiktok.com/@hcchurros.official"
                  target="_blank"
                >
                  <h1>
                       <i className="fa-brands fa-tiktok px-3 " aria-hidden="true"></i>
                  Tiktok
                  </h1>
               
                </a>
              </li>
              <li className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl hover:cursor-pointer text-white hover:text-yellow">
                <a href="https://wa.me/+601167679179" target="_blank" >
                <h1>
                  <i className="fa fa-whatsapp px-3" aria-hidden="true"></i>
                  Whatsapp</h1>
                </a>
              </li>
            </ul>
            
          </div>

          
        </div>


        <div className="flex flex-col rounded-4xl   bg-red shadow-lg min-h-[50vh] mt-5">
          {/* image section */}

          <div className="relative w-full h-64 md:h-120 bg-black rounded-tr-4xl rounded-tl-4xl ">
            <img
              src={promo3}
              alt="about image"
              className="w-full h-full object-cover object-center rounded-tr-4xl rounded-tl-4xl  opacity-70 "
            />
            <div className="absolute md:ml-10 flex flex-col top-1/2 left-1/2 md:left-1/3 md:mr-3 transform -translate-x-1/2 -translate-y-1/2 items-start  gap-3"> 
              <h1 className="flex items-start font-semibold text-2xl md:text-3xl lg:text-4xl text-yellow" >
              "HC Churros: Rangup, Manis, Jadi Kegemaran Semua!"
            </h1>
            <p className="flex items-start md:text-xl lg:text-2xl">
             HC Churros menawarkan churros rangup dan sedap untuk semua. Sekarang, kami buka peluang francais! Dengan sokongan penuh dari kami, anda boleh mulakan perniagaan dengan mudah. Jom join HC Churros hari ini!
            </p>

            </div>
          
          </div>
          {/* content section */}
         
           <Form text={'E-mail Kepada Kami!'}/>
        

          
        </div>
      </div>
    </main>
  );
}
