// saving all button component that will use on the web
import { Navigate, useNavigate } from 'react-router'

import React from 'react'

export function ButtonContact(props){
  const {text} = props

  let Navigate = useNavigate();
  const  routeContact = () => {
    Navigate('/contact')
  }

  

  return (
    <button
    onClick={routeContact}
    className="bg-yellow py-2 px-3 rounded-2xl hover:bg-amber-500">
            {text}
    </button>
  )
}

export function Button() {
  return (
   <>
   </>
  )
}
