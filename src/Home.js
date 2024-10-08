import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

// navbar.js
import Navbar from './components/Navbar';

const Home = () => {
  const [fundraisers, setFundraisers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch active fundraisers and categories initially
  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fundraisers/active');
        setFundraisers(response.data);
      } catch (error) {
        console.error('Error fetching active fundraisers:', error);
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
  }, []); // Fetch initial data on component mount

  // Dynamically search/filter fundraisers when searchQuery or selectedCategory changes
  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fundraisers/search', {
          params: {
            caption: searchQuery,
            category: selectedCategory,
          },
        });
        setFundraisers(response.data);
      } catch (error) {
        console.error('Error searching fundraisers:', error);
      }
    };

    handleSearch();
  }, [searchQuery, selectedCategory]); // Automatically run when searchQuery or selectedCategory changes

  return (
    <div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-80 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Empowering Change, One Fundraiser at a Time
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Join our platform to support meaningful causes and help communities thrive. Discover and contribute to impactful fundraisers around the world.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between">
          {/* Search Box */}
          <div className="mb-4 md:mb-0">
            <input
              type="text"
              className="w-full md:w-80 p-3 rounded-md border border-gray-300"
              placeholder="Search by project name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Automatically update searchQuery state
            />
          </div>

          {/* Category Filter */}
          <div className="mb-4 md:mb-0">
            <select
              className="w-full md:w-60 p-3 rounded-md border border-gray-300"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)} // Automatically update selectedCategory state
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

      {/* Active Fundraisers Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Active Fundraisers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {fundraisers.map((fundraiser) => (
              <div key={fundraiser.FUNDRAISER_ID} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-indigo-600 mb-2">{fundraiser.CAPTION}</h3>
                <p className="text-gray-600 mb-1"><strong>Organizer:</strong> {fundraiser.ORGANIZER}</p>
                <p className="text-gray-600 mb-1"><strong>Category:</strong> {fundraiser.category_name}</p>
                <p className="text-gray-600 mb-1"><strong>City:</strong> {fundraiser.CITY}</p>
                <p className="text-gray-600 mb-1"><strong>Target:</strong> ${fundraiser.TARGET_FUNDING}</p>
                <p className="text-gray-600 mb-1"><strong>Raised:</strong> ${fundraiser.CURRENT_FUNDING}</p>
                <div className="mt-4">
                  <Link
                    to={`/fundraiser/${fundraiser.FUNDRAISER_ID}`}  // Update to use Link for navigation
                    className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
