import { useEffect, useState } from 'react';
import Vertical from './Vertical';
import axios from 'axios'
import { Link } from 'react-router-dom';

const  MyNotes = () => {
  const [notes,setNotes]=useState([]);
   useEffect(() => {
       const fetchn = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("sending token: ",token)
      setNotes(response.data);
      console.log(response.data)
      console.log('received')
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };
    fetchn();
  }, []);

  const deleteNote=async(noteId)=>{
    try{
      const token=localStorage.getItem('token')
      const response=await fetch(`http://localhost:5000/delete/${noteId}`,{method:'DELETE',headers:{
        Authorization: `Bearer ${token}`
      }});

      const data=await response.json();

      if(response.ok){
        setNotes(notes.filter(note=>note.id!==noteId));
        console.log(data.message);
      }else{
        console.log('Delete failed:',data.error);
      }
    }catch(error){
      console.log("Error deleting note: ",error)
    }
  }




  return (
    <div className='flex'>
     <Vertical/>
    <h1 className='text-3xl font-bold absolute top-0 md:left-63'>Your Notes</h1>
    <div className=' grid grid-cols-5  md:grid-cols-3 sm:grid-cols-2 p-10'>
        {notes.length===0 ? (<p>No Notes Found</p>): (
            notes.map((note,index)=>(
             <div key={index} className='m-5 bg-[#5b5f97ff] h-70 w-45 rounded-2xl p-2'>
            <div className='h-45 bg-[#ffc145ff] rounded-t-2xl  rounded-b-xl p-2 overflow-hidden'>
                {note.content}
            </div>
            <div>
                <h1 className='text-xl font-bold italic p-1'>{note.title}</h1>
                <div className='flex gap-1'>
                <Link to="/update" state={{id:note.id, title:note.title, content:note.content}}>
                <button className='border-2 p-1 rounded-2xl w-20 cursor-pointer
                hover:bg-[#ffc145ff]'>Update</button>
                </Link>
                <button className='border-2 p-1 rounded-2xl ml-4 w-20 cursor-pointer hover:bg-[#ffc145ff]' onClick={()=>deleteNote(note.id)}>Delete</button>
                </div>
            </div>
        </div>
        )))}
    </div>
    </div>
  )
}
export default MyNotes;