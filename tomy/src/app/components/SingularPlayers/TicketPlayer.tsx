import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";

interface TicketPlayerProps {
  onClose: () => void;
}

const TicketPlayer: React.FC<TicketPlayerProps> = ({ onClose }) => {
  // ---------- États pour tous les champs ----------
  const [userName, setUserName] = useState("MYSTERIOUS");
  const [sex, setSex] = useState("M");    // H ou F
  const [age, setAge] = useState("18");   // 1 à 99
  const [date, setDate] = useState("07/12/1995");   // format yyyy-mm-dd
  const [time, setTime] = useState("08:00");   // format HH:mm
  const [seat, setSeat] = useState("14B");   // texte libre (ex: 14B)
  const [gate, setGate] = useState("A");  // A, B ou C
  const [depart, setDepart] = useState("PARIS");  // A, B ou C

  // ---------- Preview : 670×300 (ratio 2,233) ----------
  const previewWidth = 670;
  const previewHeight = 300;

  //get the curent hour HH::mm

  // ---------- PDF : 3350×1500 ----------
  // => scaleX = scaleY = 5
  const PDF_WIDTH = 3350;
  const PDF_HEIGHT = 1500;
  const scaleX = PDF_WIDTH / previewWidth;    // 5
  const scaleY = PDF_HEIGHT / previewHeight;  // 5

  // Offset vertical pour la baseline
  const baselineOffset = 45;

  // Taille du texte (ex: 60px) dans le PDF
  // Vous pouvez ajuster au besoin
  const pdfFontSize = 60;

  const generatePDF = async () => {
    try {
      // 1. Charger le PDF template (3350×1500)
      const templatePdfUrl = "/BILLET/Billet_Vierge.pdf";
      const templateBytes = await fetch(templatePdfUrl).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(templateBytes);

      // 2. Récupérer la première page (dimensions réelles)
      const firstPage = pdfDoc.getPages()[0];
      const pageWidth = firstPage.getWidth();   // 3350
      const pageHeight = firstPage.getHeight(); // 1500
      console.log("Dimensions PDF :", pageWidth, pageHeight);

      // Petite fonction utilitaire pour dessiner du texte
      // en tenant compte du ratio et de l'offset
      const drawText = (text: string, leftCSS: number, topCSS: number) => {
        const x = leftCSS * scaleX;
        const y = pageHeight - (topCSS * scaleY) - baselineOffset;
        firstPage.drawText(text, {
          x,
          y,
          size: pdfFontSize,
          color: rgb(0, 0, 0), // En rouge, par exemple
        });
      };

      // 3. Dessiner chaque champ aux mêmes coords que la preview
      //    (Adaptez `leftCSS` / `topCSS` si besoin)


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
      

      // 4. Sauvegarder le PDF et proposer téléchargement
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "billet.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF :", error);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] text-xs">
        <h2 className="text-xs font-bold mb-4">Billet d'Avion Personnalisé</h2>

        {/* 
          Preview : 670×300
          - Image de fond
          - Champs en absolute
        */}
        <div
          style={{
            width: "670px",
            height: "300px",
            position: "relative",
            margin: "0 auto",
          }}
        >
          <img
            src="BILLET/Billet_Vierge.jpg"
            alt="Billet"
            style={{
              display: "block",
              width: "670px",
              height: "300px",
              objectFit: "cover",
            }}
          />

          {/*
            Positionnez les champs sur l'image
            Exemple : name => top=130px, left=110px
          */}
          <input
            type="text"
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              position: "absolute",
              top: "95px",
              left: "75px",
              width: "170px",
              border: "none",
              background: "transparent",
              fontSize: "14px",
              color: "#000",
            }}
          />

          {/* Sex (H / F) */}
          <select
            value={depart}
            onChange={(e) => setDepart(e.target.value)}
            style={{
              position: "absolute",
              top: "168px",
              left: "70px",
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
            <option value="MAUBEUGE">MAUBEUGE</option>
            <option value="SYDNEY">SYDNEY</option>
            <option value="ROMA">ROMA</option>
            <option value="LONDON">LONDON</option>
            <option value="MAROCO">MAROCO</option>
            <option value="GOTHAM CITY">GOTHAM CITY</option>
            <option value="MOSCOU">MOSCOU</option>
            <option value="BERLIN">BERLIN</option>
            <option value="MADRID">MADRID</option>
            <option value="DUBAI">DUBAI</option>
            <option value="MEXICO">MEXICO</option>
            <option value="MONTREAL">MONTREAL</option>
            <option value="BEIJING">BEIJING</option>
            <option value="SEOUL">SEOUL</option>
            <option value="HANOI">HANOI</option>
            <option value="BANGKOK">BANGKOK</option>
            <option value="MUMBAI">MUMBAI</option>
            <option value="HOBBIT TOWN">HOBBIT TOWN</option>
            <option value="HOGSMEADE">HOGSMEADE</option>
            <option value="SPRINGFIELD">SPRINGFIELD</option>
            <option value="SCRANTON">SCRANTON</option>

          </select>

          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            style={{
              position: "absolute",
              top: "94px",
              left: "260px",
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
          

          {/* Age (1 à 99) */}
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{
              position: "absolute",
              top: "94px",
              left: "310px",
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
              top: "132px",
              left: "170px",
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
              top: "132px",
              left: "280px",
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
              top: "132px",
              left: "315px",
              width: "40px",
              border: "none",
              background: "transparent",
              fontSize: "14px",
              color: "#000",
            }}
            >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          {/* Gate (A, B, C) */}
          <select
            value={gate}
            onChange={(e) => setGate(e.target.value)}
            style={{
              position: "absolute",
              top: "130px",
              left: "365px",
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
            onClick={generatePDF}
            className="bg-green-500 text-white p-2 rounded-md"
          >
            Générer le PDF
          </button>
          <button
            onClick={onClose}
            className="mt-4 text-red-500 font-semibold hover:underline"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketPlayer;
