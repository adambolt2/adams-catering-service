"use client";
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { fetchAndStoreAdminToken } from './api/authApi';
import { useEffect } from 'react';
import corporate from './images/corparate.jpg';
import wedding from './images/Wedding.jpeg';
import party from './images/party.jpg'
export default function Home() {
 
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });
  const { ref: servicesRef, inView: servicesInView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });
  const { ref: contactRef, inView: contactInView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });
  useEffect(() => {
    fetchAndStoreAdminToken(); // Call the function to fetch and store the token when the component mounts
  }, []);


  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`relative bg-blue-900 text-white flex items-center justify-center min-h-screen transition-opacity duration-1000 ${
          heroInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="relative container mx-auto px-4 sm:px-6 md:px-8 text-center z-10 flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Welcome to Catering4U
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6">
            Your premier catering service for all events and occasions.
          </p>
          <a
            href="#contact"
            className="bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>

{/* Services Section */}
<section
  ref={servicesRef}
  className={`bg-white min-h-screen flex items-center justify-center transition-opacity duration-1000 ${
    servicesInView ? 'opacity-100' : 'opacity-0'
  }`}
>
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
    <div className="flex flex-col md:flex-row lg:flex-row gap-12">
      {/* Service 1 */}
      <div
        className="flex-1 bg-cover bg-center text-white flex items-center justify-center relative rounded-lg overflow-hidden"
        style={{ 
          opacity: 0,

          backgroundImage: `url(${corporate.src})`,
          height: '500px', // Increased height
          width: '100%', // Full width of the container
          animation: servicesInView ? 'fadeIn 1s ease-out forwards' : 'none',
          animationDelay: servicesInView ? '0s' : 'none', // Increased delay
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg text-center w-full h-full flex flex-col justify-center">
          <h3 className="text-3xl font-semibold mb-4">Corporate Events</h3>
          <p>
            We specialize in providing catering services for corporate events, from small meetings to large conferences.
          </p>
        </div>
      </div>
      {/* Service 2 */}
      <div
        className="flex-1 bg-cover bg-center text-white flex items-center justify-center relative rounded-lg overflow-hidden"
        style={{ 
          opacity: 0,

          backgroundImage: `url(${wedding.src})`,
          height: '500px', // Increased height
          width: '100%', // Full width of the container
          animation: servicesInView ? 'fadeIn 1s ease-out forwards' : 'none',
          animationDelay: servicesInView ? '0.4s' : 'none', // Increased delay
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg text-center w-full h-full flex flex-col justify-center">
          <h3 className="text-3xl font-semibold mb-4">Weddings</h3>
          <p>
            Make your wedding day special with our exquisite menu options and impeccable service.
          </p>
        </div>
      </div>
      {/* Service 3 */}
      <div
        className="flex-1 bg-cover bg-center text-white flex items-center justify-center relative rounded-lg overflow-hidden"
        style={{ 
          opacity: 0,
          backgroundImage: `url(${party.src})`,
          height: '500px', // Increased height
          width: '100%', // Full width of the container
          animation: servicesInView ? 'fadeIn 1s ease-out forwards' : 'none',
          animationDelay: servicesInView ? '0.6s' : 'none', // Increased delay
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg text-center w-full h-full flex flex-col justify-center">
          <h3 className="text-3xl font-semibold mb-4">Private Parties</h3>
          <p>
            Whether it&apos;s a birthday party or a family gathering, we offer customized catering solutions for your private events.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* About Section */}
      <section
        ref={aboutRef}
        className={`bg-blue-50 min-h-screen flex items-center justify-center transition-opacity duration-1000 ${
          aboutInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">About Us</h2>
          <p className="text-lg mb-6">
            At Catering4U, we are dedicated to providing top-notch catering services with a focus on quality, flavor, and presentation. Our team of culinary experts and event planners work together to ensure that every event is a memorable experience.
          </p>
          <a
            href="#contact"
            className="bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={contactRef}
        id="contact"
        className={`bg-gray-100 min-h-screen flex items-center justify-center transition-opacity duration-1000 ${
          contactInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">Contact Us</h2>
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
     
    </div>
  );
}
