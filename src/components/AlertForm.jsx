import React, { useState } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import { FiDollarSign } from 'react-icons/fi';
import { BsCurrencyRupee } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const AlertForm = ({ onAddAlert, darkMode }) => {
  const [alertType, setAlertType] = useState('price');
  const [alertCategory, setAlertCategory] = useState('mcx');
  const [price, setPrice] = useState('');
  const [percentage, setPercentage] = useState('');
  const [notificationType, setNotificationType] = useState('webapp');
  const [customMessage, setCustomMessage] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = alertType === 'price' ? price : percentage;
    
    onAddAlert({
      type: alertType,
      value: parseFloat(value),
      alertCategory,
      notificationType,
      customMessage,
      contact: notificationType === 'whatsapp' ? contact : notificationType === 'email' ? contact : null
    });

    // Reset form
    setPrice('');
    setPercentage('');
    setCustomMessage('');
    setContact('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Alert Category and Type Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>Category</label>
          <div className={`inline-flex rounded-lg p-0.5 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          } w-full`}>
            <button
              type="button"
              className={`flex-1 flex items-center justify-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                alertCategory === 'mcx'
                  ? darkMode 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-white text-gray-800 shadow'
                  : darkMode
                    ? 'text-gray-300'
                    : 'text-gray-600'
              }`}
              onClick={() => setAlertCategory('mcx')}
            >
              <BsCurrencyRupee />
              MCX
            </button>
            <button
              type="button"
              className={`flex-1 flex items-center justify-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                alertCategory === 'lme'
                  ? darkMode 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-white text-gray-800 shadow'
                  : darkMode
                    ? 'text-gray-300'
                    : 'text-gray-600'
              }`}
              onClick={() => setAlertCategory('lme')}
            >
              <FiDollarSign />
              LME
            </button>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>Alert Type</label>
          <div className={`inline-flex rounded-lg p-0.5 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          } w-full`}>
            <button
              type="button"
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                alertType === 'price'
                  ? darkMode 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-white text-gray-800 shadow'
                  : darkMode
                    ? 'text-gray-300'
                    : 'text-gray-600'
              }`}
              onClick={() => setAlertType('price')}
            >
              Price
            </button>
            <button
              type="button"
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                alertType === 'percentage'
                  ? darkMode 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-white text-gray-800 shadow'
                  : darkMode
                    ? 'text-gray-300'
                    : 'text-gray-600'
              }`}
              onClick={() => setAlertType('percentage')}
            >
              Percentage
            </button>
          </div>
        </div>
      </div>

      {/* Value Input */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {alertType === 'price' ? 'Target Price' : 'Percentage Change'}
        </label>
        <input
          type="number"
          value={alertType === 'price' ? price : percentage}
          onChange={(e) => alertType === 'price' ? setPrice(e.target.value) : setPercentage(e.target.value)}
          className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'border-gray-300 text-gray-900'
          }`}
          placeholder={alertType === 'price' ? 'Enter target price' : 'Enter percentage'}
          step="any"
          required
        />
      </div>

      {/* Notification Type */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Notification Method
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-2 text-sm ${
              notificationType === 'webapp'
                ? darkMode
                  ? 'border-blue-500 bg-blue-900/50 text-blue-400'
                  : 'border-blue-500 bg-blue-50 text-blue-600'
                : darkMode
                  ? 'border-gray-600 hover:bg-gray-700'
                  : 'border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setNotificationType('webapp')}
          >
            <IoMdNotifications size={16} />
            Web App
          </button>
          <button
            type="button"
            className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-2 text-sm ${
              notificationType === 'whatsapp'
                ? darkMode
                  ? 'border-green-500 bg-green-900/50 text-green-400'
                  : 'border-green-500 bg-green-50 text-green-600'
                : darkMode
                  ? 'border-gray-600 hover:bg-gray-700'
                  : 'border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setNotificationType('whatsapp')}
          >
            <FaWhatsapp size={16} />
            WhatsApp
          </button>
          <button
            type="button"
            className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-2 text-sm ${
              notificationType === 'email'
                ? darkMode
                  ? 'border-red-500 bg-red-900/50 text-red-400'
                  : 'border-red-500 bg-red-50 text-red-600'
                : darkMode
                  ? 'border-gray-600 hover:bg-gray-700'
                  : 'border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setNotificationType('email')}
          >
            <MdEmail size={16} />
            Email
          </button>
        </div>
      </div>

      {/* Contact Input */}
      {(notificationType === 'whatsapp' || notificationType === 'email') && (
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {notificationType === 'whatsapp' ? 'WhatsApp Number' : 'Email Address'}
          </label>
          <input
            type={notificationType === 'email' ? 'email' : 'tel'}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'border-gray-300 text-gray-900'
            }`}
            placeholder={notificationType === 'whatsapp' ? 'Enter WhatsApp number' : 'Enter email address'}
            required
          />
        </div>
      )}

      {/* Custom Message */}
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Custom Message (Optional)
        </label>
        <textarea
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'border-gray-300 text-gray-900'
          }`}
          placeholder="Add a custom message for your alert"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 px-4 rounded font-medium flex items-center justify-center gap-2 ${
          darkMode
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        <IoMdNotifications />
        Set Alert
      </button>
    </form>
  );
};

export default AlertForm;
