import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const sendNotification = async (notificationType, message, contact) => {
  try {
    const response = await axios.post(`${API_URL}/notify`, {
      notificationType,
      message,
      phone: contact.phone,
      email: contact.email
    });
    return response.data;
  } catch (error) {
    console.error('Notification error:', error);
    throw error;
  }
};
