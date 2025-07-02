import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-[10%] w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-[10%] w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-10 left-[30%] w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Logo/Icon Section */}
        <div className="mb-8">
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            
            {/* Inner pulsing circle */}
            <div className="absolute inset-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse shadow-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>

        {/* Dot Animation Container */}
        <div className="container mb-8" id="loader">
          <div className="flex space-x-2 justify-center items-center">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-bounce shadow-sm"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '1s'
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent animate-pulse">
            Loading
          </h1>
          
          <p className="text-lg text-gray-600 font-medium animate-fade-in">
            Connecting to server...
          </p>
          
          {/* Progress indicator */}
          <div className="mt-6 w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse-width"></div>
          </div>
          
          {/* Additional subtle animation */}
          <div className="flex justify-center mt-4 space-x-1">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 bg-blue-400 rounded-full animate-ping"
                style={{
                  animationDelay: `${index * 0.3}s`,
                  animationDuration: '1.5s'
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {[...Array(16)].map((_, index) => (
              <div
                key={index}
                className="w-1 bg-gradient-to-t from-blue-300 to-transparent rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '2s'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}