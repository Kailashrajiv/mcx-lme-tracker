import React from 'react';
import { FiDollarSign } from 'react-icons/fi';
import { BsCurrencyRupee } from 'react-icons/bs';

const ExchangeRate = () => {
  const rate = 84.4063;
  const date = new Date();

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">RBI Reference Rate</h2>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <FiDollarSign className="text-green-600" />
          <span className="mx-1">1</span>
          <span className="text-gray-400">=</span>
        </div>
        <div className="flex items-center">
          <BsCurrencyRupee className="text-blue-600" />
          <span className="text-xl font-bold">{rate}</span>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        {date.toLocaleDateString('en-IN', { 
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })}
      </div>
    </div>
  );
};

export default ExchangeRate;
