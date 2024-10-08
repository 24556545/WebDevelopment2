import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DonationPage = () => {
  const { id } = useParams(); // Get the fundraiser ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [fundraiser, setFundraiser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [donationDetails, setDonationDetails] = useState({
    name: '',
    email: '',
    amount: '',
  });
  const [donations, setDonations] = useState([]); // State for storing donations

  useEffect(() => {
    const fetchFundraiser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/fundraisers/${id}`);
        setFundraiser(response.data);
      } catch (err) {
        setError('Failed to load fundraiser details');
      } finally {
        setLoading(false);
      }
    };

    const fetchDonations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/donations/fundraiser/${id}`); // Fetch donations for the fundraiser
        setDonations(response.data);
      } catch (err) {
        console.error('Error fetching donations:', err);
      }
    };

    fetchFundraiser();
    fetchDonations(); // Fetch donations when the page loads
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationDetails({ ...donationDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const donationData = {
        ...donationDetails,
        fund_raiser_project: fundraiser.CAPTION, // Automatically set the fundraiser project
        fundraiser_id: id, // Add the fundraiser ID to the donation data
      };

      await axios.post('http://localhost:5000/api/donations', donationData);
      alert('Donation successful! Thank you for your support.');
      setDonationDetails({ name: '', email: '', amount: '' }); // Reset form fields
      
      // Fetch donations again after adding a new donation
      const response = await axios.get(`http://localhost:5000/api/donations/fundraiser/${id}`);
      setDonations(response.data);
    } catch (error) {
      console.error('Error making donation:', error);
      setError('Failed to submit donation. Please try again.');
    }
  };

  if (loading) return <div className="py-10 text-center">Loading...</div>;
  if (error) return <div className="py-10 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100">
      {fundraiser ? (
        <div className="max-w-md p-8 mx-auto bg-white rounded-lg shadow-lg">
          <h1 className="mb-6 text-2xl font-bold text-indigo-600">Donate to {fundraiser.CAPTION}</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={donationDetails.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={donationDetails.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Amount ($)</label>
              <input
                type="number"
                name="amount"
                value={donationDetails.amount}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-white transition duration-300 bg-indigo-600 rounded-full hover:bg-indigo-700"
            >
              Donate Now
            </button>
          </form>

          {/* Donations List Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-indigo-600">Previous Donations</h2>
            {donations.length > 0 ? (
              <table className="min-w-full mt-4 border border-gray-300 table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border border-gray-300">Name</th>
                    <th className="px-4 py-2 border border-gray-300">Email</th>
                    <th className="px-4 py-2 border border-gray-300">Amount ($)</th>
                    <th className="px-4 py-2 border border-gray-300">Fundraiser Project</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation.id} className="border-b border-gray-300">
                      <td className="px-4 py-2 border border-gray-300">{donation.name}</td>
                      <td className="px-4 py-2 border border-gray-300">{donation.email}</td>
                      <td className="px-4 py-2 border border-gray-300">{donation.amount}</td>
                      <td className="px-4 py-2 border border-gray-300">{donation.fund_raiser_project}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="mt-4 text-gray-700">No donations yet for this fundraiser.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-red-500">Fundraiser not found</div>
      )}
    </div>
  );
};

export default DonationPage;
