const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/send', async (req, res) => {
  const { to, subject, html } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 465,
    secure: true,
    auth: {
      user: 'no-reply@cmasealand.com',
      pass: 'Cma@2024cma'
    }
  });

  try {
    await transporter.sendMail({
      from: '"CMA SEA LAND" <no-reply@cmasealand.com>',
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://www.cmasealand.com/logo.png" alt="CMA SEA LAND Logo" style="max-height: 80px;" />
            <h2 style="color: #004d73;">CMA SEA LAND</h2>
          </div>

          <p style="font-size: 16px;">Dear Client,</p>
          <p style="font-size: 16px;">We would like to inform you that the status of your registration has been updated as follows:</p>

          <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; background: #e0f7fa; font-weight: bold;">Status</td>
              <td style="padding: 8px;">✅ <strong>${req.body.status}</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px; background: #e0f7fa; font-weight: bold;">Comment</td>
              <td style="padding: 8px;">${req.body.comment || 'No comment'}</td>
            </tr>
          </table>

          <p style="font-size: 16px;">If you have any questions or need support, feel free to reply to this email.</p>
          <p style="font-size: 16px;">Best regards,<br/><strong>CMA SEA LAND Admin Team</strong></p>

          <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #777;">
            © 2025 CMA SEA LAND. All rights reserved.
          </div>
        </div>
      `
    });

    res.status(200).send('Email sent');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to send email');
  }
});

app.listen(10000, () => {
  console.log('Email server running on port 10000');
});