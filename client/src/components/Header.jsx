import React from "react";

export function Header({ title }) {
  return (
    <div className="bg-red flex flex-col gap-4 w-full rounded-3xl py-5 my-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1>{title}</h1>
      </div>
    </div>
  );
}

export function PageHeader({ title, description, backgroundImage }) {
  return (
    <div
      className="w-full relative h-[50vh] md:h-[50vh] mb-4 flex items-center justify-center sm:rounded-3xl md:rounded-3xl overflow-hidden bg-black/40 "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000/",
      }}
    >
      <div className="bg-black/30 w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center w-[60vw] md:w-[70vw] lg:w-[80vw] gap-5 ">
          <h1 className="text-center text-4xl md:text-5xl lg:text-6xl text-yellow">
            {title}
          </h1>
          <p className="text-center text-sm md:text-lg lg:text-xl text-white font-bold">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
