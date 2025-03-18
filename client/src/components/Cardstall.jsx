// a card component to push an array from the

import React from "react";
import { stallList } from "../assets/stallImg/stallImg";

export function Cardstall() {
  return <>
  
  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  justify-center items-center w-full gap-10 px-6 sm:px-10 ">
      {stallList.map((stall) => (
        <li key={stall.id}
          className="w-full rounded-xl overflow-hidden shadow-lg flex flex-col items-center justify-center gap-6 h-full bg-red text-light-gray"
        >
          <div className="w-full h-64  flex items-center justify-center">
          <img 
          key={stall.id}
          src={stall.image} 
          alt={stall.name}
          className="w-full h-full object-cover object-center"
          />
          </div>
          
            <div className="flex flex-col items-center justify-center text-center w-[70%] md:w-[80%] ">
              <h1 className="text-xl">{stall.name}</h1>
              <p className=" md:text-base/6 lg:text-base/8 tracking-wider">{stall.address}</p>
              {/* will include button for the location */}
              <button type="button" className="btn btn-outline-primary">
                location
              </button>
            </div>

        </li>
      ))}
      
    </ul>

 
    
  </>;
}

export function CardStallLocation() {
  return <>
  </>;
}
