import React, { useState, useEffect } from 'react';
import usePromos from './hooks/usePromos';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL 

const Carousel = () => {
  const { promos, loading, error } = usePromos();
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayInterval = 4000; // 4 seconds

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (autoPlay && promos.length > 0) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => 
          prevIndex === promos.length - 1 ? 0 : prevIndex + 1
        );
      }, autoPlayInterval);
    }
    return () => clearInterval(interval);
  }, [autoPlay, promos.length]);

  const AutoPlayStop = () => setAutoPlay(false);
  const AutoPlayStart = () => setAutoPlay(true);

  const slideNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === promos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const slidePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? promos.length - 1 : prevIndex - 1
    );
  };

  if (loading) return <div>Loading promos...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!promos.length) return <div>No promos available</div>;

  return (
    <div
      className="py-3 my-5 relative w-full p-0 overflow-hidden flex justify-start items-center flex-row flex-nowrap bg-red "
      onMouseEnter={AutoPlayStop}
      onMouseLeave={AutoPlayStart}
    >
      {promos.map((promo ,index) => (
        <div
          key={promo.id || index }
          className="box-border min-w-full h-auto overflow-hidden object-cover transform transition-transform duration-1000 ease-in-out"
          style={{ display: index === activeIndex ? "block" : "none" }}
        >
          <img 
          
            src={`${API_BASE_URL}${promo.image_path}`} 
            alt={promo.name} 
            className="w-full h-auto max-h-[500px] object-cover"
            loading="lazy"
          />
         
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 flex">
        {promos.map((_, index) => (
          <button
            key={index}
            className={`relative w-3 h-3 p-0 rounded-full border border-gray-500 mx-1 transition-colors duration-300 ease-in-out ${
              activeIndex === index ? "bg-white" : "bg-transparent"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveIndex(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        className="display-none md:absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 outline-none border-0 text-white text-3xl w-10 h-10 rounded-full flex items-center justify-center"
        onClick={(e) => {
          e.preventDefault();
          slideNext();
        }}
        aria-label="Next slide"
      >
        {">"}
      </button>
      <button
        className="display-none md:absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 outline-none border-0 text-white text-3xl w-10 h-10 rounded-full flex items-center justify-center"
        onClick={(e) => {
          e.preventDefault();
          slidePrev();
        }}
        aria-label="Previous slide"
      >
        {"<"}
      </button>
    </div>
  );
};

export default Carousel;