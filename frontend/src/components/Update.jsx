import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Update() {
    const {state}=useLocation();
    const [title,setTitle]=useState(state?.title||'');
    const [content,setContent]=useState(state?.content||'');
    const navigate=useNavigate();
    const handleUpdate=async (e)=>{
        e.preventDefault();
        const token=localStorage.getItem('token');
        try{
             await axios.post(`http://localhost:5000/update/${state.id}`, {
        title,
        content,
      },{
        headers:{
            Authorization: `Bearer ${token}`,
        },
      });
      alert("Note updated");
      navigate("/dashboard")
        }catch(error){
            console.log("Error updating note",err)
        }
    }

  return (
    <>
     <h1 className='text-2xl font-bold text-amber-950'>Updating Notes</h1>
   <form className="flex flex-col p-10" onSubmit={handleUpdate}>

    
                <label htmlFor="titlen">Title</label>
                <input
                  id="titlen"
                  type="text"
                  value={title}
                  className="bg-white w-50 h-10 rounded-2xl text-black text-xl p-2"
                   onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="contentn">Write your notes</label>
                <textarea
                
                  id="contentn"
                  className="bg-white rounded-2xl w-full h-200 text-black  p-2"
                  value={content}
                 onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button
                  className="w-40 rounded-full cursor-pointer text-xl m-5 p-2 border-2 border-black hover:bg-[#b8b8d1ff] active:bg-[#5b5f97ff]"
                  type="submit"
                >
                  Save Changes
                </button>
              </form>
              </>
  )
}

export default Update