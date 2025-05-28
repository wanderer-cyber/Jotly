import React from 'react'

import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
    <div className="bg-[#5b5f97ff] w-full fixed top-0 left-0 flex items-center h-16 px-6 z-50 o justfiy-between">
      <div className='flex items-center'>
        <button className='m-0 p-0'><img src="/assets/Jotly.png" className="h-auto w-15 mb-3 mt-4 rounded-xl p-0" alt="Logo" /></button>
      <h1 className='text-xl font-bold'>Jotly</h1>
      </div>
        <nav className='ml-auto'>
        <ul className="flex justify-center space-x-5 "> 
           <Link to='/login'>
           <li><button  className='bg-black text-white px-4 py-1 rounded border-transparent border-2  hover:bg-black/75 5 hover:border-2 hover:border-indigo-500 cursor-pointer'>Log In</button></li>
           </Link> 
           <Link to="/signup">
           <li><button className='bg-black text-white px-4 py-1 rounded border-transparent border-2  hover:bg-black/75  hover:border-2 hover:border-indigo-500'>Sign Up</button></li> 
           </Link>
        </ul>
        </nav>
        </div>
    </header>
  )
}

export default Header