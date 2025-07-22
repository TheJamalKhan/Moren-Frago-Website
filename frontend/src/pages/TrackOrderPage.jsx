import React, { useState } from 'react';
import Title from '../component/Title';

function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!orderId) {
      setError('Please enter an Order ID.');
      setTrackingInfo(null);
      return;
    }

    setLoading(true);
    setError('');
    setTrackingInfo(null);

    // --- In a real application, you would make an API call here ---
    // Example: fetch(`/api/track-order?id=${orderId}`)
    // For demonstration, we'll simulate a delay and some dummy data
    setTimeout(() => {
      setLoading(false);
      if (orderId === 'MF12345') {
        setTrackingInfo({
          status: 'Shipped',
          carrier: 'Delhivery',
          eta: '2-3 business days',
          lastUpdate: '2025-07-20 10:30 AM',
          details: 'Package left sorting facility.',
        });
      } else if (orderId === 'MF67890') {
        setTrackingInfo({
          status: 'Delivered',
          carrier: 'BlueDart',
          eta: 'Delivered on 2025-07-18',
          lastUpdate: '2025-07-18 02:15 PM',
          details: 'Package delivered to recipient.',
        });
      }
      else {
        setError('Order not found or tracking information is unavailable.');
      }
    }, 1500); // Simulate API call delay
  };

  return (
    <div className='min-h-screen py-20 bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] text-black'> {/* Consistent styling */}
      <div className='max-w-4xl mx-auto px-4'>
        <Title text1={"TRACK"} text2={"YOUR ORDER"} />
        <p className='text-center text-lg md:text-xl text-gray-700 mb-10'>
          Enter your order ID to get the latest tracking updates.
        </p>

        <div className='bg-white p-6 rounded-lg shadow-xl border border-gray-200 mb-8'> {/* Consistent styling */}
          <form onSubmit={handleTrackOrder} className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <input
              type="text"
              placeholder="Enter your Order ID (e.g., MF12345)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className='flex-grow w-full sm:w-auto h-12 px-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d97706]'
              required
            />
            <button
              type="submit"
              className='px-8 py-3 bg-[#d97706] text-white font-semibold rounded-lg shadow-md hover:bg-[#c26c05] transition-colors'
              disabled={loading}
            >
              {loading ? 'Tracking...' : 'Track Order'}
            </button>
          </form>
          {error && <p className='text-red-600 text-center mt-4'>{error}</p>}
        </div>

        {trackingInfo && (
          <div className='bg-white p-6 rounded-lg shadow-xl border border-gray-200'> {/* Consistent styling */}
            <h3 className='text-xl font-semibold text-gray-900 mb-4'>Order Status for #{orderId}</h3>
            <div className='space-y-2 text-gray-700'>
              <p><strong>Status:</strong> <span className={`font-medium ${trackingInfo.status === 'Delivered' ? 'text-green-600' : 'text-blue-600'}`}>{trackingInfo.status}</span></p>
              <p><strong>Carrier:</strong> {trackingInfo.carrier}</p>
              <p><strong>Estimated Delivery:</strong> {trackingInfo.eta}</p>
              <p><strong>Last Update:</strong> {trackingInfo.lastUpdate}</p>
              <p><strong>Details:</strong> {trackingInfo.details}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackOrderPage;