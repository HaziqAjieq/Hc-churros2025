import React, { useEffect, useState } from "react";
import { promoImg } from "../assets/sliderImg/slider";
// import for custslider component
import { sliderImg } from "../assets/sliderImg/sliderCust";
// import swiper


// HeroSlider
export function HeroSlider() {
  const [currentImg, setCurrentImg] = useState(0);

  // set 4 second slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prevImg) => (prevImg + 1) % promoImg.length);
    }, 4000); //4 second timer

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      aria-label="Image-slider"
      className="hero-slider relative w-full h-full  "
    >
      <div className="slider-container w-full h-full flex overflow-hidden">
        {promoImg.map((image, index) => (
          <div key={image.id} className="realtive w-full h-full">
          <img
            key={image.id}
            src={image.image}
            alt={image.name}
            className={`slider-image 
                w-full h-full object-fill absolute  top-0 left-0 transition-opacity duration-500
                ${index === currentImg ? "opacity-100" : "opacity-0"} `}
          />
             {/* Dark Overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/30" // Adjust opacity (e.g., 0.5 for 50% darkness)
        ></div>
              
          </div>
        ))}
      </div>
    </section>
  );
}

// CustSlider
export function CustSlider() {
  return 
  <>
  
  </>;
}
