import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';

const AuthModal = ({ isOpen, onClose, darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className={`relative w-full max-w-md p-6 rounded-2xl shadow-xl ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 
          ${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500'}`}
        >
          <IoClose size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome
          </h2>
          <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Sign in or create your account
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <button className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border 
            ${darkMode 
              ? 'border-gray-600 hover:bg-gray-700 text-white' 
              : 'border-gray-300 hover:bg-gray-50 text-gray-700'}`}>
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>
          
          <button className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border 
            ${darkMode 
              ? 'border-gray-600 hover:bg-gray-700 text-white' 
              : 'border-gray-300 hover:bg-gray-50 text-gray-700'}`}>
            <BsApple size={20} />
            <span>Continue with Apple</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className={`absolute inset-0 flex items-center ${darkMode ? 'text-gray-600' : ''}`}>
            <div className={`w-full border-t ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-2 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
              Or continue with
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1.5 
              ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 
                ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300 text-gray-900'}`}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1.5 
              ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              WhatsApp Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className={`w-full pl-12 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 
                  ${darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300 text-gray-900'}`}
                placeholder="91XXXXXXXXXX"
                required
              />
              <span className={`absolute left-3 top-1/2 -translate-y-1/2 
                ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                +
              </span>
            </div>
            <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Include country code without any spaces or special characters
            </p>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1.5 
              ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 
                ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'border-gray-300 text-gray-900'}`}
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2.5 px-4 rounded-lg font-medium text-white 
              ${darkMode 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            Continue
          </button>
        </form>

        {/* Terms */}
        <p className={`mt-4 text-xs text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          By continuing, you agree to our{' '}
          <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
