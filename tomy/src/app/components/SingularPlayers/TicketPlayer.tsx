import React, { useState, useEffect } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import InteractiveButton from "../GenericPlayer/InteractiveButton"; // Vérifie le bon chemin
import toast from 'react-hot-toast';

interface TicketPlayerProps {
  onClose: () => void;
  scale?: number; 
}

const TicketPlayer: React.FC<TicketPlayerProps> = ({ onClose }) => {
  // ---------- États pour tous les champs ----------
  const [userName, setUserName] = useState("NOM PRÉNOM");
  const [sex, setSex] = useState("M");
  const [age, setAge] = useState("18");
  const [date, setDate] = useState("1995-12-07");  // Format ISO pour plus de fiabilité
  const [time, setTime] = useState("08:00");
  const [seat, setSeat] = useState("14B");
  const [gate, setGate] = useState("A");
  const [depart, setDepart] = useState("PARIS");
  const [classe, setClasse] = useState("FIRST CLASS");
  // Nouvel état pour l'email du destinataire
  const [recipientEmail, setRecipientEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Message d'erreur pour l'utilisateur


  const [scale, setScale] = useState(1); // Gestion de l'échelle dynamique

  const classAbbreviations: { [key: string]: string } = {
    "SPECIAL ECONOMY": "SE",
    "BUSINESS CLASS": "BC",
    "FIRST CLASS": "FC",
    "GENIUS CLASS": "GC",
    "CHEESE LOVERS CLASS": "CLC",
    "POPSTAR CLASS": "PC",
    "GOONER CLASS": "GC",
    "FASHION IDOL CLASS": "FIC",
    "NON DUAL LOUNGE": "NDL",
    "ANIMAL SECTION": "AS",
    "ALIEN CLASS": "AC",
    "TORTURED ARTIST CLASS": "TAC",
    "NINJA CLASS": "NC",
    "KIWI CLASS": "KC",
    "SURFER’S CLASS": "SC",
    "CREW": "CR",
  };

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

    // Fonction pour échapper les caractères spéciaux (sécurité XSS)
    const sanitizeInput = (input: string) => {
      const element = document.createElement("div");
      element.innerText = input;
      return element.innerHTML;
    };

    // Fonction de validation des champs
  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!recipientEmail || !emailRegex.test(recipientEmail)) {
      setErrorMessage("Veuillez entrer une adresse email valide.");
      return false;
    }

    if (!userName.trim()) {
      setErrorMessage("Le nom ne peut pas être vide.");
      return false;
    }

    if (isNaN(Number(age)) || Number(age) < 0 || Number(age) > 120) {
      setErrorMessage("Veuillez entrer un âge valide.");
      return false;
    }

    setErrorMessage(null);  // Pas d'erreurs
    return true;
  };


  const generateAndSendPDF = async () => {
    if (!validateFields()) return;
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
      drawText(sanitizeInput(time), 190, 218);
      drawText(sanitizeInput(time), 190, 218);
      drawText(sanitizeInput(time), 505, 90);
      drawText(sanitizeInput(seat), 565, 90);

      drawText(sanitizeInput(userName), 75, 100);
      drawText(sanitizeInput(sex), 270, 99);
      drawText(sanitizeInput(age), 320, 99);
      drawText(sanitizeInput(date), 170, 137);
      drawText(sanitizeInput(time), 265, 137);
      drawText(sanitizeInput(seat), 320, 137);
      drawText(sanitizeInput(gate), 375, 135);
      drawText(sanitizeInput(depart), 75, 174);
      drawText("JFK190FW", 75, 137);
      drawText(sanitizeInput(classe), 75, 65);


      const abbreviatedClass = classAbbreviations[classe] || classe;
      drawText(abbreviatedClass, 610, 90);

      // 4. Sauvegarder le PDF en binaire
      const pdfBytes = await pdfDoc.save();

      // 5. Créer un Blob depuis pdfBytes
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

      // 6. Préparer un FormData pour envoyer en multipart/form-data
      const formData = new FormData();
      formData.append("pdfFile", pdfBlob, "billet.pdf");

      // On utilise la valeur saisie par l'utilisateur
      formData.append("toEmail", recipientEmail || "destinataire@example.com");
      formData.append("subject", "Votre Voyage avec Tomy Airlines");

      // 7. Envoyer la requête vers l'API Route Next.js
      const response = await fetch("/api/send-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Échec de l'envoi du PDF");
        toast.error("Échec de l'envoi du billet.");
      } else {
        console.log("PDF envoyé par email avec succès !");
        // alert("PDF envoyé avec succès !");
        toast.success("Billet envoyé par email ! 🎟️");
      }
    } catch (error) {
      console.error("Erreur lors de la génération / envoi du PDF :", error);
      setErrorMessage("Une erreur est survenue lors de l'envoi.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="relative"
        style={{
          height: `${scaledValue(550)}px`,
          width: `${scaledValue(640)}px`,
          // backgroundColor: "red",
        }}
      >
        {/* Cadre décoratif inspiré du DiaporamaPlayer */}
        <img
          src="/vectors/ELEMENTS/Cadres/SendaTicket-Blue.avif"
          alt="Cadre décoratif"
          style={{
            height: `${scaledValue(550)}px`,
            width: `${scaledValue(640)}px`,
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
          <div className="absolute shadow-xl"
          style={{
            top: `${scaledValue(147)}px`,
            left: `${scaledValue(23)}px`,
            height: `${scaledValue(287)}px`,
            width: `${scaledValue(600)}px`,
            backgroundColor: "white",
            borderRadius: "8px",
            backgroundSize: "cover", // ou "contain" selon le besoin
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}>

            <div
              className="absolute"
              style={{
                top: `${scaledValue(0)}px`,
                left: `${scaledValue(10)}px`,
                height: `${scaledValue(287)}px`,
                width: `${scaledValue(580)}px`,
                zIndex: 10,
              }}
              >


              {/* Champ Email */}

                <img
                  src="BILLET/Billet_Vierge.jpg"
                  alt="Billet"
                  style={{
                    position: "absolute",
                    top: `${scaledValue(10)}px`,
                    width: `${scaledValue(580)}px`,
                    height: "auto",
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
                    top: `${scaledValue(171-80)}px`,
                    left: `${scaledValue(60)}px`,
                    width: "23vh",
                    border: "none",
                    background: "transparent",
                    fontSize: "1.7vh",
                    color: "#000",
                  }}
                  />

                {/* Depart */}
                <select
                  value={depart}
                  onChange={(e) => setDepart(e.target.value)}
                  style={{
                    position: "absolute",
                    top: `${scaledValue(234-80)}px`,
                    left: `${scaledValue(60)}px`,
                    width: "23vh",
                    border: "none",
                    background: "transparent",
                    fontSize: "1.7vh",
                    color: "#000",
                  }}
                  >
                  <option value="BANGKOK">BANGKOK</option>
                  <option value="BEIJING">BEIJING</option>
                  <option value="BERLIN">BERLIN</option>
                  <option value="DUBAI">DUBAI</option>
                  <option value="GOTHAM CITY">GOTHAM CITY</option>
                  <option value="HANOI">HANOI</option>
                  <option value="HOBBIT TOWN">HOBBIT TOWN</option>
                  <option value="HOGSMEADE">HOGSMEADE</option>
                  <option value="KNEIPFALL">KNEIPFALL</option>
                  <option value="KUALA-LUMPUR">KUALA-LUMPUR</option>
                  <option value="LACANAU">LACANAU</option>
                  <option value="LONDON">LONDON</option>
                  <option value="LYON">LYON</option>
                  <option value="MADRID">MADRID</option>
                  <option value="MAROCO">MAROCO</option>
                  <option value="MAUBEUGE">MAUBEUGE</option>
                  <option value="MEXICO">MEXICO</option>
                  <option value="MOSCOU">MOSCOU</option>
                  <option value="MONTREAL">MONTREAL</option>
                  <option value="MUMBAI">MUMBAI</option>
                  <option value="NELSON">NELSON</option>
                  <option value="NEW YORK">NEW YORK</option>
                  <option value="OULAN-BATOR">OULAN-BATOR</option>
                  <option value="PARIS">PARIS</option>
                  <option value="ROMA">ROMA</option>
                  <option value="SCRANTON">SCRANTON</option>
                  <option value="SEOUL">SEOUL</option>
                  <option value="SPRINGFIELD">SPRINGFIELD</option>
                  <option value="ST-JACK">ST-JACK</option>
                  <option value="SYDNEY">SYDNEY</option>
                  <option value="TAIPEI">TAIPEI</option>
                  <option value="TOKYO">TOKYO</option>
                  <option value="TOURS">TOURS</option>
                  <option value="VILLE D'AVRAY">VILLE D'AVRAY</option>
                  <option value="WELLINGTON">WELLINGTON</option>
                </select>


                {/* Classe */}
                <select
                  value={classe}
                  onChange={(e) => setClasse(e.target.value)}
                  style={{
                    position: "absolute",
                    top: `${scaledValue(140-80)}px`,
                    left: `${scaledValue(60)}px`,
                    width: "27vh",
                    border: "none",
                    background: "transparent",
                    fontSize: "1.7vh",
                    color: "#000",
                  }}
                  >
                  <option value="SPECIAL ECONOMY">SPECIAL ECONOMY</option>
                  <option value="BUSINESS CLASS">BUSINESS CLASS</option>
                  <option value="FIRST CLASS">FIRST CLASS</option>
                  <option value="GENIUS CLASS">GENIUS CLASS</option>
                  <option value="CHEESE LOVERS CLASS">CHEESE LOVERS CLASS</option>
                  <option value="POPSTAR CLASS">POPSTAR CLASS</option>
                  <option value="GOONER CLASS">FIRST CLASS</option>
                  <option value="FASHION IDOL CLASS">FASHION IDOL CLASS</option>
                  <option value="NON DUAL LOUNGE">NON DUAL LOUNGE</option>
                  <option value="ANIMAL SECTION">ANIMAL SECTION</option>
                  <option value="ALIEN CLASS">ALIEN CLASS</option>
                  <option value="TORTURED ARTIST CLASS">TORTURED ARTIST CLASS</option>
                  <option value="NINJA CLASS">NINJA CLASS</option>
                  <option value="KIWI CLASS">KIWI CLASS</option>
                  <option value="SURFER’S CLASS">SURFER’S CLASS</option>
                  <option value="CREW">CREW</option>
                  {/* ... */}
                </select>

                {/* Sex */}
                <select
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  style={{
                    position: "absolute",
                    top: `${scaledValue(171-80)}px`,
                    left: `${scaledValue(230)}px`,
                    width: "5vh",
                    border: "none",
                    background: "transparent",
                    fontSize: "1.7vh",
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
                    top: `${scaledValue(171-80)}px`,
                    left: `${scaledValue(273)}px`,
                    width: "5.5vh",
                    border: "none",
                    background: "transparent",
                    fontSize: "1.7vh",
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
                    top: `${scaledValue(202-80)}px`,
                    left:`${scaledValue(144)}px`,
                    width: "10vh",
                    border: "none",
                    background: "transparent",
                    fontSize: "1.7vh",
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
                    top: `${scaledValue(202-80)}px`,
                    left: `${scaledValue(225)}px`,
                    width: "4vh",
                    border: "none",
                    background: "transparent",
                    fontSize: "1.7vh",
                    color: "#000",
                  }}
                  />

                {/* Seat */}
                <select
                  value={seat}
                  onChange={(e) => setSeat(e.target.value)}
                  style={{
                    position: "absolute",
                    top: `${scaledValue(203-80)}px`,
                    left: `${scaledValue(270)}px`,
                    width: "5.5vh",
                    border: "none",
                    background: "transparent",
                    fontSize: "1.7vh",
                    color: "#000",
                  }}
                  >
                  <option value="99A">99A</option>
                  <option value="28C">28C</option>
                  <option value="14B">14B</option>
                  {/* ... */}
                </select>

                {/* Gate */}
                <select
                  value={gate}
                  onChange={(e) => setGate(e.target.value)}
                  style={{
                    position: "absolute",
                    top: `${scaledValue(203-80)}px`,
                    left: `${scaledValue(316)}px`,
                    width: "5vh",
                    border: "none",
                    background: "transparent",
                    fontSize: "1.7vh",
                    color: "#000",
                  }}
                  >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
          </div>

          {/* Boutons */}
          <div className="absolute flex items-center justify-center gap-3 mt-4 text-black"
          style={{
            bottom: `${scaledValue(70)}px`,
            left: `50%`,
            transform:'translateX(-50%)',
            width:"100%",
          }}>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="border h-full"
              placeholder="ex: jeanjean@claude.com"
              style={{
                width: `${scaledValue(180)}px`,
              }}
            />
            <InteractiveButton
              defaultIcon="/vectors/ELEMENTS/BoutonsDivers/Send-hover.avif"
              hoverIcon="/vectors/ELEMENTS/BoutonsDivers/Send.avif"
              clickedIcon="/vectors/ELEMENTS/BoutonsDivers/Send-clic.avif"
              onClick={generateAndSendPDF}
              style={{
                // position: "absolute",
                // bottom: `${scaledValue(0)}px`,
                // left: `${scaledValue(0)}px`,
                height: `${scaledValue(26)}px`,
                width: `${scaledValue(136)}px`,
                zIndex: 50,
              }}
            />
          </div>
        </div>
      </div>
  );
};

export default TicketPlayer;
