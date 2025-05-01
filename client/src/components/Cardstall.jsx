// a card component to push an array from the

import React, { useState, useEffect } from "react";
import axios from "axios";
import { stallList } from "../assets/stallImg/stallImg";
import { ViewMoreBtn } from "./Button";
import { LocationBtn } from "./Button";
import useStalls from "./hooks/useStalls";

export function Cardstall({ limit = 6 }) {
  const { stalls, loading, error } = useStalls();

  if (loading) return <div className="text-center py-8">Loading stalls...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error:{error}</div>;

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  justify-center items-center w-full gap-10 px-6 sm:px-10 ">
        {stalls.slice(0, limit).map((stall) => (
          <li
            key={stall.stall_id}
            className="w-full rounded-xl overflow-hidden shadow-lg flex flex-col items-center justify-center gap-6 h-full bg-red text-light-gray"
          >
            <div className="w-full h-64  flex items-center justify-center">
              {stall.image_path ? (
                <img
                  key={stall.stall_id}
                  src={stall.image_path  ? `http://localhost:3000${stall.image_path}` : '/placeholder-image.jpg'}
                  alt={stall.stall_name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.src = "/default-stall-image.jpg";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span>No Image</span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center justify-center text-center w-[70%] md:w-[80%] gap-4">
              <h1 className="text-xl text-yellow uppercase">
                {stall.stall_name}
              </h1>
              <p className=" md:text-base/6 lg:text-base/8 tracking-wider">
                {stall.address}
              </p>
              {/* will include button for the location */}
              <div className="p-4 text-black w-full">
                <LocationBtn mapLink={stall.google_maps_url} text="Location" />
              </div>
            </div>
          </li>
        ))}
        {/* show view more that will direct to location page is more than 6 stall */}

        {stalls.length > limit && (
          <div className="flex items-center justify-center sm:col-span-2 lg:col-span-3">
            <ViewMoreBtn text="View More" />
          </div>
        )}
      </ul>
    </>
  );
}

export function CardStallLocation() {
  return (
    <>
      <div className=" space-y-8  sm:p-6 ">
        {stallList.map((stall, index) => (
          <div
            key={stall.id}
            className={`flex flex-col md:flex-row bg-red rounded-4xl overflow-hidden shadow-lg  md:h-[60vh] w-full ${
              index % 2 === 0 ? "" : "md:flex-row-reverse"
            }`}
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-auto">
              <img
                src={stall.image}
                alt={stall.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              {/* stall name */}
              <h1 className="text-3xl md:text-4xl font-bold text-yellow mb-4 text-center md:text-left">
                {stall.name}
              </h1>
              {/* stall address */}
              <p className="leading-relaxed mb-6 text-center md:text-left text-lg md:text-xl lg:text-2xl">
                {stall.address}
              </p>

              <LocationBtn mapLink={stall.mapLink} text="Location" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
