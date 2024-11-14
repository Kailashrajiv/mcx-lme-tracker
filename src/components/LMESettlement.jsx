import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const LMESettlement = ({ settlements }) => {
  if (!settlements || settlements.length === 0) {
    return (
      <div className="flex flex-row gap-4 mb-6 overflow-x-auto pb-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-lg min-w-[200px] animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="h-3 bg-gray-200 rounded w-20 mt-2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-4 mb-6 overflow-x-auto pb-2">
      {settlements.map((settlement, index) => {
        const prevPrice = index < settlements.length - 1 ? settlements[index + 1].price : settlement.price;
        const priceChange = settlement.price - prevPrice;
        const isIncrease = priceChange >= 0;

        return (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg min-w-[200px]">
            <div className="text-sm text-gray-500 mb-1">
              {settlement.date}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-800">
                ${settlement.price.toFixed(2)}
              </div>
              {index < settlements.length - 1 && (
                <div className={`flex items-center ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
                  {isIncrease ? <FiArrowUp /> : <FiArrowDown />}
                  <span className="ml-1 text-sm">
                    ${Math.abs(priceChange).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              LME Cash Settlement
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LMESettlement;
