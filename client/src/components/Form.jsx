import React from 'react'

export default function Form() {
  return (
    <div className='bg-red flex flex-col items-center justify-center rounded-2xl '>
      <h1 className='pt-[2rem] text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow'>Give Us Your Feedback!</h1>
    <form action="https://formsubmit.co/haziqajieq98@gmail.com" method="POST" className=' flex flex-col gap-5 py-8 w-[80vw] sm:w-[60vw] lg:w-[40vw] text-gray-800'>
      <input className='bg-white rounded-full p-[1rem]' type="text" name='name' placeholder='Your Name' required />
        <div className='flex flex-col md:flex-row gap-2 w-full'>
        <input className='bg-white rounded-full p-[1rem] w-full' type="email" name='email' placeholder='Email' required />
        <input className='bg-white rounded-full p-[1rem]' type="number" name='phone number' placeholder='Phone Number' required />
        </div>
      <textarea className='bg-white rounded-lg p-[1rem]' placeholder="Leave a comment..."></textarea>
      <button type='submit' className='bg-yellow font-semibold p-2 rounded-3xl cursor-pointer hover:bg-amber-500'>Submit</button>
    </form>
    </div>
  )
}


// https://formsubmit.co/hotandcoldhq@gmail.com