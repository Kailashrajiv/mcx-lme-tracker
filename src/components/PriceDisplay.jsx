import React from 'react';
import { format } from 'date-fns';
import { BsDot } from 'react-icons/bs';

const PriceDisplay = ({ price, change, lastUpdate, loading, error, darkMode }) => {
  const isPositive = change >= 0;
  
  if (loading) {
    return (
      <div className={`animate-pulse p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`h-8 rounded w-1/2 mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        <div className={`h-12 rounded w-3/4 mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        <div className={`h-6 rounded w-1/4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">
          Failed to load price data. Please try again later.
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          MCX Aluminium
        </h2>
        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Future {format(new Date(), 'MMM yyyy')}
        </span>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline">
          <span className={`text-4xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            ₹{price.toFixed(2)}
          </span>
          <span className={`ml-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            per kg
          </span>
        </div>
        
        <div className={`text-lg font-semibold ${
          isPositive 
            ? darkMode ? 'text-green-400' : 'text-green-600'
            : darkMode ? 'text-red-400' : 'text-red-600'
        }`}>
          {isPositive ? '+' : ''}{change.toFixed(2)} ({((change / (price - change)) * 100).toFixed(2)}%)
        </div>
      </div>
      
      <div className={`flex items-center mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <span>Last updated: {format(lastUpdate, 'HH:mm:ss')}</span>
        <BsDot className="mx-2" />
        <span className={`px-2 py-1 rounded-full text-xs font-medium
          ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
          Live
        </span>
      </div>
    </div>
  );
};

export default PriceDisplay;
