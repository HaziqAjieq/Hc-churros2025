// saving all button component that will use on the web
import { Navigate, useNavigate } from "react-router";

import React from "react";

export function ButtonContact(props) {
  const { text } = props;

  let Navigate = useNavigate();
  const routeContact = () => {
    Navigate("/contact");
  };

  return (
    <button
      onClick={routeContact}
      className="bg-yellow py-3 px-6 rounded-3xl hover:bg-amber-500 font-semibold cursor-pointer text-black"
    >
      {text}
    </button>
  );
}

// for homepage cardstall

export function ViewMoreBtn(props) {
  const { text } = props;
  let navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => {
          navigate("/location");
        }}
        className="bg-yellow py-2 px-3 rounded-2xl hover:bg-amber-500 font-semibold cursor-pointer"
      >
        {text}
      </button>
    </>
  );
}

//for locations cardlocation

export function LocationBtn({mapLink,text = "Location"}){
  const handleClick = () =>{
    if (!mapLink) {
     console.warn("No map link provided for this location")
    }

    const safeLink = mapLink.includes('://')
    ? mapLink : `https://${mapLink}`;

    window.open(safeLink, '_blank', 'noopener,noreferrer')

  }
  return(
    <>
    <button
        onClick={handleClick}
        disabled={!mapLink}
        className="bg-yellow py-2 px-3 rounded-2xl hover:bg-amber-500 font-semibold cursor-pointer"
      >
        {text}
      </button>
    </>
  )
}

export function Button() {
  return <></>;
}
