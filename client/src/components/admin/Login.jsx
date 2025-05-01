import React from 'react'
import Logo from "../../assets/image/svgviewer-png-output.png";

export default function Login() {
  return (
    <main className="z-0 text-sm sm:text-base sm:max-w-7xl mx-auto pt-0 sm:px-6 ">
    <div className="mt-[6.5rem] sm:mt-[7rem] md:mt-[7rem] lg:mt-[7rem] flex items-center justify-center h-[80vh] w-full">
      <div className="login-container flex flex-col items-center justify-center h-[80%] bg-red w-[90%] md:w-[80%] rounded-3xl">
        <img src={Logo} alt="" className="max-h-fit size-[10rem]" />
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-yellow pb-4">
          Admin Login
        </h1>
        
        {/* {error && <div className="text-white bg-red-600 p-2 rounded mb-4">{error}</div>} */}

        <form  className="flex flex-col gap-5 w-full max-w-md">
          <div className="grid grid-cols-3 items-center justify-center">
            <label htmlFor="username" className="text-white font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              // autoComplete="username" // New - helps password managers
              // value={username}
              // onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-white col-span-2 rounded-2xl p-2"
            />
          </div>

          <div className="grid grid-cols-3 items-center justify-center">
            <label htmlFor="password" className="text-white font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password" // New - helps browsers/password managers
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white col-span-2 rounded-2xl p-2"
              
            />
          </div>

          <button
            className="bg-yellow py-2 hover:bg-yellow-500 rounded-3xl font-semibold"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </main>
  )
}
