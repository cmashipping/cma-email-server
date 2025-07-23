const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  // ✅ تفعيل CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // ✅ Preflight OK
  }

  if (req.method !== "POST") {
    return res.status(405).send("Only POST requests allowed");
  }

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
    console.error("Email error:", err);
    res.status(500).send("Failed to send email");
  }
};
