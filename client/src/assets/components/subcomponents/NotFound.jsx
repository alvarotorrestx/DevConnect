import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-300 overflow-hidden">

      <div className="absolute inset-0 overflow-hidden">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 300" 
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
          style={{ height: '100%' }}
        >
          <path 
            fill="#E5E9EF" 
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,266.7C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path 
            fill="#CCD3DE" 
            d="M0,256L48,266.7C96,277,192,299,288,288C384,277,480,235,576,229.3C672,224,768,256,864,261.3C960,267,1056,245,1152,245.3C1248,245,1344,267,1392,277.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path 
            fill="#A4B2C4" 
            d="M0,288L48,277.3C96,267,192,245,288,245.3C384,245,480,267,576,272C672,277,768,267,864,272C960,277,1056,299,1152,293.3C1248,288,1344,256,1392,240L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path 
            fill="#6D84A4" 
            d="M0,224L48,229.3C96,235,192,245,288,250.7C384,256,480,256,576,250.7C672,245,768,235,864,234.7C960,235,1056,245,1152,250.7C1248,256,1344,256,1392,256L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      

      <div className="relative z-10 w-full max-w-sm bg-white rounded-xl shadow-lg p-8 mx-4 text-center">
    
        <div className="flex justify-center mb-6">
          <div className="bg-base-300 rounded-full p-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 9h.01M9 9h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 14.5c-1.333-1-2.667-1-4 0" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-slate-800 mb-3">Page Not Found</h1>
        
        <p className="text-slate-600 mb-6 text-sm">
          We can't find the page you're looking for.
        </p>
        
        <Link
          to="/"
          className="block w-full py-3 bg-[#6D84A4] text-white text-center font-medium rounded hover:bg-[#5D7494] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;