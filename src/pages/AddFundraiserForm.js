import React, { useState } from 'react';
import axios from 'axios';

const AddFundraiserForm = () => {
  const [formData, setFormData] = useState({
    caption: '',
    organizer: '',
    city: '',
    targetFunding: '',
    currentFunding: '',
    categoryId: '',
    active: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/fundraisers/add', formData);
      console.log('Fundraiser added:', response.data);
      alert('Fundraiser added successfully!');
    } catch (error) {
      console.error('Error adding fundraiser:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Add New Fundraiser</h2>
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
            value={formData.active}
            onChange={handleInputChange}
            className="w-full p-3 border rounded"
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded">
          Add Fundraiser
        </button>
      </form>
    </div>
  );
};

export default AddFundraiserForm;
