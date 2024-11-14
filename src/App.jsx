import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FiSun, FiMoon } from 'react-icons/fi';
import PriceDisplay from './components/PriceDisplay';
import AlertForm from './components/AlertForm';
import AlertList from './components/AlertList';
import LMESettlement from './components/LMESettlement';
import LMEPrice from './components/LMEPrice';
import ExchangeRate from './components/ExchangeRate';
import AuthModal from './components/AuthModal';
import { fetchMCXPrice, fetchLMESettlements } from './services/mcxService';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [priceData, setPriceData] = useState({
    price: 0,
    change: 0,
    lastUpdate: new Date()
  });
  const [settlements, setSettlements] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const price = await fetchMCXPrice();
        setPriceData({
          price,
          change: 0,
          lastUpdate: new Date()
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchSettlements = async () => {
      try {
        const data = await fetchLMESettlements();
        setSettlements(data);
      } catch (err) {
        console.error('Failed to fetch settlements:', err);
      }
    };

    fetchPrice();
    fetchSettlements();

    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleAddAlert = (alert) => {
    setAlerts(prevAlerts => [...prevAlerts, { ...alert, id: Date.now() }]);
    toast.success('Alert added successfully!');
  };

  const handleRemoveAlert = (alertId) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
    toast.success('Alert removed successfully!');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'} transition-colors duration-200`}>
      <div className="p-4">
        <Toaster position="top-right" />
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Aluminium MCX/LME Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${
                  darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  darkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Login / Sign Up
              </button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              LME Cash Settlement History
            </h2>
            <LMESettlement settlements={settlements} darkMode={darkMode} />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <PriceDisplay
                price={priceData.price}
                change={priceData.change}
                lastUpdate={priceData.lastUpdate}
                loading={loading}
                error={error}
                darkMode={darkMode}
              />
              <LMEPrice darkMode={darkMode} />
              <ExchangeRate darkMode={darkMode} />
            </div>

            <div className={`${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-lg shadow-lg h-full`}>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <IoNotificationsOutline className={`text-2xl ${
                    darkMode ? 'text-blue-400' : 'text-blue-500'
                  }`} />
                  <h2 className={`text-2xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>Price Alert</h2>
                </div>
                <AlertForm onAddAlert={handleAddAlert} darkMode={darkMode} />
                <AlertList
                  alerts={alerts}
                  onRemoveAlert={handleRemoveAlert}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        darkMode={darkMode}
      />
    </div>
  );
}
