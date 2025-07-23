import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/send", async (req, res) => {
  const { to, subject, html } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 465,
    secure: true,
    auth: {
      user: "no-reply@cmasealand.com",
      pass: "Cma@2024cma"
    }
  });

  try {
    await transporter.sendMail({
      from: `"CMA SEA LAND" <no-reply@cmasealand.com>`,
      to,
      subject,
      html
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// تشغيل الخادم على المنصة (Render سيحدد البورت تلقائياً)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
});
