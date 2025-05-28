// src/components/Login.jsx
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function Login({loginUser}) {
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const data=await loginUser({email,password});
     if(data.token){
      localStorage.setItem('token',data.token)
      setMessage("Login Successful");

        setTimeout(()=>{
          navigate("/dashboard")
        },1000);
     }
     else if(data.error){
        setMessage(data.error)
     }
     else {
      setMessage("Invalid email or Password");
       }
    }catch(error){
        setMessage('An error occured. Please Try again');
        console.error(error);
    }
    
  };



  return (
    <section className="text-xl">
      <div className="flex flex-col items-center pt-50">
        <h1 className="text-3xl font-bold">Login Page</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-[#f0a40d]/50 h-100 w-100 flex flex-col rounded-xl overflow-hidden ">
            <div className="flex flex-col items-cent">
              <label className="ml-5 mt-20">Email</label>
              <input
                type="email"
                value={email}
                placeholder=" Enter a email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white text-black rounded w-80px ml-5 mr-5"
              />          
              <label className="ml-5 pt-10">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder=" Enter Password"
                className="ml-5 mr-5 bg-white text-black rounded
               
               "
              />
         </div>
          <button type="submit" className="m-10
            bg-[#2630b1] rounded-xl h-10 w-auto
            border-2 border-transparent
            hover:bg-[#676ec5] hover:border-amber-200
            active:bg-[#2630b1]
          ">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </section>
  );
}

export default Login;
