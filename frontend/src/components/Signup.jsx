import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = ({registerUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate=useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords don't  Match");
      return;
    }

    try {
      const data = await registerUser({ email, password });
      setMessage(data.message || "User register successfully");
      setTimeout(()=>{
        navigate("/login");
      },1000);
    
    } catch (error){
      setMessage(error.error || "Failed to register");
    }
  };


  return (
    <section>
      <div className="flex flex-col text-2xl items-center justify-center">
        <form
          className="flex flex-col bg-[#f0a40d]/50 lg:h-120 lg:w-100 md:h-120 md:w-100 sm:h-120 sm:w-90 h-100 w-90 mt-50 rounded-2xl items-center space-y-1 "
          onSubmit={handleSubmit}
        >
          <h1 className="pt-5 text-3xl font-bold">Sign Up</h1>
          <div className="flex flex-col mt-5 pl-5 pr-8 rounded-2xl">
            <label>Email</label>
            <input
              type="email"
              placeholder=" Enter email"
              className="bg-white text-black rounded "
              value={email} onChange={e=>setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-5 pl-5 pr-8 rounded-2xl">
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="bg-white text-black rounded "
              value={password} onChange={e=>setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-5 pl-5 pr-8 rounded-2xl">
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="bg-white text-black rounded "
              value={confirmpassword} onChange={e=>setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className="m-10
            bg-[#2630b1] rounded-xl  w-50 p-2
            border-2 border-transparent
            hover:bg-[#676ec5] hover:border-amber-200
            active:bg-[#2630b1] cursor-pointer
          "
          >
            Sign Up
          </button>

          {message&&<p>{message}</p>}
        </form>
      </div>
    </section>
  );
};

export default Signin;
