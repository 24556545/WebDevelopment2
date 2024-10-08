import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AddFundraiserForm from './AddFundraiserForm';
import EditFundraiserForm from './EditFundraiserForm';
import { AuthContext } from '../AuthContext'; // Import AuthContext

const Dashboard = () => {
  const [fundraisers, setFundraisers] = useState([]);
  const [currentContent, setCurrentContent] = useState('home'); // Track what to display
  const [editFundraiserId, setEditFundraiserId] = useState(null); // To store the fundraiser being edited
  const { logout } = useContext(AuthContext); // Use the logout function from AuthContext

  // Fetch all fundraisers when the component mounts
  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fundraisers/all');
        setFundraisers(response.data);
      } catch (error) {
        console.error('Error fetching fundraisers:', error);
      }
    };

    fetchFundraisers();
  }, []);

  // Function to handle dynamic content rendering
  const renderContent = () => {
    if (currentContent === 'add') {
      return <AddFundraiserForm />;
    }
    if (currentContent === 'edit') {
      return <EditFundraiserForm id={editFundraiserId} />; // Pass the ID to edit form
    }
    // Default view: Show the list of fundraisers
    return (
      <div>
        <h1 className="mb-8 text-4xl font-bold text-indigo-600">Available Fundraisers</h1>
        <ul>
          {fundraisers.map((fundraiser) => (
            <li key={fundraiser.FUNDRAISER_ID} className="mb-4">
              <div className="flex justify-between">
                <span>{fundraiser.CAPTION} - {fundraiser.ORGANIZER}</span>
                <div>
                  <button
                    className="px-3 py-1 mr-2 text-white bg-blue-500 rounded"
                    onClick={() => {
                      setEditFundraiserId(fundraiser.FUNDRAISER_ID);
                      setCurrentContent('edit');
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 h-screen p-8 text-white bg-indigo-600">
        <h2 className="mb-6 text-2xl font-bold">Dashboard</h2>
        <ul className="space-y-4">
          {/* Home Button */}
          <li>
            <button
              onClick={() => window.location.href = '/dashboard'} // Reload to dashboard
              className="block px-4 py-2 transition duration-200 rounded hover:bg-indigo-500"
            >
              Home
            </button>
          </li>
          {/* Add Fundraiser Button */}
          <li>
            <button
              onClick={() => setCurrentContent('add')}
              className="block px-4 py-2 transition duration-200 rounded hover:bg-indigo-500"
            >
              Add Fundraiser
            </button>
          </li>
          {/* Logout Button */}
          <li>
            <button
              onClick={() => {
                logout(); // Call the logout function from AuthContext
                window.location.href = '/login'; // Redirect to login page after logout
              }}
              className="block px-4 py-2 transition duration-200 rounded hover:bg-indigo-500"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
