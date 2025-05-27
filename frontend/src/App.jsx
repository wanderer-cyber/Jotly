import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import MyNotes from "./components/MyNotes.jsx";
import Update from "./components/Update.jsx";



import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        userData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Something went wrong" };
    }
  };

  const loginUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        userData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Something went wrong" };
    }
  };

  const onsave = async (Notes) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      const response = await axios.post("http://localhost:5000/note", Notes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Note added");
      return response.data;
    } catch (error) {
      console.error("Error while saving note:", error);
      throw error.response?.data || { error: "Something went wrong" };
    }
  };

 
  return (
    <Router>
      <Layout registerUser={registerUser}>
        <Routes>
          <Route path="/login" element={<Login loginUser={loginUser} />} />
          <Route
            path="/signup"
            element={<Signup registerUser={registerUser} />}
          />
          <Route path="/dashboard" element={<Dashboard onsave={onsave} />} />
          <Route path="/mynotes" element={<MyNotes/>}/>
          <Route path='/update' element={<Update/>}/>
          <Route
            path="/"
            element={
              <section>
                <div className=" flex flex-row items-center justify-center bg-[#ffc145ff]">
                  <div className="bg-[#ffc145ff] w-500 mt-15 h-150 pt-19 lg:pl-100  items-center">
                    <h1 className="text-[100px] font-jack lg:text-[200px]">
                      Jotly...
                    </h1>

                    <p className="font-jack text-3xl pl-20 lg:text-5xl">
                      Jot down your notes
                    </p>
                  </div>

                  <div className="bg-[#08FFB5] w-110 h-110 rounded-full m-0 absolute bottom-20 right-1 mr-0 mb-0 flex items-center pr-0">
                    <img src="./src/assets/Jotly.png" className="rouned-xl" alt="Logo"/>
                  </div>
                </div>
              </section>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

function Layout({ children, registerUser }) {
  const location = useLocation();
  const noHeaderFooter = ["/login", "/signup", "/dashboard", "/mynotes","/update"];
  const hideHeaderFooter = noHeaderFooter.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header registerUser={registerUser} />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
