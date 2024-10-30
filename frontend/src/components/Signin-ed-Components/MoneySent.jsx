import React from 'react';
import { useNavigate } from 'react-router-dom';

const MoneySent = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-2xl font-semibold mb-4">Money Sent!</h2>
        <p className="text-gray-600 mb-6">Your transaction was successful.</p>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Go Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MoneySent;
