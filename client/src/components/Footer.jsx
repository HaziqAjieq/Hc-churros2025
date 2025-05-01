import React from 'react'
import Form from './Form'
import Logo from "../assets/image/svgviewer-png-output.png";



export default function Footer() {
  return (
    <div className='bg-red flex flex-col md:gap-[3rem] lg:flex-row mt-10 px-30 items-center  xl:gap-10 text-light-gray  '>
      <div className='lg:grow-0'>
      <Form/>
      </div>
      <div className='flex flex-col items-center justify-center gap-5 md:gap-10 lg:grow-1 '>
        {/* logo footer */}
        <img src={Logo} alt="hc-churros logo"  className='max-h-fit size-[15rem]'/>

        {/* direction to social media */}
        <ul className='flex gap-10'>
          <li className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl hover:cursor-pointer hover:text-yellow'><i className="fa fa-instagram" aria-hidden="true" ></i></li>
          <li className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl hover:cursor-pointer hover:text-yellow'><i className="fa fa-facebook" aria-hidden="true"></i></li>
          <li className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl hover:cursor-pointer hover:text-yellow'><i className="fa-brands fa-tiktok" aria-hidden="true"></i></li>
          <li className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl hover:cursor-pointer hover:text-yellow'><i className="fa fa-whatsapp" aria-hidden="true"></i></li>
        </ul>
        {/* copyright remark */}
        <p className='text-center text-sm'>Copyright © 2025 Muhammad Haziq.
        </p>

      </div>
    </div>
  )
}
