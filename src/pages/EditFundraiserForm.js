import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditFundraiserForm = ({ id }) => {
  const [formData, setFormData] = useState({
    caption: '',
    organizer: '',
    city: '',
    targetFunding: '',
    currentFunding: '',
    categoryId: '',
    active: true,
  });

  const [loading, setLoading] = useState(true); // Loading state to indicate data fetching

  // Fetch the existing fundraiser details by ID when the component mounts
  useEffect(() => {
    const fetchFundraiser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/fundraisers/${id}`);
        // Set form data with existing fundraiser values
        setFormData({
          caption: response.data.CAPTION || '',
          organizer: response.data.ORGANIZER || '',
          city: response.data.CITY || '',
          targetFunding: response.data.TARGET_FUNDING || '',
          currentFunding: response.data.CURRENT_FUNDING || '',
          categoryId: response.data.CATEGORY_ID || '',
          active: response.data.ACTIVE === 1, // Convert to boolean
        });
      } catch (error) {
        console.error('Error fetching fundraiser details:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchFundraiser();
  }, [id]); // Only re-run if the id changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If active, convert to boolean
    if (name === 'active') {
      setFormData({ ...formData, [name]: value === 'true' }); // Convert string to boolean
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert active to integer (0 for false, 1 for true) before sending
      const updatedData = {
        ...formData,
        active: formData.active ? 1 : 0 // Convert boolean to integer
      };

      console.log('Updated Data:', updatedData); // Log updated data for debugging

      // Send PUT request to update the fundraiser
      const response = await axios.put(`http://localhost:5000/api/fundraisers/edit/${id}`, updatedData);
      alert('Fundraiser updated successfully!');
      console.log('Response:', response.data); // Log the response
    } catch (error) {
      console.error('Error updating fundraiser:', error.response ? error.response.data : error);
    }
  };

  // Show loading state if data is being fetched
  if (loading) {
    return <div>Loading...</div>; // Optional loading indicator
  }

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Edit Fundraiser</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Caption</label>
          <input
            type="text"
            name="caption"
            value={formData.caption}
            onChange={handleInputChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Organizer</label>
          <input
            type="text"
            name="organizer"
            value={formData.organizer}
            onChange={handleInputChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Target Funding</label>
          <input
            type="number"
            name="targetFunding"
            value={formData.targetFunding}
            onChange={handleInputChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Current Funding</label>
          <input
            type="number"
            name="currentFunding"
            value={formData.currentFunding}
            onChange={handleInputChange}
            className="w-full p-3 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Category ID</label>
          <input
            type="number"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Active</label>
          <select
            name="active"
            value={formData.active ? 'true' : 'false'} // Convert boolean to string for the select input
            onChange={handleInputChange}
            className="w-full p-3 border rounded"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded">
          Update Fundraiser
        </button>
      </form>
    </div>
  );
};

export default EditFundraiserForm;
