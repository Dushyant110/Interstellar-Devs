import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Carousel from '../components/Carousel';

function HomePage(){
    return(
        <div className='min-h-screen bg-gradient-to-b from-black to-blue-950 relative overflow-hidden'>

            <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-transparent z-10">
                <Link to="/" className="flex items-center">
                    <img
                        src="../../logo.png" 
                        alt="Logo"
                        className="h-11" 
                    />
                </Link>
                <Link to="/login" className="text-white bg-indigo-600 rounded px-6 py-3 transition-all duration-300 ease-in-out hover:bg-indigo-700 hover:shadow-lg hover:rounded-2xl">
                    Login
                </Link>
            </nav>

            <div className="absolute inset-0 flex flex-wrap justify-center pointer-events-none z-0">
                {Array.from({ length: 50 }).map((_, index) => (
                    <div key={index} className={`dot dot-${index}`} />
                ))}
            </div>
            
            <div className="container col-xxl-8 px-4 py-5 mt-5">
    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div className="col-10 col-sm-8 col-lg-6">
        <img src="../../hero.png" className="d-block mx-lg-auto img-fluid rounded-lg" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
      </div>
      <div className="col-lg-6">
        <h1 className="text-white display-5 font-bold lh-1 mb-3">Responsive left-aligned hero with image</h1>
        <p className="lead text-white">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
        
      </div>
    </div>
  </div>     
            
        <Carousel />

        <style jsx>{`
                .dot {
                    width: 5px; /* Size of the dots */
                    height: 5px; /* Size of the dots */
                    background-color: rgba(255, 255, 255, 0.7); /* Base color */
                    border-radius: 50%;
                    position: absolute;
                    animation: glow 1.5s infinite alternate; /* Glow animation */
                    pointer-events: none; /* Prevent interaction */
                    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.5); /* Neon glow */
                }

                /* Animation for glowing effect */
                @keyframes glow {
                    0% {
                        transform: scale(1);
                        opacity: 0.7; /* Start opacity */
                    }
                    100% {
                        transform: scale(1.5);
                        opacity: 1; /* End opacity */
                    }
                }

                /* Position each dot randomly */
                ${Array.from({ length: 50 }).map((_, index) => `
                    .dot-${index} {
                        left: ${Math.random() * 100}%; /* Random horizontal position */
                        top: ${Math.random() * 100}%; /* Random vertical position */
                        animation-delay: ${Math.random() * 2}s; /* Random animation delay */
                    }
                `).join('')}
            `}</style>
         
  
        </div>  
                  
    );
}

export default HomePage;