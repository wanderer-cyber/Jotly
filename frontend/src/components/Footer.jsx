

import React from "react";

function Footer() {
  return (
    <footer className="flex flex-col bg-[#08FFB5]">
      <div className="flex py-10 space-x-30">
        <div>
          <h2 className="text-2xl text-black font-bold pr-10">Jotly</h2>
        </div>
        <div className="text-black">
          <h3 className="text-black text-xl font-bold">Contact us</h3>
          <ul className="text-black">
           <li><a href="https://www.linkedin.com/in/karthik-gourav-visinigiri-56b8532a4" target="blank" className="text-black"><i className="fab fa-linkedin"></i>LinkedIn</a></li>
            <li><a href="https://www.instagram.com/v.karthikgourav/
" className="text-black"><i className="fab fa-instagram"></i> Ig</a></li>
            <li><a href="https://github.com/wanderer-cyber/Jotly
" className="text-black"><i className="fab fa-github"></i>Github</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-black font-bold text-xl">Have Fun</h3>
          <p className="text-black italic">I am a beginner in web dev field, just doing some projects having fun.. </p>
        </div>
        <div>
          <img src="/assets/2.png" alt="" className="h-65 w-65 lg:mg-100 ml-auto rounded-full"/>
        </div>
      </div>

      <div className="bg-black text-white py-2 text-center w-full">
        vkg.karthik.gourav@email.com
      </div>
    </footer>
  );
}

export default Footer;
