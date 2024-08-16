'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Image from 'next/image';
import sushiPic from './images/sushiPic.jpg';
import arayesPic from './images/arayesPic.jpg';
import { useRouter } from 'next/navigation';

// NOTE TO SELF
// WHEN SETTING UP ADMIN MICROSERVICE PASS THE USER TOKEN AND NOT THE ADMINTOKEN
// ADMIN TOKEN WILL GIVE ANYONE ACCESS, USER TOKEN WOULD BE US RESTRICTING THE ADMIN PAGE 
// TO ONLY USER WITH ADMIN PRIVELAGES SMORT THINKING THERE
// our backend can handle both anyway

const HomePage = () => {
  const { push } = useRouter(); // Use push method from useRouter

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = sessionStorage.getItem('AdminToken');

    if (!token) {
      // Redirect to the 404 page if token does not exist
      // ik this page dosent exist, but it stops users from not going onto the correct page until 
      // token is generated
      // next is cool and has its own little 404 anyway soo this will be fine (in theory)
      // if not we can create our own 
      push('/404'); // Using push for redirection
    }
  }, [push]);
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side */}
      <div className="flex-1 relative">
        <Image
          src={sushiPic}
          alt="Sushi"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Link href="/Food?type=Sushi" className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors">
            See our Sushi selections
          </Link>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 relative">
        <Image
          src={arayesPic}
          alt="Arabic Food"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Link href="/Food?type=Arabic" className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors">
            See our Arabic food selection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
