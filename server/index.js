import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendWhatsAppMessage } from './services/whatsapp.js';
import { sendEmail } from './services/email.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/api/notify', async (req, res) => {
  try {
    const { notificationType, message, phone, email } = req.body;

    if (notificationType === 'whatsapp' || notificationType === 'both') {
      if (!phone) {
        return res.status(400).json({ error: 'Phone number is required for WhatsApp notifications' });
      }
      await sendWhatsAppMessage(phone, message);
    }

    if (notificationType === 'email' || notificationType === 'both') {
      if (!email) {
        return res.status(400).json({ error: 'Email address is required for email notifications' });
      }
      await sendEmail(email, 'Price Alert', message);
    }

    res.json({ success: true, message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Notification error:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
