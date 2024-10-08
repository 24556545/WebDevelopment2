import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const FundraiserDetails = () => {
  const { id } = useParams(); // Get the fundraiser ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [fundraiser, setFundraiser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFundraiser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/fundraisers/${id}`);
        setFundraiser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load fundraiser details');
        setLoading(false);
      }
    };

    fetchFundraiser();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;

  // Handle the click event for the "Donate Now" button
  const handleDonateClick = () => {
    navigate(`/donate/${id}`); // Navigate to the donation page with the fundraiser ID
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100">
      {fundraiser ? (
        <div className="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-lg">
          {/* Fundraiser Caption */}
          <h1 className="mb-6 text-4xl font-bold text-indigo-600">{fundraiser.CAPTION}</h1>
          
          {/* Organizer and City */}
          <p className="mb-2 text-gray-700">
            <strong>Organizer:</strong> {fundraiser.ORGANIZER}
          </p>
          <p className="mb-2 text-gray-700">
            <strong>City:</strong> {fundraiser.CITY}
          </p>
          
          {/* Category */}
          <p className="mb-2 text-gray-700">
            <strong>Category:</strong> {fundraiser.category_name}
          </p>
          
          {/* Funding Details */}
          <p className="mb-2 text-gray-700">
            <strong>Target Funding:</strong> ${fundraiser.TARGET_FUNDING}
          </p>
          <p className="mb-2 text-gray-700">
            <strong>Current Funding:</strong> ${fundraiser.CURRENT_FUNDING}
          </p>
          
          {/* Description */}
          <p className="mb-6 text-gray-700">
            <strong>Description:</strong> {fundraiser.DESCRIPTION || 'No description available'}
          </p>
          
          {/* Call to Action Button */}
          <div className="text-center">
            <button
              onClick={handleDonateClick}  // Navigate to the donation page
              className="px-4 py-2 text-white transition duration-300 bg-indigo-600 rounded-full hover:bg-indigo-700"
            >
              Donate Now
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-red-500">Fundraiser not found</div>
      )}
    </div>
  );
};

export default FundraiserDetails;
