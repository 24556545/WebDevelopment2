// DonationList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DonationList = ({ fundraiserId }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/donations/fundraiser/${fundraiserId}`);
        setDonations(response.data);
      } catch (err) {
        setError('Failed to load donations');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [fundraiserId]);

  if (loading) return <div className="text-center">Loading donations...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-bold text-indigo-600">Previous Donations</h2>
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
  );
};

export default DonationList;
