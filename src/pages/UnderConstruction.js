import React from 'react';
import { Link } from 'react-router-dom';

const UnderConstruction = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-lg text-center">
        <img
          src="https://i.imgur.com/5R1FecM.png" // Replace this with your under construction image URL
          alt="Under Construction"
          className="w-64 mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          This Feature is Under Construction
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          We're working hard to bring this feature to life! Stay tuned for exciting updates.
        </p>
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-full text-lg transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default UnderConstruction;
