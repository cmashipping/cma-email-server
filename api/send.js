const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  next();
});

app.post("/api/send", async (req, res) => {
  const { to, subject, html } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true,
      auth: {
        user: "no-reply@cmasealand.com",
        pass: "Cma@2024cma",
      },
    });

    await transporter.sendMail({
      from: "no-reply@cmasealand.com",
      to,
      subject,
      html,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Email sending failed" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Email server running on port ${PORT}`);
});

