require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" })); 
// ou app.use(express.urlencoded({ limit: "10mb", extended: true })) 
// si vous envoyez un form-data. Ajustez la limite selon la taille possible du PDF.

const PORT = process.env.PORT || 3001;

/*
 .env (à créer dans backend/.env) doit contenir vos identifiants SMTP, par ex:
 SMTP_HOST=smtp-relay.brevo.com  # ou "smtp.sendinblue.com", etc.
 SMTP_PORT=587
 SMTP_USER=xxxxxxx
 SMTP_PASS=xxxxxxx
 SENDER_EMAIL=xxxx@domain.com
 RECIPIENT_EMAIL=xxxx@recipient.com
*/

app.post("/send-pdf", async (req, res) => {
  try {
    // 1. Récupérer le PDF sous forme de base64 ou binaire
    const { pdfBase64, toEmail, subject } = req.body;

    if (!pdfBase64) {
      return res.status(400).json({ error: "pdfBase64 is required" });
    }

    // 2. Configurer Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10) || 587,
      secure: false, // ou true si TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 3. Construire le mail
    // On convertit pdfBase64 en buffer
    const pdfBuffer = Buffer.from(pdfBase64, "base64");

    const mailOptions = {
      from: process.env.SENDER_EMAIL, 
      to: toEmail || process.env.RECIPIENT_EMAIL, 
      subject: subject || "Mon PDF en pièce jointe",
      text: "Voici votre PDF en pièce jointe.",
      attachments: [
        {
          filename: "billet.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    // 4. Envoyer l'email
    let info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé !", info.messageId);
    return res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend serveur démarré sur le port ${PORT}`);
});
