import React from 'react'
import Form from './Form'

export default function Footer() {
  return (
    <div className='bg-red flex flex-col gap-[3rem] lg:flex-row mt-10 px-30 items-center  xl:gap-10 text-light-gray  '>
      <div className='lg:grow-0'>
      <Form/>
      </div>
      <div className='flex flex-col items-center justify-center gap-5 lg:grow-1 '>
        {/* direction to social media */}
        <ul className='flex gap-10'>
          <li><i class="fa fa-instagram" aria-hidden="true"></i></li>
          <li><i class="fa fa-facebook" aria-hidden="true"></i></li>
          <li><i class="fa fa-tiktok" aria-hidden="true"></i></li>
          <li><i class="fa fa-whatsapp" aria-hidden="true"></i></li>
        </ul>
        {/* copyright remark */}
        <p className='text-center'>Copyright © 2025 Muhammad Haziq.
        </p>

      </div>
    </div>
  )
}
