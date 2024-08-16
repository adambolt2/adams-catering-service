'use client'
import React, { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from 'next/link'; 
import "../../Styles/main.css"

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null); // Type the useRef

  const showNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle("responsive_nav");
    }
  };



  return (
    <header>

      <nav ref={navRef} className="flex items-center  mx-auto px-4">
        {/* Use Link component directly without <a> */}
        <Link href="/" onClick={showNavbar}>Home</Link>
        <Link href="/FoodSelect" onClick={showNavbar}>Our Food Selection</Link>
        <Link href="/about-me" onClick={showNavbar}>Login</Link>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};


export default Navbar;
