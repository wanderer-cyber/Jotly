import React, { useState } from "react";
import Vertical from "./Vertical.jsx";

const Dashboard = ({ onsave }) => {
  const [showInput, setShowInput] = useState(false);
  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  

  const handleClick = (e) => {
    e.preventDefault();
    setShowInput(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    try {
      onsave({ title, content: notes });
      setMessage("Note saved successfully");
      setTitle("");
      setNotes("");
      setShowInput(false);
    } catch (error) {
      console.error("Error saving note:", error);
      setMessage(error.error || "Something went wrong");
    }
  };

  return (
    <div className="flex w-full overflow-x-hidden min-h-screen">
      <Vertical />
      <div className="pl-10 m-10 p-10 w-full ">
        <h1 className="text-5xl">Create Notes</h1>

        <div className="flex flex-col ">
          <button
            className="cursor-pointer text-3xl border-2 items-center mt-10 h-10 w-20 rounded-2xl hover:bg-amber-700 "
            onClick={handleClick}
          >
            +
          </button>
          <div className=" bg-amber-500lg:overflow-x-hidden h-full">
            {showInput && (
              <form className="flex flex-col mt-10" onSubmit={handleSave}>
                <label htmlFor="titlen">Title</label>
                <input
                  id="titlen"
                  type="text"
                  value={title}
                  className="bg-white w-50 h-10 rounded-2xl text-black text-xl p-2"
                  placeholder="Enter Title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <label htmlFor="contentn">Write your notes</label>
                <textarea
                  value={notes}
                  id="contentn"
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter your notes here"
                  className="bg-white rounded-2xl w-full h-200 text-black  p-2"
                ></textarea>
                <button
                  className="w-40 rounded-full cursor-pointer text-xl m-5 p-2 border-2 border-black hover:bg-[#b8b8d1ff] active:bg-[#5b5f97ff]"
                  type="submit"
                >
                  Save
                </button>
                {message && <p>{message}</p>}
              </form>
            )}


          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
