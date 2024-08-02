import { Router } from 'express';
import nodemailer from 'nodemailer';
import { getAllStockData } from '../BackEnd/Connection.js'; // Correct import
import { saveDataToDB } from './App.js';
import { db } from '../BackEnd/Connection.js';

const router = Router();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'arpithathogarapalli@gmail.com',
    pass: 'ggxcymcvlekyzkzd'
  }
});

router.post('/send-email', async (req, res) => {
  const { to, subject, text, qrCodeBase64 } = req.body;

  console.log('Received email request:', { to, subject, text });

  try {
    const qrCodeBuffer = Buffer.from(qrCodeBase64, 'base64');

    await transporter.sendMail({
      from: 'arpithathogarapalli@gmail.com',
      to: [to],
      subject,
      text,
      attachments: [
        {
          filename: 'qrcode.png',
          content: qrCodeBuffer,
          cid: 'qrcode@nodemailer'
        }
      ],
      html: `<p>${text}</p><img src="cid:qrcode@nodemailer"/>`
    });

    console.log('Email sent successfully');
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

router.post('/send-emailform', async (req, res) => {
  const { to, subject, text } = req.body;
  const personalEmail = 'tdarpitha2004@gmail.com';

  try {
    await transporter.sendMail({
      from: 'arpithathogarapalli@gmail.com',
      to: [to, personalEmail],
      subject,
      text
    });
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

router.post('/save', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      throw new Error('Please fill in all fields.');
    }

    const userData = { name, email, message };
    const docRef = await saveDataToDB(db, userData);
    console.log('Document written with ID:', docRef.id);
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving document:', error);
    res.status(500).json({ message: 'Error saving document' });
  }
});

router.get('/api/top-stocks', async (req, res) => {
  console.log('GET /api/top-stocks called');
  try {
    const stockData = await getAllStockData();
    res.json(stockData);
  } catch (error) {
    console.error('Error fetching top stocks:', error);
    res.status(500).send('Error fetching top stocks');
  }
});

router.get('/api/stock-data', async (req, res) => {
  try {
    const { symbol } = req.query;
    const stockData = await getStockData(symbol);
    res.json(stockData);
  } catch (error) {
    res.status(500).send('Error fetching stock data');
  }
});

export default router;
