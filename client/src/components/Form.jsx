import React from 'react'

export default function Form() {
  return (
    <div className='bg-red flex items-center justify-center rounded-2xl my-6'>
    <form action="https://formsubmit.co/haziqajieq98@gmail.com" method="POST" className=' flex flex-col gap-5 py-8 w-[80vw]'>
      <input className='bg-white' type="text" name='name' placeholder='Your Name' required />
        <div className='flex flex-col md:flex-row gap-2 w-full'>
        <input className='bg-white w-full' type="email" name='email' placeholder='Email' required />
        <input className='bg-white  w-full' type="number" name='phone number' placeholder='Phone Number' required />
        </div>
      <textarea className='bg-white' placeholder="Leave a comment..."></textarea>
      <button type='submit'>Submit</button>
    </form>
    </div>
  )
}


// https://formsubmit.co/hotandcoldhq@gmail.com