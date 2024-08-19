'use client';
import React, { useRef, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from 'next/link';
import { useLogin } from '../Context/LoginContext';
import { jwtDecode } from "jwt-decode";
import "../../Styles/main.css";

interface DecodedToken {
  [key: string]: any; // Index signature for dynamic keys
}

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, logout } = useLogin();
  const [userRole, setUserRole] = useState<string | null>(null); // Initial state set to null

  useEffect(() => {
    const storedToken = sessionStorage.getItem('UserToken');
    if (storedToken) {
      try {
        const decodedToken: DecodedToken = jwtDecode(storedToken);
        const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        setUserRole(role);
      } catch (error) {
        console.error('Failed to decode token:', error);
        setUserRole(null); // Set role to null if there's an error
      }
    } else {
      setUserRole(null); // Set role to null if no token is present
    }
  }, [isLoggedIn]);

  const showNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle("responsive_nav");
    }
  };

  const handleLogout = () => {
    logout();
    sessionStorage.removeItem('UserToken');
    sessionStorage.removeItem('UserInfo');
    showNavbar();
  };

  return (
    <header>
      <nav ref={navRef} className="flex items-center mx-auto px-4">
        <Link href="/" onClick={showNavbar}>Home</Link>
        <Link href="/FoodSelect" onClick={showNavbar}>Our Food Selection</Link>
        {isLoggedIn && userRole === '1' && (
          <Link href="/admin" onClick={showNavbar}>Admin</Link>
        )}
        {isLoggedIn ? (
          <button onClick={handleLogout} className="nav-link-custom">
            Logout
          </button>
        ) : (
          <Link href="/Login" onClick={showNavbar}>Login</Link>
        )}
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
