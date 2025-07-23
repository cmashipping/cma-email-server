
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { to, subject, html } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: "no-reply@cmasealand.com",
      pass: "Cma@2024cma",
    },
  });

  try {
    await transporter.sendMail({
      from: '"CMA SEA LAND" <no-reply@cmasealand.com>',
      to,
      subject,
      html,
    });
    res.status(200).send("Email sent successfully");
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).send("Failed to send email");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Email server running on port", PORT);
});
