import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Vertical = () => {
    const [showSidebar,sestShowSidebar]=useState(false); 




    const navigate=useNavigate();
    const logout=()=>{
        localStorage.removeItem("token");
        alert("logged out");
        navigate("/login")
    }

  return (
     <div className="bg-[#5b5f97ff] w-[250px] p-10 block">

        <img
          src="/assets/profile.webp"
          alt="Profile image"
          className="w-30 h-30 p-2 rounded-full m-10"
        />

        <h1 className="font-bold text-xl font-stretch-condensed m-5  w-50 p-5">
          Hello User
        </h1>

        <nav className="min-h-screen bg-[#5b5f97ff] w-[50] text-xl font-bold">
          <ul className="flex flex-col gap-4 ">
            <Link to="/dashboard">
              <li>
                <button className="border-2 border-transparent m-0 w-50 p-5 hover:border-amber-100 hover:border-2 cursor-pointer rounded-3xl">
                  Create Notes
                </button>
              </li>
            </Link>
            <Link to="/mynotes">
            <li>
              <button className="border-2 border-transparent m-0 w-50 p-5 hover:border-amber-100 hover:border-2 cursor-pointer rounded-3xl">
                My Notes
              </button>
            </li>
            </Link>
              <li>
                <button className="border-2 border-transparent m-0 w-50 p-5 hover:border-amber-100 hover:border-2 cursor-pointer active:bg-[#3b3e65] rounded-3xl" onClick={()=>logout()}>
                  Log Out
                </button>
              </li>
          </ul>
        </nav>
        </div>
  )
}

export default Vertical;