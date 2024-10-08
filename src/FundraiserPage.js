import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import DonationList from './components/DonationList'; // Import the DonationList component

const FundraiserPage = () => {
  const [fundraisers, setFundraisers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true); // Loading state for fetch operation
  const [error, setError] = useState(null); // Error handling
  const [selectedFundraiserId, setSelectedFundraiserId] = useState(null); // State to hold the selected fundraiser ID

  // Fetch all fundraisers and categories initially
  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fundraisers/all');
        setFundraisers(response.data);
      } catch (error) {
        console.error('Error fetching fundraisers:', error);
        setError(error); // Set error state
      } finally {
        setLoading(false); // Loading is done
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fundraisers/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchFundraisers();
    fetchCategories();
  }, []);

  // Filter fundraisers based on search query and selected category
  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fundraisers/search', {
          params: {
            caption: searchQuery,
            category: selectedCategory, // Pass the category ID correctly
          },
        });
        setFundraisers(response.data);
      } catch (error) {
        console.error('Error searching fundraisers:', error);
        setError(error); // Set error state
      }
    };

    handleSearch();
  }, [searchQuery, selectedCategory]);

  // Loading and error handling
  if (loading) {
    return (
      <div className="py-10 text-center">
        <div className="w-10 h-10 mx-auto border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="py-10 text-center text-red-600">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="flex items-center justify-center text-white bg-gradient-to-r from-blue-600 to-indigo-600 h-72">
        <div className="px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Active Fundraisers</h1>
          <p className="max-w-2xl mx-auto text-lg">
            Join us in supporting meaningful causes and helping communities thrive.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-200">
        <div className="flex flex-col justify-between px-4 mx-auto max-w-7xl md:flex-row md:items-center">
          <div className="mb-4 md:mb-0">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md md:w-80"
              placeholder="Search by project name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="mb-4 md:mb-0">
            <select
              className="w-full p-3 border border-gray-300 rounded-md md:w-60"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)} // Update selected category
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.CATEGORY_ID} value={category.CATEGORY_ID}>
                  {category.NAME}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Fundraisers Section */}
      <section className="py-12 bg-gray-100">
        <div className="px-4 mx-auto max-w-7xl">
          <h2 className="mb-8 text-3xl font-bold text-center">Active Fundraisers</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {fundraisers.map((fundraiser) => (
              <div key={fundraiser.FUNDRAISER_ID} className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
                <h3 className="mb-2 text-xl font-semibold text-indigo-600">{fundraiser.CAPTION}</h3>
                <p className="mb-1 text-gray-600"><strong>Organizer:</strong> {fundraiser.ORGANIZER}</p>
                <p className="mb-1 text-gray-600"><strong>Category:</strong> {fundraiser.category_name}</p>
                <p className="mb-1 text-gray-600"><strong>City:</strong> {fundraiser.CITY}</p>
                <p className="mb-1 text-gray-600"><strong>Target:</strong> ${fundraiser.TARGET_FUNDING}</p>
                <p className="mb-1 text-gray-600"><strong>Raised:</strong> ${fundraiser.CURRENT_FUNDING}</p>
                <div className="mt-4">
                  <Link
                    to={`/fundraiser/${fundraiser.FUNDRAISER_ID}`}
                    className="px-4 py-2 text-white transition-colors duration-300 bg-indigo-600 rounded-full hover:bg-indigo-700"
                    onClick={() => setSelectedFundraiserId(fundraiser.FUNDRAISER_ID)} // Set selected fundraiser ID
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Donations Section */}
          {selectedFundraiserId && (
            <DonationList fundraiserId={selectedFundraiserId} />
          )}
        </div>
      </section>
    </div>
  );
};

export default FundraiserPage;
