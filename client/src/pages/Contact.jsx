import React from 'react'
import { PageHeader } from '../components/Header'
import promo4 from '../assets/sliderImg/promo4.jpg'

export default function Contact() {
  return (
    <main className="z-0 text-sm sm:text-base sm:max-w-7xl mx-auto pt-0 sm:px-6 ">
          <div className="mt-[6.5rem] sm:mt-[7rem] md:mt-[7rem] lg:mt-[7rem]">
            <PageHeader
              title={"Hubungi Kami!"}
              description={"Kami suka dengar dari anda – sama ada untuk tempahan, feedback, atau sekadar kongsi cerita churros!"}
              backgroundImage={promo4}
            />
    <div>
      Contact
    </div>
    </div>
    </main>
  )
}
