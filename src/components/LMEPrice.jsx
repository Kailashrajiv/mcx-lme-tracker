import React from 'react';
import { FiDollarSign } from 'react-icons/fi';
import { BsCurrencyRupee } from 'react-icons/bs';

const LMEPrice = ({ price, change, lastUpdate, loading }) => {
  const lmePrice = 2514.00; // Current static LME price
  const rbiRate = 84.4063; // RBI reference rate
  const inrPrice = (lmePrice * 1.0825 * rbiRate + 3000) / 1000;

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">LME Aluminium</h2>
        <div className="flex items-center gap-2">
          <FiDollarSign className="text-xl text-gray-600" />
          <BsCurrencyRupee className="text-xl text-gray-600" />
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        {/* USD Price */}
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <FiDollarSign className="text-xl text-gray-600" />
            <span className="text-3xl font-bold text-blue-600 ml-1">
              {lmePrice.toFixed(2)}
            </span>
            <span className="ml-2 text-sm text-gray-500">per MT</span>
          </div>
          <div className="text-base font-semibold text-red-600">
            -16.00 (-0.63%)
          </div>
        </div>

        {/* INR Price */}
        <div className="flex flex-col pt-2 border-t border-gray-200">
          <div className="flex items-baseline">
            <BsCurrencyRupee className="text-xl text-gray-600" />
            <span className="text-3xl font-bold text-green-600 ml-1">
              {inrPrice.toFixed(2)}
            </span>
            <span className="ml-2 text-sm text-gray-500">per kg</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Includes logistics premium (8.25%) & duty factor (₹3/kg)
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        Last updated: Live
      </div>
    </div>
  );
};

export default LMEPrice;
