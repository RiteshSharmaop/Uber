import React from 'react'
import { Link, Route } from 'react-router-dom'

function Start() {
  return (
    <>
        <div className='bg-[url(https://images.unsplash.com/photo-1586805372042-327a923a697a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyYWZmaWN8ZW58MHx8MHx8fDA%3D)] h-screen w-full pt-8  flex justify-between flex-col  '>
            <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

            <img src="" alt="" />
            <div className='bg-white py-4 px-4 '>
                <h2 className='text-3xl font-bold'>Get Started with Uber </h2>
                <Link to= "/login" className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </>
  )
}

export default Start