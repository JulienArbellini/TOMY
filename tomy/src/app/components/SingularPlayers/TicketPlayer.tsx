import React, { useState, useEffect } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import InteractiveButton from "../GenericPlayer/InteractiveButton"; // Vérifie le bon chemin

interface TicketPlayerProps {
  onClose: () => void;
}

const TicketPlayer: React.FC<TicketPlayerProps> = ({ onClose }) => {
  // ---------- États pour tous les champs ----------
  const [userName, setUserName] = useState("MYSTERIOUS");
  const [sex, setSex] = useState("M");
  const [age, setAge] = useState("18");
  const [date, setDate] = useState("07/12/1995");
  const [time, setTime] = useState("08:00");
  const [seat, setSeat] = useState("14B");
  const [gate, setGate] = useState("A");
  const [depart, setDepart] = useState("PARIS");
  // Nouvel état pour l'email du destinataire
  const [recipientEmail, setRecipientEmail] = useState("");


  const [scale, setScale] = useState(1); // Gestion de l'échelle dynamique

  // Gestion de l'échelle en fonction de la taille de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const baseHeight = 555; // Hauteur de référence
      const newScale = (windowHeight * 0.8) / baseHeight;
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scaledValue = (value: number) => value * scale;

  // ---------- Preview : 670×300 (ratio ~2.233) ----------
  const previewWidth = 670;
  const previewHeight = 300;

  // ---------- PDF : 3350×1500 (scaleX=5, scaleY=5) ----------
  const PDF_WIDTH = 3350;
  const PDF_HEIGHT = 1500;
  const scaleX = PDF_WIDTH / previewWidth;    
  const scaleY = PDF_HEIGHT / previewHeight;

  // Offset vertical pour la baseline
  const baselineOffset = 45;
  // Taille du texte (ex: 60px) dans le PDF
  const pdfFontSize = 60;

  const generateAndSendPDF = async () => {
    try {
      // 1. Charger le PDF template
      const templatePdfUrl = "/BILLET/Billet_Vierge.pdf";
      const templateBytes = await fetch(templatePdfUrl).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(templateBytes);

      // 2. Récupérer la page
      const firstPage = pdfDoc.getPages()[0];
      const pageWidth = firstPage.getWidth();
      const pageHeight = firstPage.getHeight();

      console.log("Dimensions PDF :", pageWidth, pageHeight);

      // Petite fonction pour dessiner le texte
      const drawText = (text: string, leftCSS: number, topCSS: number) => {
        const x = leftCSS * scaleX;
        const y = pageHeight - (topCSS * scaleY) - baselineOffset;
        firstPage.drawText(text, {
          x,
          y,
          size: pdfFontSize,
          color: rgb(0, 0, 0),
        });
      };

      // 3. Dessiner les champs
      drawText(userName, 75, 100);
      drawText(sex, 270, 99);
      drawText(age, 320, 99);
      drawText(date, 170, 137);
      drawText(time, 265, 137);
      drawText(seat, 320, 137);
      drawText(gate, 375, 135);
      drawText(time, 190, 218);
      drawText(time, 190, 218);
      drawText(time, 505, 99);
      drawText(seat, 572, 99);
      drawText(depart, 75, 174);
      drawText("JFK190FW", 75, 137);

      // 4. Sauvegarder le PDF en binaire
      const pdfBytes = await pdfDoc.save();

      // 5. Créer un Blob depuis pdfBytes
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

      // 6. Préparer un FormData pour envoyer en multipart/form-data
      const formData = new FormData();
      formData.append("pdfFile", pdfBlob, "billet.pdf");

      // On utilise la valeur saisie par l'utilisateur
      formData.append("toEmail", recipientEmail || "destinataire@example.com");
      formData.append("subject", "Votre Billet Personnalisé");

      // 7. Envoyer la requête vers l'API Route Next.js
      const response = await fetch("/api/send-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Échec de l'envoi du PDF");
      } else {
        console.log("PDF envoyé par email avec succès !");
      }
    } catch (error) {
      console.error("Erreur lors de la génération / envoi du PDF :", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="relative"
        style={{
          height: `${scaledValue(550)}px`,
          width: `${scaledValue(640)}px`,
        }}
      >
        {/* Cadre décoratif inspiré du DiaporamaPlayer */}
        <img
          src="/vectors/ELEMENTS/Cadres/CadreBois.avif"
          alt="Cadre décoratif"
          style={{
            height: `${scaledValue(538)}px`,
            width: `${scaledValue(638)}px`,
          }}
        />

        {/* Bouton de fermeture */}
        <InteractiveButton
          defaultIcon="/vectors/ELEMENTS/BoutonsPlayer/Exit.avif"
          hoverIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitHover.avif"
          clickedIcon="/vectors/ELEMENTS/BoutonsPlayer/ExitClic.avif"
          onClick={onClose}
          style={{
            position: "absolute",
            top: `${scaledValue(24)}px`,
            left: `${scaledValue(24)}px`,
            height: `${scaledValue(16)}px`,
            width: `${scaledValue(16)}px`,
            zIndex: 50,
          }}
        />

        {/* Contenu principal (Formulaire et Prévisualisation) */}
        <div
          className="absolute  rounded-lg shadow-lg p-6"
          style={{
            top: `${scaledValue(47)}px`,
            left: `${scaledValue(29)}px`,
            height: `${scaledValue(437)}px`,
            width: `${scaledValue(560)}px`,
            overflow: "auto",
            zIndex: 10,
          }}
        >


          {/* Champ Email */}
          <label className="block font-semibold mb-2">Email :</label>
          <input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="border p-2 mb-4"
            placeholder="ex: user@example.com"
          />

          {/* Preview 670×300 */}
          <div
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
              margin: "0 auto",
            }}
          >
            <img
              src="BILLET/Billet_Vierge.jpg"
              alt="Billet"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />

            {/* Champ Name */}
            <input
              type="text"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{
                position: "absolute",
                top: "165px",
                left: "125px",
                width: "170px",
                border: "none",
                background: "transparent",
                fontSize: "14px",
                color: "#000",
              }}
            />

            {/* Depart */}
            <select
              value={depart}
              onChange={(e) => setDepart(e.target.value)}
              style={{
                position: "absolute",
                top: "290px",
                left: "125px",
                width: "90px",
                border: "none",
                background: "transparent",
                fontSize: "14px",
                color: "#000",
              }}
            >
              <option value="PARIS">PARIS</option>
              <option value="NEW YORK">NEW YORK</option>
              <option value="TOKYO">TOKYO</option>
              {/* ... */}
            </select>

            {/* Sex */}
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              style={{
                position: "absolute",
                top: "165px",
                left: "450px",
                width: "40px",
                border: "none",
                background: "transparent",
                fontSize: "14px",
                color: "#000",
              }}
            >
              <option value="M">M</option>
              <option value="F">F</option>
              <option value="NB">NB</option>
            </select>

            {/* Age */}
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{
                position: "absolute",
                top: "165px",
                left: "540px",
                width: "50px",
                border: "none",
                background: "transparent",
                fontSize: "14px",
                color: "#000",
              }}
            >
              {Array.from({ length: 99 }, (_, i) => i + 1).map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>

            {/* Date */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                position: "absolute",
                top: "229px",
                left: "300px",
                width: "80px",
                border: "none",
                background: "transparent",
                fontSize: "14px",
                color: "#000",
              }}
            />

            {/* Time */}
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
                position: "absolute",
                top: "227px",
                left: "450px",
                width: "30px",
                border: "none",
                background: "transparent",
                fontSize: "14px",
                color: "#000",
              }}
            />

            {/* Seat */}
            <select
              value={seat}
              onChange={(e) => setSeat(e.target.value)}
              style={{
                position: "absolute",
                top: "229px",
                left: "540px",
                width: "40px",
                border: "none",
                background: "transparent",
                fontSize: "14px",
                color: "#000",
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="14B">14B</option>
              {/* ... */}
            </select>

            {/* Gate */}
            <select
              value={gate}
              onChange={(e) => setGate(e.target.value)}
              style={{
                position: "absolute",
                top: "229px",
                left: "620px",
                width: "30px",
                border: "none",
                background: "transparent",
                fontSize: "14px",
                color: "#000",
              }}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          {/* Boutons */}
          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={generateAndSendPDF}
              className="bg-green-500 text-white p-2 rounded-md"
            >
              Générer & Envoyer le PDF par Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPlayer;
