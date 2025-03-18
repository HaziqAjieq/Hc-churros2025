import React from 'react'

export  function Header({title , description}) {


  return (
    <div
    className='bg-red flex flex-col gap-4 w-full rounded-3xl py-5 my-4'
    >
      <div
      className='flex flex-col items-center justify-center gap-2'
      >
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      
      
    </div>
  )
}
