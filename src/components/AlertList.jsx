import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { FiDollarSign, FiMessageSquare } from 'react-icons/fi';
import { BsCurrencyRupee } from 'react-icons/bs';

const AlertList = ({ alerts, onRemoveAlert, darkMode }) => {
  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className={`mt-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
      <h3 className="text-lg font-semibold mb-4">Active Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {alert.alertCategory === 'mcx' ? (
                    <BsCurrencyRupee className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                  ) : (
                    <FiDollarSign className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                  )}
                  <span className="font-medium">
                    {alert.alertCategory === 'mcx' 
                      ? (alert.type === 'price' 
                        ? `MCX Price reaches ₹${alert.value}`
                        : `MCX ${alert.value}% change`)
                      : 'LME Settlement Change Alert'}
                  </span>
                </div>
                <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  via {alert.notificationType}
                </div>
                {alert.customMessage && (
                  <div className={`flex items-start gap-2 mt-2 text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <FiMessageSquare className="mt-1" />
                    <p>{alert.customMessage}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => onRemoveAlert(alert.id)}
                className={`text-gray-400 hover:text-red-500 transition-colors`}
              >
                <IoMdClose size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertList;
