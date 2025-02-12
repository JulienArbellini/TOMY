import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // Forcer l'utilisation de Node.js (pas "edge")

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get("pdfFile") as File | null;
    const toEmail = formData.get("toEmail") as string | null;
    const subject = formData.get("subject") as string | null;

    if (!pdfFile) {
      return new Response(JSON.stringify({ error: "Missing pdfFile" }), { status: 400 });
    }

    // Convertir en Buffer pour Nodemailer
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    // Configurer Nodemailer
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // => "smtp-relay.sendinblue.com"
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false, // Pour STARTTLS sur le port 587
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      

    // Envoyer l'email
    const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: toEmail || process.env.RECIPIENT_EMAIL,
      subject: subject || "Votre Billet Personnalisé",
      text: "Voici votre PDF en pièce jointe.",
      attachments: [
        {
          filename: "billet.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    return new Response(JSON.stringify({ success: true, messageId: info.messageId }), { status: 200 });
  } catch (error: any) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
