import React from 'react'

import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
   <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-2xl sm:p-8">
        
        <h1 className="mt-2 text-center text-2xl font-serif text-black sm:text-3xl">
          Create an account
        </h1>

        <p className="mt-2 text-center text-sm text-gray-600 sm:text-base">
          Enter your information to get started
        </p>
 <div className="mt-4">
          <label className="block font-semibold">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="mt-2 h-10 w-full rounded bg-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
         <div className="mt-4">
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            className="mt-2 h-10 w-full rounded bg-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
         <div className="mt-4">
          <label className="block font-semibold">Password</label>
          <input
            type="email"
            placeholder="Create a password"
            className="mt-2 h-10 w-full rounded bg-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
         <div className="mt-4">
          <label className="block font-semibold">Confirm password</label>
          <input
            type="email"
            placeholder="Confirm you password"
            className="mt-2 h-10 w-full rounded bg-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">Or continue with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

       
        <button className="h-10 w-full rounded-xl bg-black text- text-white transition hover:bg-gray-900">
          Create account
        </button>

       
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button className="flex w-full items-center justify-center gap-3 rounded-xl border py-2 hover:bg-gray-300">
            <FcGoogle size={20} />
            Google
          </button>

          <button className="flex w-full items-center justify-center gap-3 rounded-xl border py-2 hover:bg-gray-300">
            <FaGithub size={20} />
            GitHub
          </button>
        </div>

        {/* Sign Up */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?
          <Link to="/" className="ml-2 text-blue-600 hover:underline"> Sign In </Link>
        </div>

      </div>
    </div>
  )
}

export default Register
